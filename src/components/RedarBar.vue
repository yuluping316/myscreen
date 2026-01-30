<template>
  <div class="RedarBar">
     <h2 class="text-white text-lg font-bold">云端报警风险</h2>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const target = ref(null)
onMounted(() => {
  renderChart()
})
watch(() => props.data, () => {
  renderChart()
})
function renderChart() {
  const myChart = echarts.init(target.value)
  // window.addEventListener('resize', function () {
  //   myChart.resize();
  // });
  // 基于准备好的dom，初始化echarts实例
  // 绘制图表
  myChart.setOption({
    radar: {
      axisName: {
          color: '#fff',
          fontSize: 14,
      },
      shape: 'polygon',
      center: ['50%', '50%'],
      radius: '80%',
      startAngle: 120,
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.4)',
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
      indicator: props.data.risks.map((item: any) => ({
        name: item.name,
        max: 100,
      })),
    },
    polar: {
      center: ['50%', '50%'],
      radius: '0%',
    },
    angleAxis: {
      min: 0,
      interval: 5,
      clockwise: false,
    },
    radiusAxis: {
      min: 0,
      interval: 20,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
        },
        areaStyle: {
          color: 'rgba(128, 189, 255, 0.3)',
        },
        lineStyle: {
          width: 2,
        },
        label: {
          show: true,
          color: '#fff',
        },
        data: [
          {
            value: props.data.risks.map((item: any) => item.value),
          },
        ],
      },
    ],
  })
}
</script>

<style scoped></style>
