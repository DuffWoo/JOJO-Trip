import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)

  let clientHeight = ref(0)
  let scrollTop = ref(0)
  let scrollHeight = ref(0)

  // 防抖 / 节流
  const scrollListenerHandler = throttle(() => {
    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    // console.log('listener scroll')
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log('scroll bottom')
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}