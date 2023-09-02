<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.comp.title',
  order: 4,
  icon: 'gg:components',
})

const { t } = useI18n()
useHead({
  title: t('pages.comp.title'),
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
