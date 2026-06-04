<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

defineProps({
  soundUrl: {
    type: String,
    default: '/button.click.ogg',
  },
})

const soundOn = (url: string) => {
  if (!url) return
  const audio = new Audio(url)
  audio.play()
  audio.volume = 0.3
}

// Parse nav items from VitePress config
const navItems = computed(() => {
  const raw = theme.value.nav
  if (!raw || !Array.isArray(raw)) return []
  return raw.map((item: { text?: string; link?: string }) => ({
    name: item.text || '',
    url: item.link || '/',
  }))
})

// Active index tracking
const activeIndex = ref(0)

const updateActiveIndex = (path: string) => {
  let bestIdx = 0
  let bestLen = 0
  navItems.value.forEach((item, index) => {
    // Match: exact or prefix (e.g. /blog/hello matches /blog/)
    if (path.startsWith(item.url) && item.url.length > bestLen) {
      bestIdx = index
      bestLen = item.url.length
    }
  })
  activeIndex.value = bestIdx
}

// Watch route changes
watch(
  () => route.path,
  (path) => updateActiveIndex(path),
  { immediate: true },
)

const sliderStyle = computed(() => {
  const count = navItems.value.length
  if (count === 0) return {}
  return {
    width: `${100 / count}%`,
    transform: `translateX(${activeIndex.value * 100}%)`,
    transition: 'transform 0.5s ease',
  }
})
</script>

<template>
  <div class="nav-container" v-if="navItems.length > 0">
    <nav class="nav-bar">
      <a
        v-for="(item, index) in navItems"
        :key="index"
        class="nav-item"
        :href="item.url"
        @click.prevent="(soundOn($props.soundUrl), updateActiveIndex(item.url))"
      >
        {{ item.name }}
      </a>

      <div class="slider" :style="sliderStyle">
        <div class="slider-box"></div>
      </div>
    </nav>
  </div>
</template>

<style lang="css" scoped>
.nav-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  min-width: max-content;
  gap: 0.5rem;
  user-select: none;
  z-index: 1024;
}

.nav-bar {
  height: calc(1rem + 28px);
  display: flex;
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid gray;
  position: relative;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.7);
  opacity: 1;
  overflow: hidden;
}

.nav-item {
  position: relative;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s ease;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.nav-item:hover {
  color: #fff;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 0;
  box-sizing: border-box;
  padding: 4px;
}

.slider-box {
  box-sizing: border-box;
  background-color: #7e0c6b;
  border-radius: 0;
  border-top: 4px solid #9b428c;
  border-bottom: 4px solid #46073b;
  height: 100%;
  width: 100%;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 480px) {
  .nav-item {
    padding: 8px 6px;
    font-size: 0.85rem;
  }
}
</style>
