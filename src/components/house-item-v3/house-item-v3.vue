<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span class="text">{{ itemData.location }}</span>
        </div>
        <div class="title">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="new">{{ '￥' + itemData.finalPrice }}</div>
          <div class="old">{{ '￥' + itemData.productPrice }}</div>
          <!-- <div class="tip">{{ itemData?.priceTipBadge?.text }}</div> -->
          <div class="tip" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    itemData: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang="less" scoped>
  .house-item {
    width: 50%;
    .item-inner {
      margin: 5px;
      border-radius: 10px;
      overflow: hidden;
      .cover {
        img {
          width: 100%;
        }
      }
      .info {
        padding: 8px 10px;
        font-size: 8px;
        color: #666;
        .location {
          display: flex;
          img {
            width: 12px;
            height: 12px;
            margin-right: 3px;
          }
        }
        .title {
          font-size: 12px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin: 7px 0;
          font-weight: 600;
        }
        .price {
          display: flex;
          align-items: flex-start;
          margin-top: 7px;
          text-align: center;
          .new {
            color: var(--primary-color);
            font-size: 14px;
            font-weight: 600;
          }
          .old {
            margin: 0 5px;
            font-size: 5px;
            text-decoration: line-through;
          }
          .tip {
            background-image: linear-gradient(270deg,#f66,#ff9f9f);
            border-radius: 10px;
            padding: 0 7px;
            color: #fff;
          }
        }
      }
  }
  }
</style>