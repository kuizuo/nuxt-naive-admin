<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  keepalive: true,
  title: 'pages.level_menu.level1',
  order: 2,
  icon: 'ant-design:menu-outlined',
})

const inputValue = ref('')
</script>

<template>
  <div>
    Menu2
    <NInput v-model:value="inputValue" />
  </div>
</template>
