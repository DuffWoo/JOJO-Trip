<template>
  <van-index-bar highlight-color="var(--primary-color)">
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
  defineProps({
    groupData: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang="less" scoped>
</style>