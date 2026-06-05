<script lang="ts" setup>
const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <input class="pixel-input" type="text" v-model="model" />
</template>

<style lang="css" scoped>
.pixel-input {
  letter-spacing: 1px;
  padding: 2px;
  border: 2px solid;
  background-color: var(--pixel-input-bg);
  color: var(--pixel-input-text);
  outline: var(--pixel-input-border);
  border-image: var(--input-border-image);
  font-size: 1rem;
}

.pixel-input:disabled {
  color: var(--pixel-input-disabled-text);
  background-color: var(--pixel-input-disabled-bg);
}
</style>
