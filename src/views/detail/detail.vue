<template>
  <div class="detail top-page" ref="detailRef">
    <TabControl 
      v-if="showTabControl"
      class="tab"
      :titles="names"
      @tabItemClick="tabClick"
    />
    <van-nav-bar 
      title="房屋详情" 
      left-text="返回" 
      left-arrow @click-left="onClickLeft" 
    />

    <div class="mian" v-if="mainPart" v-memo="[mianPart]">
      <DetailSwipe :swipeData="mainPart.topModule.housePicture.housePics" />
      <DetailInfos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule" />
      <DetailFacility name="设施" :ref="getSectionRef" :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <DetailLandlord  name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <DetailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <DetailIntro :price-intro="mainPart.introductionModule"/>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">JOJO Trip, Never Endless!</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { getDetailInfos } from '@/services'
import TabControl from '@/components/tab-control/tabControl.vue'
import DetailSwipe from './components/detail_01-swipe.vue'
import DetailInfos from './components/detail_02-infos.vue'
import DetailFacility from './components/detail_03-facility.vue'
import DetailLandlord from './components/detail_04-landlord.vue'
import DetailComment from './components/detail_05-comment.vue'
import DetailNotice from './components/detail_06-notice.vue'
import DetailMap from './components/detail_07-map.vue'
import DetailIntro from "./components/detail_08-intro.vue"
import useScroll from '@/hooks/useScroll'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)

getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// tabControl相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  // console.log(scrollTop.value)
  return scrollTop.value >= 100
})

// 转跳定位
// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
//   console.log('----------')
// }
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  const name = value.$el.getAttribute("name")
  // console.log(name)
  sectionEls.value[name] = value.$el
}

const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  // let instance = sectionEls[index].offsetTop
  let instance = el.offsetTop
  // if (index !== 0) {
  //   instance = instance - 44
  // }
  instance = instance - 44
  detailRef.value.scrollTo({
    top: instance,
    behavior: 'smooth'
  })
}
</script>

<style lang="less" scoped>
.detail {
  .tab {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  :deep(.van-nav-bar__title) {
    font-weight: 300;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
}
</style>