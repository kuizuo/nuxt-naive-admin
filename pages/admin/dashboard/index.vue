<script lang="ts" setup>
import GrowCard from '~/components/admin/dashboard/GrowCard.vue'
import SiteAnalysis from '~/components/admin/dashboard/SiteAnalysis.vue'
import VisitRadar from '~/components/admin/dashboard/VisitRadar.vue'
import VisitSource from '~/components/admin/dashboard/VisitSource.vue'
import SalesProductPie from '~/components/admin/dashboard/SalesProductPie.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.dashboard.title',
  order: 1,
  icon: 'ant-design:dashboard-outlined',
  affix: true,
  keepalive: true,
})

const { t } = useI18n()

const { data, pending } = await useAsyncData(async () => {
  return await request('/api/admin/dashboard/console')
})

useHead({
  title: t('pages.dashboard.title'),
})
</script>

<template>
  <div class="p-4">
    <GrowCard :data="data" :loading="pending" />
    <SiteAnalysis :loading="pending" />
    <div class="md:flex space-x-4">
      <VisitRadar class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="pending" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="pending" />
      <SalesProductPie class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="pending" />
    </div>
  </div>
</template>
