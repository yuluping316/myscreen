<template>
  <div class="RingBar">
    <h2 class="text-white text-lg font-bold">大区异常处理</h2>
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
const getLegendData = () => {
  const series: any = []
  props.data.abnormals.forEach((item: any, index: number) => {
    series.push({
      name: item.name,
      type: 'pie',
      clockwise: false,
      emphasis: {
        scale: false,
      },
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['50%', '50%'],
      label: {
        show: false,
      },
      data: [{
        value: item.value,
        name: item.name,
      },
      {
        value: 1000,
        itemStyle: {
          color: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
        tooltip: {
          show: false,
        },
        emphasis: {
          scale: false,
        },
      }
      ],
    })

    series.push({
      name: item.name,
      type: 'pie',
      silent: true,
      z: 1,
      clockwise: false,
      emphasis: {
        scale: false,
      },
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['50%', '50%'],
      label: {
        show: false,
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: 'rgba(255,255,255,0.1)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
            emphasis: {
              scale: false,
            },
          },
        },
        {
          value: 2.5,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          emphasis: {
            scale: false,
          },
        }
      ],
    })

  })
  return series
}
const renderChart = () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(target.value)
  // window.addEventListener('resize', function () {
  //   myChart.resize();
  // });
  // 绘制图表
  myChart.setOption({
    legend: {
      show: true,
      icon: 'circle',
      top: '12%',
      left: '60%',
      width: -5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
        color: '#fff',
        rich: {
          title: {
            fontSize: 12,
            lineHeight: 5,
            color: 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
      data: props.data.abnormals.map((item: any) => item.name),
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLine: {
        show: false,
      },
    },
    xAxis: {
      show: false,
    },
    series: getLegendData(),
  })
}
</script>

<style scoped></style>
