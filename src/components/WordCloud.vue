<template>
  <div>
    <h2 class="text-white text-lg font-bold">关键词条</h2>
    <div ref="target" class="h-full w-full"></div>
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
  const randomColor = () => {
    return 'rgb(' + [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ].join(',') + ')';
  }
  // 绘制图表
  myChart.setOption({
    series: [{
      type: 'wordCloud',
      sizeRange: [8, 46],
      rotationRange: [0, 0],
      gridSize: 0,
      layoutAnimation: true,
      textStyle: {
        color: randomColor,
      },
      emphasis: {
        textStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
      },
      data: props.data.datas,
    }],
  })
}
</script>

<style scoped></style>
