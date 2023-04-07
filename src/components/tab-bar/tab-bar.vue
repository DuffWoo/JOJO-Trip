<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <!-- <van-tabbar-item icon="home-o" :to="item.path"> -->
        <van-tabbar-item :to="item.path">
          <template #default>
            {{ item.text }}
          </template>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { ref } from 'vue'

const currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    // font-size: 52px;
    margin-bottom: 2px;
  }

  img {
    height: 23px;
  }
}
</style> 