<template>
  <div>
    <h2 class="text-white text-lg font-bold">服务资源占用比</h2>
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
    yAxis: {
      show: true,
      type: 'value',
      max: 100,
      axisLabel: {
        color: '#fff',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    xAxis: {
      type: 'category',
      data: props.data.servers.map((item: any) => item.name),
      // inverse: true,
      axisTick: {
        // show: true,
      },
      axisLine: {
        // show: true,
      },
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        // show: true,
      },
    },
    grid: {
      top: 20,
      bottom: 20,
      left: 0,
      right: 1,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        return params[0].name + '<br>' +
          '占比: ' + params[0].value + '%';
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 20,
        data: props.data.servers.map((item: any) => ({
          name: item.name,
          value: item.value,
        })),
        // showBackground: true,
        // backgroundStyle: {
        //   color: 'rgba(220, 220, 220, 0.8)'
        // },
        itemStyle: {
          borderRadius: 3,
          borderWidth: 1,
          borderType: 'solid',
          borderColor: '#73c0de',
          shadowColor: '#5470c6',
          shadowBlur: 3
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: '{c}%'
        },
      }
    ],
  })
}
</script>

<style scoped></style>
