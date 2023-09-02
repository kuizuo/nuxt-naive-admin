<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  keepalive: true,
  title: 'pages.level_menu.level2',
  order: 1,
  icon: 'ant-design:menu-outlined',
})

const inputValue = ref('')

const { t } = useI18n()

useHead({
  title: t('pages.level_menu.title'),
})
</script>

<template>
  <div>
    Menu1-1
    <NInput v-model:value="inputValue" />
  </div>
</template>
