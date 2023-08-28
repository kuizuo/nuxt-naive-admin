import type { TagProps } from 'naive-ui'

const { public: { adminUid } } = useRuntimeConfig()

export interface GrowCardItem {
  title: string
  value: number
  total: number
  action: string
  type?: TagProps['type']
}

export default defineEventHandler(async (event) => {
  if (event.context._user?.id !== adminUid)
    throw createError({ statusMessage: '无权限' })

  const data: GrowCardItem[] = [{
    title: '访问数',
    value: Math.floor(Math.random() * 10000),
    total: 10000,
    type: 'info',
    action: '日',
  },
  {
    title: '用户量',
    value: 1234,
    total: 10000,
    type: 'info',
    action: '日',
  },
  {
    title: '下载数',
    value: Math.floor(Math.random() * 1000),
    total: 1000,
    type: 'warning',
    action: '周',
  },
  {
    title: '成交数',
    value: Math.floor(Math.random() * 5000),
    total: 5000,
    type: 'success',
    action: '月',
  }]

  return data
})
