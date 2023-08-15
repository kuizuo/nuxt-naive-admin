<script setup lang="ts">
import type { User } from '@supabase/supabase-js'
import { NAvatar } from 'naive-ui'
import TableAction from '~/components/basic/table/components/TableAction.vue'
import { useModal } from '~/components/basic/modal/hooks/useModal'
import type { BasicColumn, TableActionType } from '~~/components/basic/table/types/table'

definePageMeta({
  layout: 'admin',
  title: '用户管理',
  order: 1,
  icon: 'carbon:user',
  keepalive: true,
})

const tableRef = ref<TableActionType>()
const message = useMessage()

const [register, { openModal, closeModal, setProps: setModalProps }] = useModal()

const modalTitle = ref('新增用户')

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
      return h(NAvatar, {
        size: 48,
        src: row.user_metadata?.avatar_url,
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
  {
    title: '角色',
    key: 'role',
    width: 150,
  },
]

async function handleRequest(params: Record<string, any>) {
  const data = await request('/api/system/users', {
    method: 'GET',
    params,
  })

  return data.users
}

async function handleCreate() {
  openModal()
  setModalProps({
    title: '新增用户',
  })
}

async function handleUpdate(record: User) {
  openModal()
  setModalProps({
    title: '编辑用户',
  })
}

async function handleDelete(record: User) {
  await request(`/api/system/users/${record.id}`, {
    method: 'DELETE',
  })
  tableRef.value?.reload()
}

const actionColumn = reactive<BasicColumn<User>>({
  width: 80,
  title: '操作',
  key: 'actions',
  fixed: 'right',
  align: 'center',
  render(record) {
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
})

function handleSuccess() {
  message.success('操作成功')
  tableRef.value?.reload()
}
</script>

<template>
  <BasicPage>
    <BasicTable
      ref="tableRef"
      title="用户列表"
      :columns="columns"
      :action-column="actionColumn"
      :request="handleRequest"
    >
      <template #toolbar>
        <n-button type="primary" size="small" @click="handleCreate">
          新增数据
        </n-button>
      </template>
    </BasicTable>
    <BasicModal :title="modalTitle" @register="register" @success="handleSuccess">
      test
    </BasicModal>
  </BasicPage>
</template>
