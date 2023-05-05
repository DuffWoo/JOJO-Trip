<template>
  <div class="content">
    <h2 class="title">Hot Picks</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <!-- <div>{{ item.data.houseName }}</div> -->
        <HouseItemV9 
          v-if="item.discoveryContentType === 9" 
          :itemData="item.data"
          @click="itemClick(item.data)"
        />
        <HouseItemV3 
          v-else-if="item.discoveryContentType === 3" 
          :itemData="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
  import useHomeStore from '@/stores/modules/home';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  // components
  import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
  import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue';

  // homeStore
  const homeStore = useHomeStore()
  const { houseList } = storeToRefs(homeStore)

  // router
  const router = useRouter()

  // house item click
  const itemClick = (item) => {
    // console.log('itemClick', item.houseId)
    router.push('/detail/' + item.houseId)
  }
</script>

<style lang="less" scoped>
  .content {
    padding: 10px 10px;
    .title {
      margin-bottom: 5px;
      padding-left: 10px;
      color: var(--primary-color);
    }
    .list {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>