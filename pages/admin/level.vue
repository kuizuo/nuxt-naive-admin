<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.level_menu.title',
  order: 3,
  icon: 'ant-design:menu-outlined',
})

const { t } = useI18n()
useHead({
  title: t('pages.level_menu.title'),
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
