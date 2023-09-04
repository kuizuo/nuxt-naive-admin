import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, RadarComponent, TooltipComponent } from 'echarts/components'

export default defineNuxtPlugin(() => {
  use([
    CanvasRenderer,
    LineChart, PieChart, BarChart, RadarChart,
    LegendComponent, GridComponent, TooltipComponent, RadarComponent,
  ])
})
