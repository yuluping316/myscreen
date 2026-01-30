import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMapStore = defineStore('mapStore', () => {
  let info = ref()
  async function getInfo() {
    return info.value
  }
  let center=ref()
  function initInfo() {
    center.value=new T.LngLat(116.4074, 39.9042)
  }
  return {
    info,
    getInfo,
    initInfo
  }
})