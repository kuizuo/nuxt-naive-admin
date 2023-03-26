<script lang="ts" setup>
import { NAvatar, NTag } from 'naive-ui'
import TableAction from '~/components/basic/table/components/TableAction.vue'

definePageMeta({
  layout: 'admin',
  title: '表格',
  order: 1,
  icon: 'mdi:table-large',
  keepalive: true,
})

const message = useMessage()

const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '编码',
    key: 'no',
    width: 100,
  },
  {
    title: '名称',
    key: 'name',
    width: 100,
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      })
    },
  },
  {
    title: '地址',
    key: 'address',
    width: 150,
  },
  {
    title: '开始日期',
    key: 'beginTime',
    width: 160,
  },
  {
    title: '结束日期',
    key: 'endTime',
    width: 160,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error',
        },
        {
          default: () => (row.status ? '启用' : '禁用'),
        },
      )
    },
  },
  {
    title: '创建时间',
    key: 'date',
    width: 160,
  },
  {
    title: '停留时间',
    key: 'time',
    width: 80,
  },
]

const fetchData = async (params?) => {
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i + 1,
      no: `${Math.random()}`,
      name: `Name ${i + 1}`,
      avatar: 'https://placekitten.com/48/48',
      address: `Address ${i + 1}`,
      beginTime: `2022-01-0${i % 9 + 1}`,
      endTime: `2022-01-1${i % 9 + 1}`,
      status: i % 2 === 0,
      date: `2022-01-1${i % 9 + 1}`,
      time: `${i + 1}min`,
    })
  }

  await setTimeout(() => {}, 1000)

  return {
    items: data,
    meta: {
      total: 20,
      page: 1,
      pageSize: 10,
    },
  }
}

// const data = (await fetchData()).items

const handleCreate = () => {
  message.success('新增数据')
}

const handleUpdate = () => {
  message.success('更新数据')
}

const handleDelete = (record) => {
  message.success(`删除数据: ${record.id}`)
}

const actionColumn = reactive({
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
          // label: '编辑',
          tooltip: '编辑',
          type: 'primary',
          icon: 'ant-design:edit-outlined',
          onClick: handleUpdate.bind(null, record),
        },
        {
          // label: '删除',
          type: 'error',
          color: 'red',
          icon: 'ant-design:delete-outlined',
          onClick: handleDelete.bind(null, record),
        },
      ],
      // dropDownActions: [
      //   {
      //     label: '编辑',
      //     type: 'primary',
      //     icon: 'ant-design:edit-outlined',
      //     onClick: handleUpdate.bind(null, record),
      //   },
      //   {
      //     label: '删除',
      //     type: 'error',
      //     color: 'red',
      //     icon: 'ant-design:delete-outlined',
      //     onClick: handleDelete.bind(null, record),
      //   },
      // ],
    })
  },
})
</script>

<template>
  <div>
    <BasicTable
      title="基础表格"
      :columns="columns"
      :action-column="actionColumn"
      :request="fetchData"
    >
      <template #toolbar>
        <n-button type="primary" size="small" @click="handleCreate">
          新增数据
        </n-button>
      </template>
    </BasicTable>
  </div>
</template>
