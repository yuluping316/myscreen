<template>
  <div class="relative">
    <div ref="target" class="w-full h-full">
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { ref, onMounted, watch } from 'vue'
import china from '../assets/mapData/china.json'
import type { EChartsOption } from 'echarts/types/dist/echarts'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const target = ref(null)
onMounted(() => {
  echarts.registerMap('china', china as any)
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
  const option: EChartsOption = {
    timeline: {
      data: props.data.voltageLevel,
      axisType: 'category',
      autoPlay: true,
      loop: true,
      playInterval: 3000,
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      label: {
        color: '#ddd',
      },
      symbolSize: 10,
      lineStyle: {
        color: '#555',
      },
      checkpointStyle: {
        borderColor: '#fff',
        borderWidth: 2,
      },
      controlStyle: {
        color: '#666',
        borderColor: '#666',
      },
    },
    emphasis: {
      label: {
        color: '#fff',
      },
      itemStyle: {
        areaColor: 'red',
      },
      controlStyle: {
        color: '#fff',
        borderColor: '#fff',
      },
    },
    baseOption: {
      grid: {
        top: '15%',
        bottom: '10%',
        right: '2%',
        width: '20%',
      },
      geo: {
        show: true,
        map: 'china',
        roam: true,
        zoom: 1.2,
        top: '5%',
        left: '18%',
        center: [113.83531246, 34.0267395887],
        itemStyle: {
          borderWidth: 1,
          areaColor: 'rgba(20, 14, 87, 0.9)',
          borderColor: '#195bb9',
        },
        emphasis: {
          label: {
            color: '#fff',
          },
          itemStyle: {
            areaColor: 'rgba(255, 255 , 255, 0.1)',
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
      },
    },
    options: props.data.voltageLevel.map((item: any, index: number) => ({
      // backgroundColor: '#142037',
      title: [{
        text: '2019-2023 年度数据统计',
        left: '2%',
        top: '2%',
        textStyle: {
          color: '#ccc',
          fontSize: 18,
        },
      },
      {
        id: 'statistic',
        text: item + '年数据统计情况',
        right: '3%',
        top: '2%',
        textStyle: {
          color: '#ccc',
          fontSize: 18,
        },
      }],
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          color: '#ddd',
        },

      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#ddd',
        },
        data: props.data.categoryData[item].map((item: any) => item.name),
      },
      series: [{
        type: 'bar',
        zlevel: 1.5,
        itemStyle: {
          color: props.data.colors[index],
        },
        data: props.data.categoryData[item].map((item: any) => item.value),
      }, {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: props.data.topData[item],
        symbolSize: (val: any) => val[2] / 6,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
        },
        label: {
          position: 'right',
          formatter: '{b}',
          show: true,
        },
        itemStyle: {
          color: props.data.colors[index],
          shadowBlur: 5,
          shadowColor: props.data.colors[index],
        },
      }],
    }))
  }
  myChart.setOption(option)
}
</script>

<style scoped></style>
