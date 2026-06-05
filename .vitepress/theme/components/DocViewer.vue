<script lang="ts" setup>
import { ref, watch } from 'vue'
import { docDetails } from '../data/docs'
import CalendarIcon from './icons/CalendarIcon.vue'

const props = defineProps<{
  docId?: string
}>()

const doc = ref(props.docId ? docDetails[props.docId] : null)

watch(() => props.docId, (id) => {
  doc.value = id ? docDetails[id] ?? null : null
}, { immediate: true })
</script>

<template>
  <div class="doc-viewer">
    <div v-if="doc" class="doc-loaded">
      <h1 class="doc-title">{{ doc.name }}</h1>
      <div class="doc-meta">
        <span v-if="doc.contributors.length" class="doc-meta-item">
          👤 {{ doc.contributors.join(', ') }}
        </span>
        <span v-if="doc.updateTime" class="doc-meta-item">
          <CalendarIcon class="doc-meta-icon" />
          {{ doc.updateTime }}
        </span>
      </div>
      <div class="doc-body" v-html="renderMarkdown(doc.content)" />
    </div>
    <div v-else class="doc-empty">
      <p>Select a document from the sidebar to view its content.</p>
    </div>
  </div>
</template>

<script lang="ts">
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    .replace(/^(?!<[houlbqrp])(.+)$/gm, '<p>$1</p>')
    .replace(/<p>\s*<\/p>/g, '')
}
</script>

<style scoped>
.doc-viewer {
  flex: 1;
  min-width: 0;
  padding: 2rem;
}

.doc-title {
  font-size: 1.6rem;
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--pixel-gray);
}

.doc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.doc-meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.doc-meta-icon {
  width: 1rem;
  height: 1rem;
}

.doc-body {
  line-height: 1.8;
}

.doc-body :deep(h2) { margin-top: 2rem; font-size: 1.3rem; }
.doc-body :deep(h3) { font-size: 1.15rem; margin-top: 1.5rem; }
.doc-body :deep(p) { margin: 1rem 0; }
.doc-body :deep(ul), .doc-body :deep(ol) { padding-left: 1.5rem; }
.doc-body :deep(li) { margin: 0.5rem 0; }
.doc-body :deep(code) {
  background: var(--background-card);
  padding: 0.15rem 0.4rem;
  font-size: 0.9em;
}
.doc-body :deep(blockquote) {
  border-left: 4px solid var(--pixel-green);
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background: rgba(60, 133, 39, 0.1);
}
.doc-body :deep(strong) { color: var(--pixel-green-light); }

.doc-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.1rem;
}

@media screen and (max-width: 768px) {
  .doc-viewer {
    padding: 1.5rem 1rem;
  }
}
</style>
