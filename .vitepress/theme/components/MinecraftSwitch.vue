<script lang="ts" setup>
const model = defineModel<boolean>({
  default: false,
})
const emits = defineEmits(['on', 'off'])

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

const flick = (soundUrl: string) => {
  if (model.value) {
    emits('off')
  } else {
    emits('on')
  }
  model.value = !model.value
  soundOn(soundUrl)
}
</script>

<template>
  <input
    class="minecraft-switch"
    type="checkbox"
    :checked="model"
    @click="flick($props.soundUrl)"
  />
</template>

<style lang="css" scoped>
.minecraft-switch {
  appearance: none;
  color: transparent;
  width: 60px;
  height: 32px;
  background-image: url('/UI/toggle_off.png');
}

.minecraft-switch:hover {
  appearance: none;
  color: transparent;
  width: 60px;
  height: 32px;
  background-image: url('/UI/toggle_off_hover.png');
}

.minecraft-switch:checked {
  background-image: url('/UI/toggle_on.png');
}

.minecraft-switch:checked:hover {
  background-image: url('/UI/toggle_on_hover.png');
}

.minecraft-switch[new=''] {
  appearance: none;
  color: transparent;
  width: 60px;
  height: 32px;
  background-image: url('/UI/toggle_off_new.png');
}

.minecraft-switch[new='']:checked {
  background-image: url('/UI/toggle_on_new.png');
}
</style>
