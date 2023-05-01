<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox/>

    <HomeCategories/>

    <HomeContent/>

    <!-- <button @click="homelistBtn">MORE</button> -->
  </div>
</template>

<script setup>
  import useHomeStore from '@/stores/moudles/home';
  
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue'
  import HomeContent from './components/home-content.vue'

  import useScroll from '@/hooks/useScroll'
  import { watch } from 'vue';

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  homeStore.fetchHouseListData()

  // 点击加载更多
  // const homelistBtn = () => {
  //   console.log('MORE')
  //   homeStore.fetchHouseListData()
  // }

  // 监听 window 滚动加载更多
  // window.addEventListener("scroll", () => {
  //   // console.log(document.documentElement.scrollTop)
  //   const clientHeight = document.documentElement.clientHeight
  //   const scrollTop = document.documentElement.scrollTop
  //   const scrollHeight = document.documentElement.scrollHeight
  //   // console.log(scrollTop, scrollHeight, clientHeight)
  //   if (clientHeight + scrollTop >= scrollHeight) {
  //     console.log('MORE')
  //     homeStore.fetchHouseListData()
  //   }
  // })

  // 方法一：
  // useScroll(() => {
  //   homeStore.fetchHouseListData()
  // })

  // 方法二：
  const { isReachBottom } = useScroll()
  watch(isReachBottom, (newValue) => {
    if(newValue) {
      homeStore.fetchHouseListData().then(() => {
        isReachBottom.value = false
      })
    }
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
  }
</style>