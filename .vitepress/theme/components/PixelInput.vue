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
  background-color: #616161;
  color: #fff;
  outline: 2px solid black;
  border-image: var(--input-border-image);
  font-size: 1rem;
}

.pixel-input:disabled {
  color: #aaa;
  background-color: #424242;
}
</style>
