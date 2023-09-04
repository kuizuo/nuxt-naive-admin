<script lang="ts" setup>
import VChart from 'vue-echarts'

const props = defineProps<{
  loading: boolean
}>()

const option1 = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '1%',
    left: 'center',
  },
  series: [
    {
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
      ],
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay() {
        return Math.random() * 100
      },
    },
  ],
})
</script>

<template>
  <NCard title="访问来源" :loading="loading">
    <NSkeleton v-if="loading" text :repeat="6" />
    <template v-else>
      <VChart :option="option1" autoresize class="w-full h-[300px]" />
    </template>
  </NCard>
</template>
