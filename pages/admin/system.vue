<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.system.title',
  name: 'system',
  order: 99,
  icon: 'ant-design:setting-outlined',
})

const { t } = useI18n()
useHead({
  title: t('pages.system.title'),
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
