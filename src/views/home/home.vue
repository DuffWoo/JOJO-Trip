<template>
  <div class="home">
    <HomeNavBar/>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <HomeSearchBox :hotSuggests="hotSuggests"/>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';

  import jojoRequest from '@/services/request/index'

  // 热门建议
  const hotSuggests = ref([])
  jojoRequest.get({
    url: '/home/hotSuggests'
  }) .then(res => {
    hotSuggests.value = res.data
  })
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