import { onMounted, onUnmounted, ref } from "vue"

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
  const scrollListenerHandler = () => {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    console.log('------------')
    if (clientHeight + scrollTop >= scrollHeight) {
      console.log('MORE')
      isReachBottom.value = true
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom }
}