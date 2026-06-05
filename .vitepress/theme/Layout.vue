<script lang="ts" setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import ArticleView from './components/ArticleView.vue'

const { frontmatter } = useData()
const route = useRoute()

const isBlogPost = computed(() => {
  const path = route.path
  return path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog'
})

const articleProps = computed(() => {
  if (!isBlogPost.value) return null
  const fm = frontmatter.value
  return {
    title: fm.title,
    author: fm.author,
    date: fm.date,
    endDate: fm.endDate,
    cover: fm.cover,
    category: fm.category,
  }
})
</script>

<template>
  <div class="minecraft-layout">
    <NavBar />
    <main class="main-content">
      <ArticleView v-if="articleProps" v-bind="articleProps">
        <Content />
      </ArticleView>
      <div v-else class="page-container">
        <Content />
      </div>
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

/* Constrain text-heavy pages (about, etc.) for readability */
.page-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 5rem 1.5rem 2rem;
}
</style>
