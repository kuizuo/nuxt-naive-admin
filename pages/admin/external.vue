<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.external.title',
  order: 4,
  icon: 'ic:sharp-launch',
})

const { t } = useI18n()
useHead({
  title: t('pages.external.title'),
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
