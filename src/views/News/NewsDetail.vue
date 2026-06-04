<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { staticNewsDetails } from '@/data/static'
import { uiText } from '@/data/i18n'
import type { NewsDetail, NewsSegment } from '@/data/types'

const newsId = useRoute().params.id as string
const newsDetail = ref<NewsDetail | null>(null)

/** Simple markdown-to-HTML converter for static content rendering */
function renderMarkdown(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Blockquote
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Paragraphs: wrap lines that aren't already HTML tags
    .replace(/^(?!<[houlb])(.+)$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
}

interface RenderedSegment extends NewsSegment {
  html?: string
}

const renderedContent = computed<RenderedSegment[]>(() => {
  if (!newsDetail.value) return []
  return newsDetail.value.content.map((segment) => {
    if (segment.type === 'markdown') {
      return { ...segment, html: renderMarkdown(segment.content) }
    }
    return segment
  })
})

onMounted(() => {
  newsDetail.value = staticNewsDetails[newsId] ?? null
})
</script>

<template>
  <div class="news-detail-container">
    <picture class="news-poster">
      <img class="news-poster-img" :src="newsDetail?.entity.image" alt="Detail image" />
      <text class="news-poster-category">
        {{ newsDetail?.category }}
      </text>
    </picture>
    <article class="news-detail-content">
      <aside class="news-detail-author-container">
        <div class="news-detail-author">
          <picture class="news-detail-author-avatar">
            <img
              class="news-detail-author-avatar-img"
              :src="newsDetail?.author.avatar"
              alt="Author avatar"
            />
          </picture>
          <div class="news-detail-author-info">
            <div class="news-detail-author-info-item">
              <div class="news-detail-author-title">{{ uiText.article.author }}</div>
              <div class="news-detail-author-text">{{ newsDetail?.author.username }}</div>
              <div
                class="news-detail-author-name-container"
                v-if="(newsDetail?.author.tags || []).length > 0"
              >
                <div
                  class="news-detail-author-tag"
                  v-for="tag in newsDetail?.author.tags"
                  :key="tag.text"
                  :style="{
                    backgroundColor: tag.tagColor,
                    color: tag.color,
                  }"
                >
                  {{ tag.text }}
                </div>
              </div>
            </div>
            <div
              class="news-detail-author-info-item"
              v-if="
                newsDetail?.entity.endDate === undefined || newsDetail?.entity.endDate.trim() === ''
              "
            >
              <div class="news-detail-author-title">{{ uiText.article.publishDate }}</div>
              <div class="news-detail-author-text">{{ newsDetail?.entity.date }}</div>
            </div>
            <div class="news-detail-author-info-item" v-else>
              <div class="news-detail-author-title">{{ uiText.article.dateRange }}</div>
              <div class="news-detail-author-text">
                {{ `${newsDetail?.entity.date} ~ ${newsDetail?.entity.endDate}` }}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main class="news-main-content">
        <div class="news-main-item-list">
          <div class="news-main-item" v-for="(item, index) in renderedContent" :key="index">
            <div
              v-if="item.type === 'markdown'"
              class="markdown-body"
              v-html="item.html"
            />
            <div v-if="item.type === 'pdf_file'" class="pdf-placeholder">
              <p>📄 PDF Document</p>
              <a :href="item.content" target="_blank" rel="noopener">Open PDF in new tab</a>
            </div>
          </div>
        </div>
      </main>
    </article>
  </div>
</template>

<style lang="css" scoped>
.news-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;

  background:
    linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
    radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('/blockbg/dirt.png');
}

.news-poster {
  position: relative;
  width: 100%;
  height: min-content;
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-poster-img {
  max-width: 85%;
  max-height: calc(75vh - 3rem);
  border-style: none;
  user-select: none;
  margin-bottom: 3rem;
}

.news-poster-category {
  font-size: 1.2rem;
  color: rgb(29, 30, 30);
  background-color: #fff;
  padding: 0 8px;
  position: absolute;
  bottom: 2.5rem;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 0px 0px;
  user-select: none;
}

.news-detail-content {
  width: 85%;
  display: flex;
  flex-wrap: nowrap;
}

.news-detail-author-container {
  width: 21rem;
}

.news-detail-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12.5rem;
  margin-bottom: 4rem;
}

.news-detail-author-avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;
  outline: 2px solid var(--minecraft-gray-light);
}

.news-detail-author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news-detail-author-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news-detail-author-avatar-img {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  object-position: center;
  vertical-align: middle;
  border-style: none;
  user-select: none;
}

.news-detail-author-title {
  user-select: none;
  color: #fff;
  font-size: 1.2rem;
  margin: 0.5rem 0;
  font-weight: 700;
}

.news-detail-author-text {
  user-select: none;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-wrap: nowrap;
}

.news-detail-author-name-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.news-detail-author-tag {
  user-select: none;
  font-size: 0.8rem;
  padding: 2px 4px;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  text-wrap: unwrap;
}

.news-main-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  margin-bottom: 4rem;
}

.news-main-item-list {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem 4rem;
  padding-bottom: 2rem;
}

.news-main-item {
  width: 100%;
  margin: 1rem 0;
}

.markdown-body {
  color: #e0e0e0;
  line-height: 1.8;
  font-size: 1.05rem;
}

.markdown-body :deep(h1) {
  font-size: 2rem;
  border-bottom: 2px solid var(--minecraft-gray-light);
  padding-bottom: 0.5rem;
  margin: 1.5rem 0 1rem;
}

.markdown-body :deep(h2) {
  font-size: 1.6rem;
  border-bottom: 1px solid var(--minecraft-gray-light);
  padding-bottom: 0.3rem;
  margin: 1.2rem 0 0.8rem;
}

.markdown-body :deep(h3) {
  font-size: 1.3rem;
  margin: 1rem 0 0.6rem;
}

.markdown-body :deep(p) {
  margin: 0.8rem 0;
}

.markdown-body :deep(ul) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.markdown-body :deep(li) {
  margin: 0.3rem 0;
}

.markdown-body :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--minecraft-gray-light);
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.05);
  font-style: italic;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--minecraft-gray-light);
  margin: 1.5rem 0;
}

.markdown-body :deep(strong) {
  color: #fff;
}

.pdf-placeholder {
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed var(--minecraft-gray-light);
  padding: 2rem;
  text-align: center;
  margin: 1rem 0;
}

.pdf-placeholder p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.pdf-placeholder a {
  color: #64b5f6;
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .news-detail-content {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .news-detail-author-container {
    display: flex;
    justify-content: center;
  }

  .news-detail-author {
    flex-direction: row;
    width: auto;
    gap: 1rem;
    margin-bottom: 0;
  }

  .news-main-item-list {
    padding: 1rem 2rem;
  }

  .news-main-item {
    padding: 0;
  }
}
</style>
