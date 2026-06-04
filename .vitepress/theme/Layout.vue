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
/* ── Full-width layout override ── */
.minecraft-layout {
  min-height: 100vh;
  background-color: var(--background-color);
}

/* Strip VitePress content wrapper constraints */
.minecraft-layout .VPDoc,
.minecraft-layout .VPContent,
.minecraft-layout .VPHero {
  max-width: 100% !important;
  padding: 0 !important;
}

/* Remove default nav & sidebar */
.minecraft-layout .VPNav,
.minecraft-layout .VPSidebar,
.minecraft-layout .VPDocFooter,
.minecraft-layout .VPLocalNav {
  display: none !important;
}
</style>
