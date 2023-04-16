<template>
  <van-index-bar highlight-color="var(--primary-color)" :index-list="indexList">

    <van-index-anchor index="Hot" />
    <div class="hotList">
      <template v-for="(city, index) in groupData.hotCities">
        <div class="city">{{ city.cityName }}</div>
      </template>
    </div>

    <template v-for="(group, index) in groupData?.cities" :key="index">
      <van-index-anchor :index="group.group" />
      <template v-for="(city, index) in group.cities" :key="index">
        <van-cell :title="city.cityName" />
      </template>
    </template>
  </van-index-bar>

  <!-- <div class="city-group">
    <template v-for="(group, index) in groupData?.cities" :key="index">
      <div class="group-item">
        <h3 class="title">Title:{{ group.group }}</h3>
        <div class="list">
          <template v-for="(city, index) in group.cities" :key="index">
            <div class="city">{{ city.cityName }}</div>
          </template>
        </div>
      </div>
    </template>
  </div> -->
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const indexList = computed(() => {
  return props.groupData.cities.map(item => item.group)
})
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