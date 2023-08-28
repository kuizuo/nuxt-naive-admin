<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '多级菜单',
  order: 2,
  icon: 'ant-design:menu-outlined',
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
