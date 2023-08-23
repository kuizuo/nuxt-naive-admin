<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '多级菜单',
  order: 2,
  icon: 'ion:menu-outline',
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
