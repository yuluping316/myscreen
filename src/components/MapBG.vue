<template>
  <div class="relative" >
    <div id="tianMap" class="w-full h-full">
    </div>
  </div>
</template>

<script setup lang="ts">
//测试一下gitee刷新github代码
// import { onMounted } from 'vue'
// import { useMapStore } from '@/stores/map'
// const initMap = () => {
//   let T = window.T;
//   let tmap = new T.Map('tianMap')
//   tmap.centerAndZoom(new T.LngLat(116.4074, 39.9042), 16)
//   tmap.enableDrag()
//   tmap.setMapType(window.TMAP_HYBRID_MAP)
  
// }
// onMounted(async () => {
//   await useMapStore().getInfo()
//   const script = document.createElement('script')
//   script.src = 'https://api.tianditu.gov.cn/api?v=4.0&tk=2d58761eb6bbdac6095476b73d4d1a82'
//   script.onload = initMap
//   document.body.appendChild(script)
// })
</script>

<style scoped>
</style>
