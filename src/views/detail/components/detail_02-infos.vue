<template>
  <div class="infos">
    <div class="title">{{ topInfos.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" :key="index">
        <span 
          class="item" 
          v-if="item.tagText"
          :style="{color: item.tagText.color, background: item.tagText.background.color}"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="comment extra">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief.overall }}</span>
        <span class="name">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="count">{{ topInfos.commentBrief.totalCount }} 条评论</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="position extra">
      <div class="left">{{ topInfos.nearByPosition.address }}</div>
      <div class="right">
        地图·周边
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    topInfos: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang="less" scoped>
  .infos {
    margin-top: 12px;
    padding: 0 14px;
    .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 26px;
      text-align: justify;
    }
    .tags {
      margin-top: 12px;
      .item {
        padding: 2px 3px;
        margin-left: 5px;
        font-size: 12px;
      }
    }
    .extra {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        padding: 8px 12px;
        background-color: #f5f7fa;
        border-radius: 5px;
        color: #333;
        .right {
          color: var(--primary-color);
        }
      }
    .comment {
      margin-top: 12px;
      .left {
        .score {
          font-size: 18px;
          font-weight: 700;
        }
        .name {
          font-weight: 700;
          margin: 0 5px;
        }
      }
    }
    .position {
      margin-top: 12px;
      .left {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
</style>