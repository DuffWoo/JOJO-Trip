<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox />

    <HomeCategories/>
  </div>
</template>

<script setup>
  // import { ref } from 'vue'
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue'
  import useHomeStore from '@/stores/moudles/home';

  // import jojoRequest from '@/services/request/index'

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  
</script>

<style lang="less" scoped>
  .home {
    .banner {
      img {
        width: 100%;
      }
    }
  }
</style>