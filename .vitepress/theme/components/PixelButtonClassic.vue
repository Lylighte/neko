<script lang="ts" setup>
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
</script>

<template>
  <div class="pixel-button-classic" @click="soundOn($props.soundUrl)">
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.pixel-button-classic {
  height: 3rem;
  width: 100%;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  background: var(--btn-classic-bg);
  image-rendering: pixelated;
  border: 2px solid #000;
}

.pixel-button-classic[activated='true'] .title {
  background-color: rgba(100, 100, 255, 0.45);
  text-shadow: 2px 2px #202013cc;
  color: #ffffa0;
  box-shadow:
    inset -2px -4px #0004,
    inset 2px 2px #fff5;
}

.pixel-button-classic:hover .title {
  background-color: rgba(100, 100, 255, 0.45);
  text-shadow: 2px 2px #202013cc;
  color: #ffffa0;
}

.pixel-button-classic:active .title {
  box-shadow:
    inset -2px -4px #0004,
    inset 2px 2px #fff5;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding-bottom: 0.3em;

  color: #ddd;
  text-shadow: 2px 2px #000a;
  box-shadow:
    inset -2px -4px #0006,
    inset 2px 2px #fff7;
}
</style>
