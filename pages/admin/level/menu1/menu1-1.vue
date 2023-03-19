<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  keepalive: true,
  title: 'Menu1-1',
  order: 1,
  icon: 'ion:menu-outline',
})

const inputValue = ref('')
</script>

<template>
  <div>
    Menu1-1
    <n-input v-model:value="inputValue" />
  </div>
</template>
