<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox/>

    <HomeCategories/>

    <HomeContent />

    <button @click="homelistBtn">click</button>
  </div>
</template>

<script setup>
  // import { ref } from 'vue'
  import useHomeStore from '@/stores/moudles/home';
  
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue'
  import HomeContent from './components/home-content.vue'

  // import jojoRequest from '@/services/request/index'

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()

  // let currentPage = 1
  homeStore.fetchHouseListData()

  const homelistBtn = () => {
    // currentPage++
    homeStore.fetchHouseListData()
  }
</script>

<style lang="less" scoped>
  .home {
    padding-bottom: 70px;
    .banner {
      img {
        width: 100%;
      }
    }
  }
</style>