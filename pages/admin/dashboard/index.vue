<script lang="ts" setup>
import GrowCard from '~/components/admin/dashboard/GrowCard.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.dashboard.title',
  order: 1,
  icon: 'ant-design:dashboard-outlined',
  affix: true,
  keepalive: true,
})

const { data, pending } = await useLazyAsyncData(async () => {
  return await request('/api/admin/dashboard/console')
})
</script>

<template>
  <div class="p-4">
    <GrowCard :data="data" :loading="pending" />
  </div>
</template>
