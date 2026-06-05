<script lang="ts" setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import ArticleView from './components/ArticleView.vue'
import DocsSidebar from './components/DocsSidebar.vue'

const { frontmatter } = useData()
const route = useRoute()

const hasHero = computed(() => !!frontmatter.value.hasHero)

const isNewsPost = computed(() => {
  const path = route.path
  return path.startsWith('/news/') && path !== '/news/' && path !== '/news'
})

// Docs sub-pages get a sidebar layout; /docs/ itself is the index (no sidebar)
const isDocsPage = computed(() => {
  const path = route.path
  return path.startsWith('/docs/') && path !== '/docs/' && path !== '/docs'
})

const articleProps = computed(() => {
  if (!isNewsPost.value) return null
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
  <div class="pixel-layout">
    <NavBar />
    <main class="main-content">
      <div v-if="isDocsPage" class="docs-layout">
        <DocsSidebar />
        <div class="page-container vp-doc">
          <Content />
        </div>
      </div>
      <ArticleView v-else-if="articleProps" v-bind="articleProps">
        <Content />
      </ArticleView>
      <div v-else class="page-container vp-doc" :class="{ 'with-hero': hasHero }">
        <Content />
      </div>
    </main>
    <SiteFooter />
    <ScrollToTop />
  </div>
</template>

<style>
/* ── Match VitePress dark palette to Pixel ── */
.pixel-layout {
  min-height: 100vh;
  background-color: var(--pixel-color-bg);
}

/* Remove default VitePress nav, sidebar, doc footer */
.pixel-layout :deep(.VPNav),
.pixel-layout :deep(.VPSidebar),
.pixel-layout :deep(.VPDocFooter),
.pixel-layout :deep(.VPLocalNav) {
  display: none;
}

/* Constrain text-heavy pages (about, etc.) for readability */
.page-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 5rem 1.5rem 2rem;
}

.page-container.with-hero {
  padding-top: 0;
}

/* Docs layout: sidebar + content */
.docs-layout {
  display: flex;
  min-height: calc(100vh - 5rem);
  padding-top: 5rem;
}

.docs-layout .page-container {
  flex: 1;
  min-width: 0;
}

@media screen and (max-width: 768px) {
  .docs-layout {
    flex-direction: column;
  }
}
</style>
