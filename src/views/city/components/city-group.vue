<template>
  <van-index-bar highlight-color="var(--primary-color)" :index-list="indexList">

    <van-index-anchor index="Hot" />
    <div class="hotList">
      <template v-for="(city, index) in groupData.hotCities">
        <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
      </template>
    </div>

    <template v-for="(group, index) in groupData?.cities" :key="index">
      <van-index-anchor :index="group.group" />
      <template v-for="(city, index) in group.cities" :key="index">
        <van-cell :title="city.cityName" @click="cityClick(city)"/>
      </template>
    </template>
  </van-index-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/moudles/city';

// 定义 props
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 动态索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift('🔥')
  return list
})

// 监听城市点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 选中当前城市
  cityStore.currentCity = city

  // 回退上一级
  router.back()
}

</script>

<style lang="less" scoped>
  .hotList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
      margin: 6px 0;
      height: 28px;
      width: 70px;
      background-color: #fff4ec;
      border-radius: 14px;
      text-align: center;
      line-height: 28px;
      font-size: 12px;
    }
  }
</style>