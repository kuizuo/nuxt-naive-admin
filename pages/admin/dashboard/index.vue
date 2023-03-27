<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  title: '仪表盘',
  order: 1,
  icon: 'ant-design:dashboard-outlined',
  affix: true,
  keepalive: true,
})
</script>

<template>
  <div class="p-4">
    <n-grid x-gap="12" y-gap="12" :cols="4" item-responsive responsive="screen">
      <n-gi v-for="i in 4" :key="i" span="4 m:2 l:1">
        <n-card title="卡片">
          内容
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
