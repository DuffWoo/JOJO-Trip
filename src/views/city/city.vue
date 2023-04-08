<template>
  <div class="city top-page">
    <!-- 1. 搜索框 -->
    <form action="/">
      <van-search 
        v-model="searchValue" 
        placeholder="请输入搜索关键词" 
        show-action 
        clearable
        shape="round"
        @cancel="cancelClick" 
      />
    </form>

    <!-- 2. tab 的切换 -->
    <van-tabs v-model:active="tabActive" color="var(--primary-color)">
      <van-tab title="国内·港澳台"></van-tab>
      <van-tab title="海外"></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { getCityAll } from '@/services'

const router = useRouter()

// 搜索框功能
const searchValue = ref('')
const cancelClick = () => {
  router.back()
}

// tab 的切换
const tabActive = ref()

// 网络请求：请求城市的数据
// jojoRequest.get({
//   url: '/city/all'
// }).then(res => {
//   console.log(res)
// })
getCityAll().then(res => {
  console.log(res)
})


</script>

<style lang="less" scoped>
</style>