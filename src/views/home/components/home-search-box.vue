<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <img src="@/assets/img/home/icon_location.png" alt="">
        <span class="text">我的位置</span>
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
    <!-- 价格/人数选择 -->
    <div class="price-counter">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="keyword">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="hot-suggests">
      <template v-for="(item, index) in hotSuggests">
        <div class="item"
          :style="{color: item.tagText.color, background: item.tagText.background.color}"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import useCityStore from '@/stores/moudles/city';
  import { formatMonthDay, getDiffDays } from '@/utils/format-date';
  import useHomeStore from '@/stores/moudles/home';

  const router = useRouter()

  // 定义 props
  // defineProps ({
  //   hotSuggests: {
  //     type: Array,
  //     default: () => []
  //   }
  // })

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

  // 热门建议
  const homeStore = useHomeStore()
  const { hotSuggests } = storeToRefs(homeStore)

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
        margin-right: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }
  // 日期范围
  .section {
    display: flex;
    align-items: center;
    padding: 3px 20px;
    color: #999;
    height: 44px;
    background-color: #fff8f4;
    border-radius: 20px;
    margin: 0 10px;
    .start {
      display: flex;
      height: 44px;
      align-items: center;
        .date {
          align-items: start;
        }
    }
    .date {
      display: flex;
      flex-direction: column;
      align-items: end;
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
  // 价格/人数选择
  .price-counter {
    display: flex;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
    padding: 0 30px;
    margin-top: 5px;
    background-color: none;
    color: #999;
  }
  // 关键字
  .keyword {
    height: 44px;
    line-height: 44px;
    padding: 0 30px;
    background-color: none;
    color: #999;
  }
  // 热门建议
  .hot-suggests {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 22px;
    font-size: 12px;
      .item {
        margin: 4px;
        padding: 4px 8px;
        border-radius: 14px;
        line-height: 1;
      }
  }
}

</style>