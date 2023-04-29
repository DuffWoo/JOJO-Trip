<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox/>

    <HomeCategories/>

    <HomeContent/>

    <button @click="homelistBtn">MORE</button>
  </div>
</template>

<script setup>
  import useHomeStore from '@/stores/moudles/home';
  
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue'
  import HomeContent from './components/home-content.vue'

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  homeStore.fetchHouseListData()

  const homelistBtn = () => {
    console.log('MORE')
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