<script lang="ts" setup>
import { ref } from 'vue'
import DocTree from './DocTree.vue'
import DocViewer from './DocViewer.vue'

const selectedId = ref('getting-started')
</script>

<template>
  <div class="docs-browser">
    <DocTree :selected-id="selectedId" @select="selectedId = $event" />
    <DocViewer :doc-id="selectedId" class="docs-viewer" />
  </div>
</template>

<style scoped>
.docs-browser {
  display: flex;
  min-height: calc(100vh - 5rem);
  padding-top: 5rem;
}

.docs-viewer {
  flex: 1;
}

@media screen and (max-width: 768px) {
  .docs-browser {
    flex-direction: column;
  }
}
</style>
