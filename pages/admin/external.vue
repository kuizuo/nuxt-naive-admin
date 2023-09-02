<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'pages.external.title',
  order: 4,
  icon: 'ic:sharp-launch',
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
  </div>
</template>
