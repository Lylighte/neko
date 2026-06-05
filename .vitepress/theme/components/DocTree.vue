<script lang="ts" setup>
import { ref } from 'vue'
import { docTree } from '../data/docs'
import type { DocumentNode } from '../data/docs'

defineProps<{
  selectedId?: string
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

const collapsed = ref<Record<string, boolean>>({})

const toggle = (id: string) => {
  collapsed.value[id] = !collapsed.value[id]
}

defineExpose({ docTree })
</script>

<template>
  <nav class="doc-tree">
    <div class="doc-tree-title">Documents</div>
    <template v-for="node in docTree" :key="node.id">
      <!-- Folder -->
      <div v-if="node.children" class="tree-folder">
        <div class="tree-folder-header" @click="toggle(node.id)">
          <span class="tree-arrow">{{ collapsed[node.id] ? '▶' : '▼' }}</span>
          <span class="tree-name">📁 {{ node.name }}</span>
        </div>
        <div v-if="!collapsed[node.id]" class="tree-children">
          <div
            v-for="child in node.children"
            :key="child.id"
            class="tree-item"
            :class="{ active: selectedId === child.id }"
            @click="emit('select', child.id)"
          >
            📄 {{ child.name }}
          </div>
        </div>
      </div>
      <!-- Root-level leaf -->
      <div
        v-else
        class="tree-item"
        :class="{ active: selectedId === node.id }"
        @click="emit('select', node.id)"
      >
        📄 {{ node.name }}
      </div>
    </template>
  </nav>
</template>

<style scoped>
.doc-tree {
  width: 14rem;
  flex-shrink: 0;
  padding: 1rem 0;
  background: var(--background-card);
  border-right: 2px solid var(--pixel-gray);
  min-height: calc(100vh - 8rem);
  overflow-y: auto;
}

.doc-tree-title {
  font-weight: bold;
  font-size: 1rem;
  padding: 0 1rem 0.75rem 1rem;
  color: var(--pixel-green-light);
  border-bottom: 1px solid var(--pixel-gray);
  margin-bottom: 0.5rem;
}

.tree-folder-header {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  user-select: none;
  color: rgba(255, 255, 255, 0.7);
}

.tree-folder-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tree-arrow {
  font-size: 0.65rem;
  width: 0.75rem;
}

.tree-name {
  font-size: 0.9rem;
}

.tree-item {
  padding: 0.4rem 1rem 0.4rem 2rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.6);
}

.tree-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
}

.tree-item.active {
  background: rgba(60, 133, 39, 0.2);
  color: var(--pixel-green-light);
}

.tree-children {
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .doc-tree {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid var(--pixel-gray);
  }
}
</style>
