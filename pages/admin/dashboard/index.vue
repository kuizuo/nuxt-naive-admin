<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '仪表盘',
  order: 1,
  icon: 'ant-design:dashboard-outlined',
  affix: true,
  keepalive: true,
})
</script>

<template>
  <div class="p-4">
    <NGrid x-gap="12" y-gap="12" :cols="4" item-responsive responsive="screen">
      <NGi v-for="i in 4" :key="i" span="4 m:2 l:1">
        <NCard title="卡片">
          内容
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
