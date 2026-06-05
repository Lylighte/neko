<script lang="ts" setup>
defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
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
</script>

<template>
  <div
    :class="$props.dark ? 'pixel-button dark' : 'pixel-button'"
    @click="soundOn($props.soundUrl)"
  >
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.pixel-button {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pixel-btn-text);
  padding: 1rem;
  outline: var(--pixel-btn-border);
  border: 2px solid;
  background-color: #c6c6c6;
  border-image: var(--btn-border-image);
  cursor: pointer;
}

.pixel-button.dark {
  color: #fff;
  outline: 2px solid #333;
  background-color: #303030;
  border-image: var(--btn-border-image);
}

.pixel-button:hover {
  color: #fff;
  outline: 2px solid #fff;
  background-color: var(--pixel-btn-bg-hover);
  border-image: var(--btn-border-image-hover);
}

.pixel-button:active {
  background-color: #8b8b8b;
  border-image: var(--btn-border-image-active);
}

.pixel-button:active:hover {
  color: #fff;
  outline: 2px solid #fff;
  background-color: var(--pixel-btn-bg-hover);
  border-image: url('/UI/button_pressed.png') 1;
}
</style>
