<template>
  <VScaleScreen width="1920" height="1080" :fullScreen="true">
    <div v-if="data" ref="chartRef" class="big-screen flex flex-col bg-[url('./assets/bg1.jpg')]  bg-cover bg-center">
      <div class="h-1/11 text-center bg-[url('./assets/head_bg.png')] bg-cover bg-center font-bold text-white relative">
        <div class="absolute top-1/2 text-3xl left-1/2 transform -translate-x-1/2 -translate-y-1/2">数据可视化大屏-ECharts
        </div>
        <div v-if="weatherData" class="absolute top-1/2 text-sm left-0 transform  -translate-y-1/2">
          <span class="absolute top-1/2 left-5 transform -translate-y-1/2">

            <svg v-if="weatherData.weather.includes('云')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-duoyun"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('雷')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-leibaoe"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('阴')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-yin"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('晴')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-qingtian"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('雨')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoyu"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('雪')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoxue"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('雾')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-wu"></use>
            </svg>
            <svg v-else-if="weatherData.weather.includes('霾')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-mai"></use>
            </svg>
             <svg v-else-if="weatherData.weather.includes('沙')" class="icon" aria-hidden="true">
              <use xlink:href="#icon-shachenbao"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true">
              <use xlink:href="#icon-duoyun"></use>
            </svg>
          </span>
          <span class="mr-2 ml-20">{{ weatherData.city }}</span>
          <span class="mr-2 text-[#5dc5ef] text-3xl">{{ weatherData.temperature_float }}°</span>
          <span class="mr-2">{{ weatherData.weather }}</span>
          <span>{{ weatherData.winddirection }}风</span>
        </div>
        <div class="absolute top-1/2 text-sm right-0 transform -translate-x-1/2 -translate-y-1/2">{{ nowTime }}</div>
      </div>
      <div class="h-10/11 flex text-white ">
        <!-- 左 -->
        <div class="Left flex-1 mr-5 p-3 pb-5 flex flex-col">
          <!-- 横向柱状图 -->
          <HorizontalBar class="h-1/3 box-border mb-4 my-border p-2" :data="data.regionData" />
          <!-- 雷达图 -->
          <RedarBar class="h-1/3 box-border mb-4 my-border p-2" :data="data.riskData" />
          <!-- 数据关系图 -->
          <Relation class="h-1/3 box-border mb-4 my-border p-2" :data="data.relationData" />
        </div>
        <!-- 中 -->
        <div class="Middle w-1/2 mr-5 p-3 pb-5 flex flex-col">
          <!-- 数据总览图 -->
          <TotalData class=" p-3 my-border" :data="data.totalData" />
          <!-- 地图可视化 -->
          <MapChart class=" p-3 pt-3 mt-4 flex-1 my-border" :data="data.mapData" />
        </div>
        <!-- 右 -->
        <div class="Right flex-1  p-3 pb-5 flex flex-col">
          <!-- 竖向柱状图 -->
          <VerticalBar class="h-1/3 box-border mb-4 my-border p-2" :data="data.serverData" />
          <!-- 环形图 -->
          <RingBar class="h-1/3 box-border mb-4 my-border p-2" :data="data.abnormalData" />
          <!-- 文档云图 -->
          <WordCloud class="h-1/3 box-border mb-4 my-border p-2" :data="data.wordCloudData" />
        </div>
      </div>

    </div>
    <!-- 地图背景 -->
    <!-- <MapBG class="absolute top-0 left-0 w-full h-full" /> -->
  </VScaleScreen>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import 'echarts-wordcloud'
import { LineChart, BarChart, RadarChart, PieChart, GraphChart, LinesChart, EffectScatterChart } from 'echarts/charts'
import {
  VisualMapComponent,
  MarkPointComponent,
  MarkLineComponent,
  ToolboxComponent,
  DataZoomComponent,
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PolarComponent,
  TimelineComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import VScaleScreen from 'v-scale-screen'
import './assets/font/iconfont.js'
// 注册必须的组件
echarts.use([
  VisualMapComponent,
  MarkPointComponent,
  MarkLineComponent,
  ToolboxComponent,
  LineChart,
  DataZoomComponent,
  GeoComponent,
  EffectScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PolarComponent,
  GraphChart,
  LegendComponent,
  LabelLayout,
  UniversalTransition,
  TimelineComponent,
  CanvasRenderer,
  PieChart,
  RadarChart,
  LinesChart,
]);
import { ref, onMounted, onUnmounted } from 'vue'
import HorizontalBar from './components/HorizontalBar.vue'
import MapChart from './components/MapChart.vue'
import RedarBar from './components/RedarBar.vue'
import Relation from './components/Relation.vue'
import RingBar from './components/RingBar.vue'
import TotalData from './components/TotalData.vue'
import VerticalBar from './components/VerticalBar.vue'
import WordCloud from './components/WordCloud.vue'
import { getVisualization, getWeather } from './api/visualization.ts'
// import axios from 'axios'

// import MapBG from './components/MapBG.vue'
// import setRem from './utils/rem'
// import debounce from './utils/debounce'
// const chartRef = ref(null)
// let myChart: echarts.ECharts | null = null
// async function initChart() {
//   if (myChart) {
//     myChart.dispose()
//     myChart = null
//   }
//   await nextTick()
//   if (!chartRef.value) return
//   document.body.style.fontSize = 'initial'
//   setRem()
//   myChart = echarts.init(chartRef.value)
//   myChart.setOption({})
// }
// const resizeChart = debounce(() => {
//   setRem()
//   nextTick(() => {
//     myChart?.resize({
//       animation: {
//         duration: 100,
//       },
//     })
//   })
//   window.location.reload()
// }, 100)
const nowTime = ref(dayjs().format('YYYY-MM-DD ddd HH:mm:ss'))
const updateTime = () => {
  nowTime.value = dayjs().format('YYYY-MM-DD ddd HH:mm:ss')
}
const timer = ref()
onMounted(() => {
  timer.value = setInterval(updateTime, 1000)
  // initChart()
  // window.addEventListener('resize', resizeChart)
})
onUnmounted(() => {
  timer.value && clearInterval(timer.value)
  // window.removeEventListener('resize', resizeChart)
  // myChart?.dispose()
})
const data = ref()
const weatherData = ref()
const loadData = async () => {
  data.value = await getVisualization()
  const weatherResponse = await getWeather()
  weatherData.value = weatherResponse.data.lives[0]
}
loadData()
setInterval(loadData, 5000)
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

.big-screen {
  width: 100%;
  height: 100%;
  /* min-width: 1200px; */
  /* max-width: 1920px; */
  /* min-height: 700px; */
  overflow: hidden;
}

.my-border {
  background:
    linear-gradient(to right, #02a6b5 20px, transparent 2px) 0 0 /10px 2px no-repeat,
    linear-gradient(to bottom, #02a6b5 20px, transparent 2px) 0 0 /2px 10px no-repeat,
    linear-gradient(to left, #02a6b5 20px, transparent 2px) 100% 0 /10px 2px no-repeat,
    linear-gradient(to top, #02a6b5 20px, transparent 2px) 100% 0 /2px 10px no-repeat,
    linear-gradient(to left, #02a6b5 20px, transparent 2px) 100% 100% /10px 2px no-repeat,
    linear-gradient(to top, #02a6b5 20px, transparent 2px) 100% 100% /2px 10px no-repeat,
    linear-gradient(to right, #02a6b5 20px, transparent 2px) 0 100% /10px 2px no-repeat,
    linear-gradient(to top, #02a6b5 20px, transparent 2px) 0 100% /2px 10px no-repeat,
    url('./assets/line.png') 0 0 /100% 100% no-repeat rgba(255, 255, 255, 0.06);
}

.icon {
  font-size: 50px;
}
</style>
