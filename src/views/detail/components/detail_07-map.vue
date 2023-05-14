<template>
  <div class="map">
    <DetailSection title="位置周边" moreText="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()

onMounted(() => {
  let map = new BMapGL.Map(mapRef.value)
  let point = new BMapGL.Point(props.position.longitude, props.position.latitude)
  map.centerAndZoom(point, 16)
  let marker = new BMapGL.Marker(point);        // 创建标注   
  map.addOverlay(marker);                     // 将标注添加到地图中
})
</script>

<style lang="less" scoped>
.baidu {
  height: 200px;
}
</style>