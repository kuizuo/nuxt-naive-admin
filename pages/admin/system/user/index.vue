<script setup lang="ts">
import type { User } from '@supabase/supabase-js'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { NAvatar, NTag } from 'naive-ui'

import type { FormSchema } from '~/components/basic/form/types/form'
import TableAction from '~/components/basic/table/components/TableAction.vue'
import { useModal } from '~/components/basic/modal/hooks/useModal'
import { useForm } from '~/components/basic/form/hooks/useForm'
import type { BasicColumn, TableActionType } from '~~/components/basic/table/types/table'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.system.user',
  order: 1,
  icon: 'ant-design:user-outlined',
  keepalive: true,
})

const { storage } = useSupabaseClient()

const tableRef = ref<TableActionType>()
const message = useMessage()

const rowId = ref<string>('')
const isUpdate = ref(false)
const modalTitle = computed(() => (isUpdate.value ? '编辑用户' : '新增用户'))

const columns: BasicColumn<User>[] = [
  {
    title: 'id',
    key: 'id',
    width: 100,
    ellipsis: true,
  },
  {
    title: '头像',
    key: 'user_metadata.avatar_url',
    width: 100,
    render(row) {
      const avatar_url = row.user_metadata?.avatar_url

      return h(NAvatar, {
        size: 48,
        src: avatar_url,
      })
    },
  },
  {
    title: '名称',
    key: 'user_metadata.user_name',
    width: 100,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 150,
  },
  // {
  //   title: '角色',
  //   key: 'role',
  //   width: 150,
  // },
  {
    title: '上次登录时间',
    key: 'last_sign_in_at',
    width: 150,
    render(row) {
      return formatToDateTime(row.last_sign_in_at)
    },
  },
  {
    title: '是否认证',
    key: 'email_confirmed_at',
    width: 80,
    render(row) {
      return h(NTag, {
        size: 'small',
        type: row.email_confirmed_at ? 'success' : 'error',
      }, {
        default: () => row.email_confirmed_at ? '已认证' : '未认证',
      })
    },
  },
]

const schemas: FormSchema[] = [
  {
    field: 'email',
    component: 'NInput',
    label: '邮箱',
    rules: [{ required: true, message: '请输入邮箱', trigger: ['blur'] }],
  },
  {
    field: 'password',
    component: 'NInput',
    label: '密码',
    componentProps: {
      type: 'password',
      showPasswordOn: 'click',
    },
    rules: [{ required: true, message: '请输入密码', trigger: ['blur'] }],
  },
  {
    field: 'user_metadata.user_name',
    component: 'NInput',
    label: '名称',
    rules: [{ required: true, message: '请输入名称', trigger: ['blur'] }],
  },
  {
    field: 'user_metadata.avatar_url',
    component: 'NUpload',
    label: '头像',
    componentProps: {
      action: '',
      listType: 'image-card',
      customRequest: async ({
        file,
        onFinish,
        onError,
        onProgress,
      }: UploadCustomRequestOptions) => {
        onProgress({ percent: 50 })

        const filePath = `${Date.now()}-${file.name}`
        const { data, error } = await storage.from('avatars').upload(filePath, file.file!, {
          cacheControl: '3600',
          upsert: false,
        })

        if (error) {
          message.error(`上传失败: ${error.message}`)
          onError()
        }
        else {
          onFinish()
          message.success('上传成功')

          const { data: { publicUrl } } = await storage
            .from('avatars')
            .getPublicUrl(filePath)

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setFieldsValue({ 'user_metadata.avatar_url': publicUrl })
        }
      },
    },
  },
  {
    field: 'email_confirm',
    component: 'NSwitch',
    label: '无需验证',
    labelMessage: '开启后，则用户无需要验证邮箱',
    defaultValue: true,
  },
]

const [registerModal, { openModal, closeModal, setConfirmLoading }] = useModal()

const [registerForm, { validate, getFieldsValue, setFieldsValue, updateSchema }] = useForm({
  showActionButtonGroup: false,
  schemas,
})

async function handleRequest(params: Record<string, any>) {
  const data = await request('/api/admin/system/users', {
    method: 'GET',
    params,
  })

  return data.users
}

async function handleCreate() {
  openModal()
  isUpdate.value = false
}

async function handleUpdate(record: User) {
  openModal()
  isUpdate.value = true

  await nextTick()
  setFieldsValue(record)

  if (record?.email_confirmed_at)
    setFieldsValue({ email_confirm: true })
  else
    setFieldsValue({ email_confirm: false })

  // if (record.user_metadata.avatar_url) {
  //   fileList.value = [{
  //     id: record.id,
  //     name: 'avatar',
  //     status: 'finished',
  //     url: record.user_metadata.avatar_url,
  //   }]
  // }
  // else {
  //   fileList.value = []
  // }

  updateSchema([{
    field: 'password',
    rules: [{ required: false }],
  }, {
    field: 'email',
    componentProps: { disabled: true },
  }])

  await nextTick()

  rowId.value = record.id
}

async function handleDelete(record: User) {
  await request(`/api/admin/system/users/${record.id}`, {
    method: 'DELETE',
  })
  tableRef.value?.reload()
}

async function handleSuccess() {
  try {
    await validate()

    const values = getFieldsValue()

    setConfirmLoading(true)

    if (!unref(isUpdate)) {
      await request('/api/admin/system/users', {
        method: 'POST',
        body: JSON.stringify(values),
      })
      message.success('新增成功')
    }
    else {
      await request(`/api/admin/system/users/${rowId.value}`, {
        method: 'PUT',
        body: JSON.stringify(values),
      })
      message.success('更新成功')
    }

    closeModal()

    await tableRef.value?.reload()
  }
  finally {
    setConfirmLoading(false)
  }
}
</script>

<template>
  <BasicPage content-class="p-4" content-full-height>
    <BasicTable
      ref="tableRef"
      title="用户列表"
      :columns="columns"
      :scroll-x="1000"
      :action-column="{
        width: 80,
        title: '操作',
        key: 'actions',
        fixed: 'right',
        align: 'center',
        render(record: User) {
          return h(TableAction as any, {
            style: 'text',
            actions: [
              {
                tooltip: '编辑',
                type: 'primary',
                icon: 'ant-design:edit-outlined',
                onClick: handleUpdate.bind(null, record),
              },
              {
                type: 'error',
                color: 'red',
                icon: 'ant-design:delete-outlined',
                onClick: handleDelete.bind(null, record),
              },
            ],
          })
        },
      }"
      :request="handleRequest"
    >
      <template #toolbar>
        <NButton type="primary" size="small" @click="handleCreate">
          新增用户
        </NButton>
      </template>
    </BasicTable>
    <BasicModal :title="modalTitle" @register="registerModal" @success="handleSuccess">
      <BasicForm @register="registerForm" />
    </BasicModal>
  </BasicPage>
</template>
