<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="2000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{active, total}">
        <!-- <div class="indicator">{{ active + 1 }}/{{ total }}</div> -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span 
              class="item"
              :class="{active: swipeData[active]?.enumPictureCategory == key}"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
  const props = defineProps({
    swipeData: {
      type: Array,
      default: () => {}
    } 
  })

  // 对数据进行转换
  const swipeGroup = {}
  // 思路二：一次循环
  for (let item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory]
    if(!valueArray) {
      valueArray = []
      swipeGroup[item.enumPictureCategory] = valueArray
    }
    valueArray.push(item)
  }
  // console.log(swipeGroup)

  // 思路一：两次循环
  // for (let item of props.swipeData) {
  //   swipeGroup[item.enumPictureCategory] = []
  // }
  // console.log(swipeGroup)
  // for (let item of props.swipeData) {
  //   const valueArray = swipeGroup[item.enumPictureCategory]
  //   valueArray.push(item)
  // }
  // console.log(swipeGroup)

  // 定义转换数据的方法
  const nameReg = /【(.*?)】/i
  const getName = (name) => {
    const results = nameReg.exec(name)
    return results[1]
  }

  // 选中数字索引
  const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data => data == item) + 1
  }
</script>

<style lang="less" scoped>
  .swipe {
    .swipe-list {
      .item {
        img {
          width: 100%;
        }
      }
      .indicator {
        display: flex;
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 0;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        .item {
          margin: 0 3px;
        &.active {
          border-radius: 6px;
          padding: 0 5px;
          background-color: rgba(255, 255, 255, 0.9);
          color: #333;
        }
        }
      }
    }
  }
</style>