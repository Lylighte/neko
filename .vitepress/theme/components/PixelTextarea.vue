<script lang="ts" setup>
const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <textarea
    class="pixel-input"
    v-model="model"
    @input="($event.target as HTMLTextAreaElement).style.height = ''; ($event.target as HTMLTextAreaElement).style.height = `calc(0.2rem + ${($event.target as HTMLTextAreaElement).scrollHeight}px)`"
  ></textarea>
</template>

<style lang="css" scoped>
.pixel-input {
  font-size: 1rem;
  letter-spacing: 1px;
  padding: 0.2rem;
  border: 2px solid;
  background-color: var(--pixel-input-bg);
  color: var(--pixel-input-text);
  outline: var(--pixel-input-border);
  border-image: var(--input-border-image);
  overflow-y: hidden;
}
</style>
