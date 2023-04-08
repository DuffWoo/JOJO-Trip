<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">深圳</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter()

  // Error
  const positionClick = () => {
    navigator.geolocation.getCurrentPosition(
      res => {
        console.log('SUCCESS!', res)
      },
      err => {
        console.log('ERROR!', err)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  const cityClick = () => {
    router.push('/city')
  }
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    font-size: 15px;
    color: #333;
  }

  .position {
    display: flex;
    align-items: center;
    width: 74px;

    .text {
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>