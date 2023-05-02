<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox/>

    <HomeCategories/>

    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar :startDate="'01.01'" :endDate="'02.02'"/>
    </div>

    <HomeContent/>

  </div>
</template>

<script setup>
  import useHomeStore from '@/stores/modules/home';
  
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue'
  import HomeContent from './components/home-content.vue'
  import SearchBar from '@/components/search-bar/search-bar.vue'

  import useScroll from '@/hooks/useScroll'
  import { watch, ref, computed } from 'vue';

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  homeStore.fetchHouseListData()

  // 监听 window 滚动加载更多
  // 方法二：
  const { isReachBottom, scrollTop } = useScroll()
  watch(isReachBottom, (newValue) => {
    if(newValue) {
      homeStore.fetchHouseListData().then(() => {
        isReachBottom.value = false
      })
    }
  })

  // 搜索框显示的控制
  // 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
  const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
  })
</script>

<style lang="less" scoped>
  .home {
    padding-bottom: 60px;
    .banner {
      img {
        width: 100%;
      }
    }
    .search-bar {
      position: fixed;
      z-index: 9;
      left: 0;
      top: 0;
      right: 0;
      height: 45px;
      padding: 12px 16px;
      background-color: #fff;
    }
  }
</style>