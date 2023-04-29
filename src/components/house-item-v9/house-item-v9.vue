<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="title">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate :model-value="itemScore" :size="10" color="#fff" readonly allow-half/>
          <div class="new-price">{{ '￥' + itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    itemData: {
      type: Object,
      default: () => ({})
    }
  })

  // 评分
  const itemScore = computed(() => {
    return Number(props.itemData.commentScore)
  })
</script>

<style lang="less" scoped>
  .house-item {
    width: 50%;
    .item-inner {
      position: relative;
      margin: 5px;
      border-radius: 10px;
      overflow: hidden;
      .cover {
        img {
          width: 100%;
        }
      }
      .info {
        position: absolute;
        bottom: 0;
        color: #fff;
        font-size: 8px;
        padding: 8px 10px;
        .summary {
          font-weight: 700;
        }
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin: 8px 0;
          font-size: 12px;
        }
        .price {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
        }
      }
    }
  }
</style>