<template>
  <div class="detail-section">
    <div class="header">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="content">
      <slot>
        <h4>Default</h4>
      </slot>
    </div>
    <div class="footer" v-if="moreText.length">
      <span class="more">{{ moreText }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Default Tittle'
    },
    moreText: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="less" scoped>
  .detail-section {
    margin-top: 12px;
    padding: 0 15px;
    border-top: 5px solid #f2f3f4;
    .header {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      .title {
        font-size: 20px;
        color: #333;
      }
    }
    .content {
      padding: 8px 0;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: var(--primary-color);
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }
</style>