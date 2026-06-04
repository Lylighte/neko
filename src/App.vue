<script setup lang="ts">
import { siteConfig } from '@/data/config'

if (import.meta.env.DEV) {
  const c = (color: string) => `color: ${color}; font-weight: bold;`
  console.log(
    `%c🚀 %c${siteConfig.name} %cPortal`,
    c('#67C23A'),
    c('#E6A23C'),
    'color: white;',
  )
  console.log(`%cEnvironment: %c${import.meta.env.MODE}`, c('#67C23A'), c('#F56C6C'))
}
</script>

<template>
  <router-view />
</template>
