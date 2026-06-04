<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollToTop from './components/ScrollToTop.vue'
</script>

<template>
  <div class="minecraft-layout">
    <NavBar />
    <main class="main-content">
      <Content />
    </main>
    <SiteFooter />
    <ScrollToTop />
  </div>
</template>

<style>
/* ── Match VitePress dark palette to Minecraft ── */
.minecraft-layout {
  min-height: 100vh;
  background-color: var(--background-color);
}

/* Remove default VitePress nav, sidebar, doc footer */
.minecraft-layout :deep(.VPNav),
.minecraft-layout :deep(.VPSidebar),
.minecraft-layout :deep(.VPDocFooter),
.minecraft-layout :deep(.VPLocalNav) {
  display: none;
}
</style>
