<script lang="ts" setup>
import GrowCard from '~/components/admin/dashboard/components/GrowCard.vue'

const { data, pending } = await useLazyAsyncData(async () => {
  return await request('/api/admin/dashboard/console')
})

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '仪表盘',
  order: 1,
  icon: 'ant-design:dashboard-outlined',
  affix: true,
  keepalive: true,
})
</script>

<template>
  <div class="p-4">
    <GrowCard :data="data" :loading="pending" />
  </div>
</template>
