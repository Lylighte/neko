<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PixelButton from './PixelButton.vue'

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const shouldShow = ref(false)

let scrollHandler: (() => void) | null = null

onMounted(() => {
  scrollHandler = () => {
    shouldShow.value = window.scrollY > 200
  }
  window.addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <PixelButton
    class="scroll-to-top"
    :sound-url="''"
    @click="scrollToTop"
    :type="shouldShow ? 'show' : 'hide'"
  >
    ↑
  </PixelButton>
</template>

<style lang="css" scoped>
.scroll-to-top {
  font-size: 1.5rem;
  position: fixed;
  height: 3rem;
  width: 3rem;
  bottom: 0;
  right: 0;
  z-index: var(--pixel-z-overlay);
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.scroll-to-top[type='hide'] {
  transform: translateY(100%);
  opacity: 0;
}
</style>
