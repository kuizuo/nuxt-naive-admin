<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.level_menu.title',
  order: 3,
  icon: 'ant-design:menu-outlined',
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
