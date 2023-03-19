<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
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
    <n-input v-model:value="inputValue" />
  </div>
</template>

<style scoped>

</style>
