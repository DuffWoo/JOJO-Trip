<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox/>

    <HomeCategories/>

    <div class="search-bar" v-if="isShowSearchBar">Search-Bar</div>

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
  import { watch, ref, computed } from 'vue';

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
  const { isReachBottom, scrollTop } = useScroll()
  watch(isReachBottom, (newValue) => {
    if(newValue) {
      homeStore.fetchHouseListData().then(() => {
        isReachBottom.value = false
      })
    }
  })

  // 搜索框显示的控制
  // const isShowSearchBar = ref(false)
  // watch(scrollTop, (newTop) => {
  //   isShowSearchBar.value = newTop > 100
  // })

  // 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
  const isShowSearchBar = computed(() => {
    return scrollTop.value >= 100
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