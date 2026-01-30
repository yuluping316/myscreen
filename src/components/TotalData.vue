<template>
  <div class="p-6">
    <div class="text-center text-slate-300">
      数据总量：
      <span ref="totalData" class="font-[Electronic] text-7xl ml-2 mr-2  text-white text-gradient">
        679,473,929
      </span> 
      条记录
    </div>
    <div class="mt-3 flex flex-wrap">
      <div class="w-1/3 text-center text-slate-400 text-sm text-white">华北：<span ref="city1"
          class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span></div>
      <div class="w-1/3 text-center text-slate-400 text-sm text-white">华北：<span ref="city2"
          class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span></div>
      <div class="w-1/3 text-center text-slate-400 text-sm text-white">华北：<span ref="city3"
          class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span></div>    
      <div class="w-1/3 text-center text-slate-400 text-sm text-white">华北：<span ref="city4"  
          class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span></div>
      <div class="w-1/3 text-center text-slate-400 text-sm text-white">华北：<span ref="city5"
          class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span></div>
      <div class="w-1/3 text-center text-slate-400 text-sm text-white">华北：<span ref="city6"
          class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'
const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
})
const totalData = ref()
const city1 = ref()
const city2 = ref()
const city3 = ref()
const city4 = ref()
const city5 = ref()
const city6 = ref()
onMounted(() => {
  new CountUp(totalData.value, props.data.total).start()
  new CountUp(city1.value, props.data.hb).start()
  new CountUp(city2.value, props.data.db).start()
  new CountUp(city3.value, props.data.hd).start()
  new CountUp(city4.value, props.data.zn).start()
  new CountUp(city5.value, props.data.xn).start()
  new CountUp(city6.value, props.data.xb).start()
})
</script>

<style scoped></style>
