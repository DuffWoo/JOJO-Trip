<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="section date-range">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共1晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import useCityStore from '@/stores/moudles/city';
  import { formatMonthDay } from '@/utils/format-date';

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

  // 当前城市
  const cityStore = useCityStore()
  const { currentCity } = storeToRefs(cityStore)


  // 日期范围处理
  const nowDate = new Date()
  const startDate = ref(formatMonthDay(nowDate))
  const newDate = nowDate.setDate(nowDate.getDate() + 1)
  const endDate = ref(formatMonthDay(newDate))

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

.section {
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;
  background-color: #fff4ec;
  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }
  .end {
    min-width: 22%;
    padding-left: 20px;
  }
  .date {
    display: flex;
    flex-direction: column;
    .tip {
      font-size: 12px;
      color: #999;
    }
    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
</style>