<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  height: {
    type: String,
    default: '6rem',
  },
  soundUrl: {
    type: String,
    default: '/button.click.ogg',
  },
})

const pressed = ref(false)

const soundOn = (url: string) => {
  if (!url) return
  const audio = new Audio(url)
  audio.play()
  audio.volume = 0.3
}
</script>

<template>
  <div
    class="pixel-button-3d"
    :class="{ 'is-pressed': pressed }"
    :style="{
      height: pressed ? `calc(${$props.height} - var(--pixel-btn-3d-offset))` : $props.height,
    }"
    @click="soundOn($props.soundUrl)"
    @mousedown="pressed = true"
    @mouseup="pressed = false"
    @mouseleave="pressed = false"
  >
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.pixel-button-3d {
  padding: 1rem 2rem;
  position: relative;
  cursor: pointer;
  user-select: none;
  background-color: #313233;
  border: 2px solid rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease-in-out;
  box-shadow: var(--pixel-shadow-hard);
}

.pixel-button-3d:hover::after {
  background-color: #ffffff08;
}

.pixel-button-3d.is-pressed {
  transform: translateY(var(--pixel-btn-3d-offset));
  margin-bottom: var(--pixel-btn-3d-offset);
}

.pixel-button-3d.is-pressed::after {
  box-shadow:
    2px 2px 0 0 rgba(178, 178, 178, 0.5) inset,
    -2px -2px 0 0 rgba(153, 153, 153, 0.5) inset;
}

.pixel-button-3d::after {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  box-shadow:
    0 -12px 0 0 rgb(104, 104, 104) inset,
    2px 2px 0 0 rgba(178, 178, 178, 0.5) inset,
    -2px -16px 0 0 rgba(153, 153, 153, 0.5) inset;
  mix-blend-mode: hard-light;
  pointer-events: none;
  transition: all 0.1s ease-in-out;
}
</style>
