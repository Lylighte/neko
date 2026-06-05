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
  background-color: #616161;
  color: #fff;
  outline: 2px solid black;
  border-image: var(--input-border-image);
  overflow-y: hidden;
}
</style>
