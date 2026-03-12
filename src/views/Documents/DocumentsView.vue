<script lang="ts" setup>
import { GetDocumentDetail } from '@/api/documents'
import type { NewsSegment } from '@/api/newslist'
import TreeViewer from '@/components/documents/TreeViewer.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import PdfViewer from '@/components/PdfViewer.vue'
import MinecraftButton from '@/components/utils/MinecraftButton.vue'
import { startBackgroundCarousel } from '@/utils/backgroundCarousel'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

const soundOn = () => {
  const audio = new Audio('/button.click.ogg')
  audio.play()
  audio.volume = 0.3
}

const mountSounds = () => {
  // mount audios
  const buttons = document.querySelectorAll(
    '.md-editor-copy-button, .md-editor-collapse-tips, .md-editor-code-flag',
  )
  buttons.forEach((button) => {
    button.addEventListener('click', soundOn)
  })
}

const scrollTo = (id: string) => {
  setTimeout(() => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

const toast = useToast()

const MOBILE_BREAKPOINT = 768
const NARROW_DESKTOP_BREAKPOINT = 1200
const MIN_TREE_WIDTH = 128
const MAX_TREE_WIDTH = 1280
const MIN_EDITOR_WIDTH_WIDE = 640
const MIN_EDITOR_WIDTH_NARROW = 420

const resizeContainerWidth = ref(270)
const resizeContainerRef = ref<HTMLDivElement | null>(null)

let isResizing = false
let startX = 0
let startWidth = 0

const getContainerHorizontalPadding = () => {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    return 32
  }
  if (window.innerWidth < NARROW_DESKTOP_BREAKPOINT) {
    return 48
  }
  return 128
}

const getMinEditorWidth = () => {
  if (window.innerWidth < NARROW_DESKTOP_BREAKPOINT) {
    return MIN_EDITOR_WIDTH_NARROW
  }
  return MIN_EDITOR_WIDTH_WIDE
}

const clampTreeWidth = (rawWidth: number) => {
  if (isMobile.value) {
    return rawWidth
  }

  const maxAllowedByViewport = window.innerWidth - getContainerHorizontalPadding() - getMinEditorWidth()
  const upperBound = Math.max(MIN_TREE_WIDTH, Math.min(MAX_TREE_WIDTH, maxAllowedByViewport))

  if (rawWidth < MIN_TREE_WIDTH) {
    return MIN_TREE_WIDTH
  }
  if (rawWidth > upperBound) {
    return upperBound
  }
  return rawWidth
}

const startResize = (event: MouseEvent) => {
  if (!resizeContainerRef.value) {
    return
  }
  isResizing = true

  startX = event.clientX
  startWidth = resizeContainerRef.value.offsetWidth

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isResizing) {
    return
  }
  const deltaX = event.clientX - startX
  const newWidth = startWidth + deltaX
  resizeContainerWidth.value = clampTreeWidth(newWidth)
}

const stopResize = () => {
  if (!isResizing) {
    return
  }
  isResizing = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})

const selectedDocumentId = ref('')

watch(selectedDocumentId, async (newVal) => {
  const result = await GetDocumentDetail(newVal)
  if (result) {
    documentInstance.private = result.private
    documentInstance.name = result.name
    documentInstance.content = result.content || []
    documentInstance.contributors = result.contributors || []
    documentInstance.updateTime = result.updateTime || ''
  } else {
    toast.error('获取文档详情失败！')
  }
})

const documentInstance = reactive({
  private: false,
  name: '',
  content: [] as NewsSegment[],
  contributors: [] as string[],
  updateTime: '',
})

const isMobile = ref(false)

const onResize = () => {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    isMobile.value = true
  } else {
    isMobile.value = false
    resizeContainerWidth.value = clampTreeWidth(resizeContainerWidth.value)
  }
}

let stopBackgroundCarousel: (() => void) | null = null

onMounted(() => {
  // 背景轮播
  void startBackgroundCarousel('documents-bg')
    .then((stop) => {
      stopBackgroundCarousel = stop
    })
    .catch(() => {
      toast.warning('背景轮播加载失败，将保持静态背景。')
    })

  if (window.innerWidth < MOBILE_BREAKPOINT) {
    isMobile.value = true
  } else {
    resizeContainerWidth.value = clampTreeWidth(resizeContainerWidth.value)
  }
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  stopBackgroundCarousel?.()
  window.removeEventListener('resize', onResize)
})

const scrollElement = document.documentElement
</script>

<template>
  <div id="documents-bg"></div>
  <div class="navbar-cover"></div>
  <div
    class="documents-editor"
    :style="{
      flexDirection: isMobile ? `column` : `row`,
    }"
  >
    <div class="documents-editor-container">
      <div
        ref="resizeContainerRef"
        class="resizer-container"
        :style="{
          width: isMobile ? `100%` : `${resizeContainerWidth}px`,
          minWidth: `128px`,
          maxWidth: `1280px`,
        }"
      >
        <TreeViewer class="tree-viewer" v-model="selectedDocumentId" :disable-edit="true" />
        <div class="resizer" @mousedown.prevent="startResize" v-if="!isMobile"></div>
      </div>
      <div
        class="editor-container"
        :style="{
          width: isMobile ? '100%' : 'auto',
        }"
      >
        <div class="document-main-content" id="md-editor">
          <div class="document-main-item-list">
            <div class="document-title" v-if="selectedDocumentId.trim() !== ''">
              {{ documentInstance.name }}
            </div>
            <div class="document-desc-item" v-if="selectedDocumentId.trim() !== ''">
              <UserIcon class="document-desc-icon" />
              <span>{{ documentInstance.contributors.join(', ') }}</span>
            </div>
            <div class="document-desc-item" v-if="selectedDocumentId.trim() !== ''">
              <CalendarIcon class="document-desc-icon" />
              <span>{{ documentInstance.updateTime }}</span>
            </div>
            <div
              class="document-main-item"
              v-for="(item, index) in documentInstance.content"
              :key="index"
            >
              <div class="document-preview">
                <MdPreview
                  :id="`md-preview-${index}`"
                  theme="dark"
                  language="zh-CN"
                  preview-theme="minecraft"
                  :model-value="item.content"
                  @on-remount="mountSounds"
                  v-if="item.type === 'markdown'"
                />
                <MdCatalog
                  class="document-preview-catalog"
                  :editor-id="`md-preview-${index}`"
                  :scroll-element="scrollElement"
                />
              </div>
              <MinecraftButton
                v-if="item.type === 'pdf_file'"
                class="pdf-read-btn"
                @click="scrollTo(`pdf-renderer-${index}`)"
                >↓ 最佳阅读位置</MinecraftButton
              >
              <PdfViewer
                :id="`pdf-renderer-${index}`"
                v-if="item.type === 'pdf_file'"
                class="pdf-renderer mc-border"
                :pdf-url="item.content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#documents-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;

  background-size: cover;
  background-position: center;
  transition: opacity 0.4s ease-in-out;
}

.navbar-cover {
  position: absolute;
  top: 0;
  left: 0;
  height: 5rem;
  width: 100vw;
  z-index: -1;

  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.documents-editor {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  padding-top: 5rem;
}

.documents-editor-container {
  display: flex;
  width: 100vw;
  min-height: calc(100vh - 5rem);
  padding: 0 4rem;
  padding-bottom: 2rem;

  background-color: rgba(0, 0, 0, 0.7);
}

.tree-viewer {
  flex: 1;
  width: 100%;
  overflow: auto;
  padding: 0.8rem;
  padding-left: 4px;
  padding-right: 4px;
  border: 4px solid #222222;
  box-shadow:
    inset -4px -4px 0px 0px #3a3a3a,
    inset 4px 4px 0px 0px #6b6b6b;
  background-color: #111111;
}

.resizer-container {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
}

.resizer {
  position: absolute;
  width: 8px;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: ew-resize;
}

.back-btn {
  height: 2rem;
}

.pdf-options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.pdf-options-label {
  font-size: 1.2rem;
  user-select: none;
}

.pdf-options-input-container {
  display: flex;
  gap: 1rem;
}

.pdf-options-input {
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;
  margin: auto;
}

.pdf-options-button {
  width: 6rem;
  font-size: 1.2rem;
}

.upload-button {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #fff;
  color: white;
  cursor: pointer;
  padding: 1.2rem;
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.2s ease-in-out;
}

.upload-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.editor-container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  min-width: 0;
}

.editor {
  height: calc(100vh - 2rem - 4px);
}

.editor-btn-group {
  width: 100%;
  display: flex;
  align-items: center;
}

.editor-btn {
  width: fit-content;
  height: 2rem;
}

.editor-btn.last {
  width: 6rem;
  margin-left: auto;
}

.document-main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.document-main-item-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 1rem 4rem;
  padding-bottom: 2rem;
  min-height: 100vh;

  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
  border: 4px solid #222222;
  box-shadow:
    inset -4px -4px 0px 0px #3a3a3a,
    inset 4px 4px 0px 0px #6b6b6b;
  min-width: 0;
}

.document-main-item {
  width: 100%;
  margin: 1rem 0;
  min-width: 0;
}

.document-title {
  font-size: 1.5rem;
}

.document-desc-item {
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
  gap: 0.8rem;
}

.document-desc-icon {
  width: 1rem;
  height: 1rem;
}

.document-preview-catalog {
  flex: 0 0 20%;
  min-width: 220px;
  max-width: 320px;
  height: min-content;
  overflow: hidden;

  position: sticky;
  top: 5rem;
  left: 0;
}

.document-preview {
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 1rem;
  min-width: 0;
  width: 100%;
}

.document-preview > :first-child {
  flex: 1;
  min-width: 0;
  max-width: 100%;
}

.document-preview :deep(.md-editor-preview-wrapper),
.document-preview :deep(.md-editor-preview),
.document-preview :deep(.md-editor) {
  min-width: 0;
  max-width: 100%;
}

.document-preview :deep(.md-editor-code),
.document-preview :deep(.md-editor-code pre) {
  max-width: 100%;
}

.document-preview :deep(.md-editor-code pre) {
  overflow-x: auto;
}

.document-preview :deep(.md-editor-code pre code) {
  width: max-content;
  min-width: 100%;
}

.document-preview :deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
}

.document-preview :deep(img),
.document-preview :deep(video),
.document-preview :deep(canvas),
.document-preview :deep(iframe) {
  max-width: 100%;
}

.document-preview :deep(.md-editor-catalog) {
  min-width: 0;
  max-width: 100%;
}

.document-preview :deep(.md-editor-catalog-link span),
.document-preview :deep(.md-editor-catalog-active span) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.document-preview :deep(.md-editor-catalog-link),
.document-preview :deep(.md-editor-catalog-active) {
  min-width: 0;
}

@media screen and (max-width: 1200px) {
  .documents-editor-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .document-main-item-list {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .document-preview {
    flex-direction: column-reverse;
    align-items: stretch;
    justify-content: center;
  }

  .document-preview-catalog {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    border-bottom: 2px solid #909399;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    top: 0;
    position: relative;
  }
}

@media screen and (max-width: 768px) {
  .document-preview {
    flex-direction: column-reverse;
    align-items: stretch;
    justify-content: center;
  }

  .documents-editor-container {
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .resizer-container {
    position: relative;
    height: 50vh;
  }

  .document-preview-catalog {
    width: 100%;
    border-bottom: 2px solid #909399;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    top: 0;

    position: relative;
  }
}
</style>

<style lang="css">
.md-editor-catalog-container {
  padding-left: 2rem;
  border-left: 2px solid #909399;
}

.md-editor-catalog-indicator {
  transform: translateX(2rem);
}

@media screen and (max-width: 768px) {
  .md-editor-catalog-container {
    padding-left: 2rem;
    border-left: none;
  }

  .md-editor-catalog-indicator {
    transform: translateX(2rem);
  }
}
</style>
