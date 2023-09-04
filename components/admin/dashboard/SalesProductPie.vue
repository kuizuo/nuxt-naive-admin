<script lang="ts" setup>
import VChart from 'vue-echarts'

const props = defineProps<{
  loading: boolean
}>()

const option1 = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data: [
        { value: 500, name: '电子产品' },
        { value: 310, name: '服装' },
        { value: 274, name: '化妆品' },
        { value: 400, name: '家居' },
      ].sort((a, b) => {
        return a.value - b.value
      }),
      roseType: 'radius',
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay() {
        return Math.random() * 400
      },
    },
  ],
})
</script>

<template>
  <NCard title="成交占比" :loading="loading">
    <NSkeleton v-if="loading" text :repeat="6" />
    <template v-else>
      <VChart :option="option1" autoresize class="w-full h-[300px]" />
    </template>
  </NCard>
</template>
