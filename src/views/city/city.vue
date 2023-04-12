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
      <!-- <van-tab :title="allCity?.cityGroup?.title"></van-tab> -->
      <template v-for="(value, key, index) in allCities" :key="key">
        <van-tab :title="value.title"></van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
// import { getCityAll } from '@/services'
import useCityStore from '@/stores/moudles/city'

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

// const allCity = ref()
// getCityAll().then(res => {
//   allCity.value = res.data
// })

const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

</script>

<style lang="less" scoped>
</style>