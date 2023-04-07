<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData">
      <div 
           class="tab-bar-item" 
           :class="{ active: currentIndex === index }"
           @click="itemClick(index, item)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentIndex = ref(0)
const router = useRouter()

const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  border-top: 1px solid #f3f3f3;
  display: flex;

  & .active {
    color: var(--primary-color);
  }

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 33px;
    }

    .text {
      font-size: 10px;
      margin-top: 2px;
    }
  }
}
</style> 