<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '系统管理',
  name: 'system',
  order: 99,
  icon: 'ion:settings-outline',
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
