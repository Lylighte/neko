<script lang="ts" setup>
import { ref } from 'vue'
import IntroItem from '@/components/IntroItem.vue'
import { staticIntroList } from '@/data/static'
import type { IntroEntity } from '@/data/types'

const intros = ref<IntroEntity[]>(staticIntroList)
</script>

<template>
  <div class="intro-area">
    <IntroItem
      v-for="(intro, index) in intros"
      :key="index"
      :intro="intro"
      :right="index % 2 == 1"
    />
  </div>
</template>

<style lang="css" scoped>
.intro-area {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;

  box-sizing: content-box;
}
</style>
