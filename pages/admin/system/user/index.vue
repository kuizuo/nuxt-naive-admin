<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import TableAction from '~/components/basic/table/components/TableAction.vue'
import type { BasicColumn } from '~~/components/basic/table/types/table'
import type { Admin } from '~~/types/admin/user'
import { createUser, deleteUser, getUserList, updateUser } from '~~/apis/admin/system/user'

definePageMeta({
  layout: 'admin',
  title: '用户管理',
  order: 1,
  icon: 'carbon:user',
  keepalive: true,
})

const message = useMessage()

const columns: BasicColumn<Admin.User>[] = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '名称',
    key: 'name',
    width: 100,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 150,
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.image,
      })
    },
  },
]

const handleCreate = () => {
  message.success('新增数据')
  createUser({
    name: 'test',
    email: 'hi@example.com',
    password: 'a123456',
  })
}

const handleUpdate = () => {
  message.success('更新数据')
  updateUser('1', {
    name: 'kuizuo',
  })
}

const handleDelete = (record: Admin.User) => {
  message.success(`删除数据: ${record.id}`)
  deleteUser('1')
}

const actionColumn = reactive<BasicColumn<Admin.User>>({
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
</script>

<template>
  <BasicPage>
    <BasicTable
      title="用户列表"
      :columns="columns"
      :action-column="actionColumn"
      :request="getUserList"
    >
      <template #toolbar>
        <n-button type="primary" size="small" @click="handleCreate">
          新增数据
        </n-button>
      </template>
    </BasicTable>
  </BasicPage>
</template>
