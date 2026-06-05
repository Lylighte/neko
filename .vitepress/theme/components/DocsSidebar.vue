<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vitepress'

// 硬编码导航结构（与 docs/ 目录对应）
// 若文档增多，可改为从 themeConfig.sidebar 读取
const nav = [
  {
    title: 'Getting Started',
    items: [
      { text: 'Quick Start', link: '/docs/quick-start' },
      { text: 'Customization', link: '/docs/customization' },
      { text: 'Deployment', link: '/docs/deployment' },
    ],
  },
  {
    title: 'Writing Content',
    items: [
      { text: 'Blogging Guide', link: '/docs/blogging' },
      { text: 'Component Reference', link: '/docs/components' },
    ],
  },
]

const route = useRoute()
const collapsed = ref<Record<string, boolean>>({})

const toggle = (title: string) => {
  collapsed.value[title] = !collapsed.value[title]
}

const isActive = (link: string) => {
  return route.path === link || route.path === link + '.html'
}
</script>

<template>
  <nav class="docs-sidebar">
    <div class="sidebar-title">Documentation</div>
    <template v-for="group in nav" :key="group.title">
      <div class="sidebar-group">
        <div class="sidebar-group-header" @click="toggle(group.title)">
          <span class="sidebar-arrow">{{ collapsed[group.title] ? '▶' : '▼' }}</span>
          <span class="sidebar-group-name">{{ group.title }}</span>
        </div>
        <div v-if="!collapsed[group.title]" class="sidebar-items">
          <a
            v-for="item in group.items"
            :key="item.link"
            :href="item.link"
            class="sidebar-item"
            :class="{ active: isActive(item.link) }"
          >
            {{ item.text }}
          </a>
        </div>
      </div>
    </template>
  </nav>
</template>

<style scoped>
.docs-sidebar {
  width: 14rem;
  flex-shrink: 0;
  padding: 1rem 0;
  background: var(--background-card);
  border-right: 2px solid var(--pixel-gray);
  min-height: calc(100vh - 8rem);
  overflow-y: auto;
}

.sidebar-title {
  font-weight: bold;
  font-size: 1rem;
  padding: 0 1rem 0.75rem 1rem;
  color: var(--pixel-green-light);
  border-bottom: 1px solid var(--pixel-gray);
  margin-bottom: 0.5rem;
}

.sidebar-group-header {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  user-select: none;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar-group-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-arrow {
  font-size: 0.65rem;
  width: 0.75rem;
}

.sidebar-group-name {
  font-size: 0.9rem;
}

.sidebar-items {
  padding-left: 1.5rem;
}

.sidebar-item {
  display: block;
  padding: 0.3rem 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.sidebar-item:hover {
  color: rgba(255, 255, 255, 0.9);
}

.sidebar-item.active {
  color: var(--pixel-green-light);
  border-left-color: var(--pixel-green);
  background: rgba(60, 133, 39, 0.1);
}

@media screen and (max-width: 768px) {
  .docs-sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid var(--pixel-gray);
  }
}
</style>