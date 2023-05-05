<template>
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
  defineProps({
    swipeData: {
      type: Array,
      default: () => {}
    } 
  })
</script>

<style lang="less" scoped>
  .item {
    img {
      width: 100%;
    }
  }
</style>