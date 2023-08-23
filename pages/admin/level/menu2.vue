<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  keepalive: true,
  title: 'Menu2',
  order: 2,
  icon: 'ion:menu-outline',
})

const inputValue = ref('')
</script>

<template>
  <div>
    Menu2
    <NInput v-model:value="inputValue" />
  </div>
</template>
