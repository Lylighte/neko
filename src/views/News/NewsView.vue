<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import NewsCard from './NewsCard.vue'
import NewsList from './NewsList.vue'
import { staticNewsBrief } from '@/data/static'
import type { NewsEntity } from '@/data/types'

const router = useRouter()

const newsId = ref('information')

const newsBrief = ref<NewsEntity[]>([])

const scrollToNews = () => {
  const newsList = document.getElementById('news-list')
  if (newsList) {
    const targetPosition = newsList.offsetTop - 16
    requestAnimationFrame(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    })
  }
}

const newTab = (id: string) => {
  const target = router.resolve(`/news/detail/${id}`)
  window.open(target.href, '_blank')
}

onMounted(() => {
  newsBrief.value = staticNewsBrief
})
</script>

<template>
  <div class="news-area">
    <div class="news-overview">
      <div class="overview-divide divide-1" style="height: 100%; width: 100%">
        <NewsCard
          class="vertical"
          style="animation: fade-in-down 0.5s ease-in-out 0.2s forwards"
          :news-brief="newsBrief[0] ?? {}"
          button-text="More Activities"
          @jump="router.push(`/activity`)"
        />
        <div class="overview-divide vertical">
          <NewsCard
            class="dynamic-vertical"
            style="animation: fade-in-down 0.5s ease-in-out 0.4s forwards"
            :news-brief="newsBrief[1] ?? {}"
            button-text="More News"
            @jump="((newsId = 'information'), scrollToNews())"
          />
          <div class="overview-divide divide-2">
            <NewsCard
              class="vertical"
              style="animation: fade-in-down 0.5s ease-in-out 0.6s forwards"
              :news-brief="newsBrief[2] ?? {}"
              button-text="Past Issues"
              @jump="((newsId = 'magazine'), scrollToNews())"
            />
            <NewsCard
              class="vertical"
              style="animation: fade-in-down 0.5s ease-in-out 0.8s forwards"
              :news-brief="newsBrief[3] ?? {}"
              button-text="More Notices"
              @jump="((newsId = 'notice'), scrollToNews())"
            />
          </div>
        </div>
      </div>
    </div>
    <NewsList
      v-model="newsId"
      id="news-list"
      style="opacity: 0; animation: fade-in-down 0.5s ease-in-out 1s forwards"
      @need-scroll="scrollToNews"
      @card-click="newTab"
    />
  </div>
</template>

<style lang="css" scoped>
.news-area {
  width: 100%;
  min-height: calc(100vh - 5rem);
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vertical {
  flex-direction: column;
}

.news-overview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
  margin-bottom: 2rem;
}

.overview-divide {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.news-list-panel {
  opacity: 0;
  width: calc(100% - 4rem);
  margin: 2rem;
  background:
    linear-gradient(to right, rgba(24, 24, 24, 0.4), rgba(24, 24, 24, 0.2), rgba(24, 24, 24, 0.4)),
    radial-gradient(rgba(24, 24, 24, 0.2), rgba(24, 24, 24, 0.8)), url('/blockbg/cobblestone.png');
  background-size:
    auto,
    auto,
    32px 32px;
  padding: 1.5rem;
}

.news-title-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.news-title {
  user-select: none;
  font-size: 1.5rem;
}

.news-total {
  font-size: 1.2rem;
  user-select: none;
  margin-left: 1rem;
  color: #aba09c;
}

.news-sort-by {
  font-size: 1.5rem;
  user-select: none;
  margin-left: auto;
}

.news-sort-by-option {
  font-size: 1.5rem;
  margin-left: 1rem;
  color: var(--minecraft-green-light);
}

.news-list-loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40rem;
}

.news-list-loading {
  width: 16rem;
  height: 16rem;
}

.news-list-container {
  width: 100%;
  display: grid;
  gap: 1.5rem;
  padding: 2rem 0;
  justify-content: center;
}

.news-list-item {
  opacity: 0;
  animation: fade-in-down 0.5s ease-in-out forwards;
  animation-delay: var(--delay);
}

@media screen and (max-width: 1920px) {
  .divide-1 {
    flex-direction: row;
  }

  .news-list-container {
    grid-template-columns: repeat(4, minmax(17.5rem, 21.75rem));
  }
}

@media screen and (max-width: 1312px) {
  .divide-1 {
    flex-direction: column;
  }

  .news-list-container {
    grid-template-columns: repeat(3, minmax(17.5rem, 21.75rem));
  }
}

@media screen and (max-width: 1008px) {
  .news-list-container {
    grid-template-columns: repeat(2, minmax(17.5rem, 21.75rem));
  }
}

@media screen and (max-width: 800px) {
  .news-list-container {
    grid-template-columns: repeat(1, minmax(17.5rem, 21.75rem));
  }
}

@media screen and (max-width: 623px) {
  .dynamic-vertical {
    flex-direction: column;
  }

  .divide-2 {
    flex-direction: column;
  }
}
</style>
