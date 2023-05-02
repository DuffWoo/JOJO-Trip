<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
  .categories {
    display: flex;
    height: 80px;
    padding: 0 10px;
    margin-top: 4px;
    overflow-x: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    .item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 70px;
      padding: 0 1px;

      img {
      height: 32px;
      width: 32px;
      }

      .text {
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
</style>