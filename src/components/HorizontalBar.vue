<template>
  <div>
    <h2 class="text-white text-lg font-bold">大区数据信息</h2>
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
const colorList = ['#1089e7', '#f57474', '#f8b448', '#8b78f3', '#91cc75', '#ff9900']
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
    // tooltip: {
    //   // trigger: 'axis',
    //   axisPointer: {
    //     // type: 'shadow',
    //   },
    // },
    xAxis: [{
      show: false,
      type: 'value',
      max: function (value: any) {
        return value.max * 1.2
      },
    }],
    yAxis: [{
      type: 'category',
      data: props.data.regions.map((item: any) => item.name),
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
      },
    }, {
      show: false,
      data: [100, 100, 100, 100, 100, 100],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    }],
    grid: {
      top: 10,
      bottom: 0,
      left: 0,
      right: -40,
      containLabel: true,
    },
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: 0,
    //     zoomSize: 2,
    //     start: 0,
    //     end: 100
    //   }
    // ],
    series: [
      {
        type: 'bar',
        // realtimeSort: true,
        barWidth: 18,
        radius: 5,
        yAxisIndex: 0,
        data: props.data.regions.map((item: any) => ({
          name: item.name,
          value: item.value,
        })),
        // showBackground: true,
        // backgroundStyle: {
        //   color: 'rgba(220, 220, 220, 0.8)',
        //   radius: 5,
        // },
        itemStyle: {
          borderRadius: 20,
          color: function (params: any) {
            return colorList[params.dataIndex]
          },
          // borderWidth: 1,
          // borderType: 'solid',
          // borderColor: '#73c0de',
          // shadowColor: '#5470c6',
          // shadowBlur: 3
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          formatter: function (params: any) {
            return params.value + '%'
          }
        },
      },
      {
        type: 'bar',
        barWidth: 18,
        data: [100, 100, 100, 100, 100, 100],
        yAxisIndex: 1,
        itemStyle: {
          color: 'none',
          borderWidth: 3,
          borderColor: '#00c1de',
          borderRadius: 15,
        },
      }
    ],
  })
  // prettier-ignore
  let dataAxis = props.data.regions.map((item: any) => item.name);
  // prettier-ignore
  let data = props.data.regions.map((item: any) => item.value);
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });
}
</script>

<style scoped></style>
