<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1. 搜索框 -->
      <form action="/">
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action clearable shape="round"
          @cancel="cancelClick" />
      </form>

      <!-- 2. tab 的切换 -->
      <van-tabs v-model:active="tabActive" color="var(--primary-color)" line-height="3">
        <!-- <van-tab :title="allCity?.cityGroup?.title"></van-tab> -->
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- 城市展示列表 -->
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <cityGroup v-show="tabActive === key" :groupData="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
// import { getCityAll } from '@/services'
import useCityStore from '@/stores/moudles/city'

import cityGroup from './components/city-group.vue'

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

// 从 store 中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 目的: 获取选中标签后的数据
// 1.获取正确的 key: 将 tabs 中绑定的 tabAction 正确绑定
// 2.根据 key 从 allCities 获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹 computed
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
  .city {
    .top {
      position: relative;
      z-index: 9;
    }
    .content {
      height: calc(100vh - 98px);
      overflow-y: auto;
    }
  }
</style>