<script lang="ts" setup>
import VChart from 'vue-echarts'

const props = defineProps<{
  loading: boolean
}>()

const option1 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#019680',
      },
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [...Array.from({ length: 18 })].map((_item, index) => `${index + 6}:00`),
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: 'rgba(226,226,226,0.5)',
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: [
    {
      type: 'value',
      max: 80000,
      splitNumber: 4,
      axisTick: {
        show: false,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
        },
      },
    },
  ],
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  series: [
    {
      smooth: true,
      data: [
        111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
        11111, 4000, 2000, 500, 333, 222, 111,
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
        color: '#5ab1ef',
      },
    },
    {
      smooth: true,
      data: [
        33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
        198, 60, 30, 22, 11,
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
        color: '#019680',
      },
    },
  ],
})

const option2 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#019680',
      },
    },
  },
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  xAxis: {
    type: 'category',
    data: [...Array.from({ length: 12 })].map((_item, index) => `${index + 1}月`),
  },
  yAxis: {
    type: 'value',
    max: 8000,
    splitNumber: 4,
  },
  series: [
    {
      data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
      type: 'bar',
      barMaxWidth: 80,
    },
  ],
})
</script>

<template>
  <div class="mt-4">
    <NRow :gutter="24">
      <NCol :span="24">
        <NCard content-style="padding: 0;" :loading="loading">
          <template #header>
            <n-skeleton v-if="loading" text width="60%" />
          </template>
          <NSkeleton v-if="loading" height="240px" width="100%" />
          <template v-else>
            <NTabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
              <NTabPane name="流量趋势">
                <VChart :option="option1" autoresize class="w-full h-[280px]" />
              </NTabPane>
              <NTabPane name="访问量">
                <VChart :option="option2" autoresize class="w-full h-[280px]" />
              </NTabPane>
            </NTabs>
          </template>
        </NCard>
      </NCol>
    </NRow>
  </div>
</template>
