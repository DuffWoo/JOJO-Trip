<template>
  <div class="search">
    <div class="select-time">
      <div class="item start">
        <div class="title">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>
      <div class=" item end">
        <div class="title">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>
    <div class="content">
      <div class="keyword">关键字 / 位置 / 民宿</div>
    </div>
    <div class="right">
      <i class="icon-search"></i>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia';
  import useMainStore from '@/stores/modules/main';
  import { formatMonthDay } from '@/utils/format-date';
  // defineProps({
  //   startDate: {
  //     type: String,
  //     default: '07.07'
  //   },
  //   endDate: {
  //     type: String,
  //     default: '08.08'
  //   }
  // })
  const mainStore = useMainStore()
  const { startDate, endDate } = storeToRefs(mainStore)
  const startDateStr = computed(() => formatMonthDay(startDate.value, 'MM.DD'))
  const endDateStr = computed(() => formatMonthDay(endDate.value, 'MM.DD'))
</script>

<style lang="less" scoped>
  .search {
    display: flex;
    background-color: #f2f4f6;
    border-radius: 8px;
    color: #999;
    .item {
      display: flex;
      font-size: 12px;
    }
    .select-time {
      display: flex;
      flex-direction: column;
      border-right: 5px solid #fff;
      padding: 8px 9px;
      .date {
        position: relative;
        margin-left: 5px;
        color: #333;
      }
      .end .date::after {
        content: "";
        width: 0;
        height: 0;
        border: 4px solid;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #333 rgba(0, 0, 0, 0) ;
        position: absolute;
        bottom: -9px;
        right: -10px;
        transform: rotate(135deg);
      }
    }
    .content {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-size: 13px;
    }
    .right {
      display: flex;
      align-items: center;
      padding-right: 10px;
      .icon-search {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-image: url(@/assets/img/home/home-sprite.png);
        background-size: 207px 192px;
        background-position: -29px -151px;
      }
    }
  }
</style>