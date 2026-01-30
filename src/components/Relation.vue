<template>
  <div class="Relation">
    <h2 class="text-white text-lg font-bold">数据传递信息</h2>
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
const renderChart = () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(target.value)
  // window.addEventListener('resize', function () {
  //   myChart.resize();
  // });
  // 绘制图表
  myChart.setOption({
    grid: {
      top: 40,
      height: '80%',
    },
    xAxis: {
      show: false,
      type: 'value',
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 26,
        z: 3,
        edgeLabel: {
          show: true,
          color: '#fff',
          formatter: function (params: any) {
            return params.data.speed
          },
          fontSize: 14,
        },
        label: {
          show: true,
          position: 'bottom',
          color: '#5e5e5e',
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 8,
        data: props.data.relations.map((item: any) => {
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value,
            }
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: '#157eff', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#35c2ff', // 100% 处的颜色
                    },
                  ],
                }
              },
              label: {
                fontSize: 14,
              },
            }
          }
        }),
        links: props.data.relations.map((item: any) => ({
          source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          lineStyle: {
            color: '#fff',
            curveness: 0.2,
          },
          label: {
            show: true,
            position: 'middle',
            offset: [10, 0],
          },
        }))
      },
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          smooth: false,
          trailLength: 0.1,
          symbol: 'arrow',
          color: 'rgba(55, 155, 255, 0.5)',
          symbolSize: 12,
        },
        lineStyle: {
          curveness: 0.2,
        },
        data: [
          { coords: [[0, 300], [50, 200]] },
          { coords: [[0, 100], [50, 200]] },
          { coords: [[50, 200], [100, 100]] },
          { coords: [[50, 200], [100, 300]] },
        ]
      }
    ],
  })
}
</script>

<style scoped></style>
