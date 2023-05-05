import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'

// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//       const clientHeight = document.documentElement.clientHeight
//       const scrollTop = document.documentElement.scrollTop
//       const scrollHeight = document.documentElement.scrollHeight
//       console.log('------------')
//       if (clientHeight + scrollTop >= scrollHeight) {
//         console.log('MORE')
//         if (reachBottomCB) reachBottomCB() 
//       }
//   }
export default function useScroll() {
  const isReachBottom = ref(false)

  let clientHeight = ref(0)
  let scrollTop = ref(0)
  let scrollHeight = ref(0)

  // 防抖 / 节流
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    // console.log('listener scroll')
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log('scroll bottom')
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler, true)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler, true)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}