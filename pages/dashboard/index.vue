<script lang="ts" setup>
const route = useRoute()

const title = route.meta.title as string

definePageMeta({
  layout: 'dashboard',
  title: '仪表盘',
  order: 1,
})
</script>

<template>
  <div class="p-4">
    <n-grid x-gap="12" :cols="4">
      <n-gi v-for="i in 4" :key="i">
        <n-card title="卡片">
          卡片内容
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
