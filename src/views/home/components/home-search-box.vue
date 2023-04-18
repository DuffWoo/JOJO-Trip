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
    <div class="section date-range" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayDate }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
     <!-- 日历 -->
    <div class="calendar">
      <van-calendar 
        v-model:show="showCalendar" 
        color="var(--primary-color)"
        type="range"
        :formatter="formatter"
        :show-confirm="false"
        @confirm="onConfirm" 
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import useCityStore from '@/stores/moudles/city';
  import { formatMonthDay, getDiffDays } from '@/utils/format-date';

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
  const newDate = new Date()
  newDate.setDate(nowDate.getDate() + 1)

  const startDate = ref(formatMonthDay(nowDate))
  const stayDate = ref(getDiffDays(nowDate, newDate))
  const endDate = ref(formatMonthDay(newDate))

  // 日历
  // 显示/不显示日历
  const showCalendar = ref(false)
  // 自定义日期文案
  const formatter = (day) => {
    if (day.type === 'start') {
        day.bottomInfo = '入住';
    } else if (day.type === 'end') {
        day.bottomInfo = '离店';
    }
    return day
  }
  // 设置选择日期
  const onConfirm = (value) => {
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    startDate.value = formatMonthDay(selectStartDate)
    stayDate.value = getDiffDays(selectStartDate, selectEndDate)
    endDate.value = formatMonthDay(selectEndDate)
    // 隐藏日历
    showCalendar.value = false
  }

</script>

<style lang="less" scoped>
.search-box {
  // 位置信息
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 30px;

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
  // 日期范围
  .section {
    display: flex;
    align-items: center;
    padding: 3px 23px;
    color: #999;
    height: 44px;
    background-color: #fff8f4;
    border-radius: 20px;
    margin: 0 20px;
    .start {
      display: flex;
      height: 44px;
      align-items: center;
    }
    .date {
      display: flex;
      flex-direction: column;
      align-items: center;
      .tip {
        font-size: 12px;
        color: #999;
      }
      .time {
        margin-top: 4px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .date-range {
    height: 44px;
    .stay {
      flex: 1 1 auto;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
  // 日历
  .calendar {
    --van-calendar-popup-height: 90%;
  }
}

</style>