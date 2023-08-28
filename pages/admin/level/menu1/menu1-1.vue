<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  keepalive: true,
  title: 'Menu1-1',
  order: 1,
  icon: 'ant-design:menu-outlined',
})

const inputValue = ref('')
</script>

<template>
  <div>
    Menu1-1
    <NInput v-model:value="inputValue" />
  </div>
</template>
