<script lang="ts" setup>
import { computed } from 'vue'
import QQIcon from './icons/QQIcon.vue'
import BilibiliIcon from './icons/BilibiliIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'
import { siteConfig } from '@/data/config'

const iconMap: Record<string, unknown> = {
  github: GithubIcon,
  bilibili: BilibiliIcon,
  qq: QQIcon,
}

const socialLinks = computed(() =>
  siteConfig.socialLinks.map((link) => ({
    ...link,
    iconComponent: iconMap[link.icon] ?? null,
  })),
)
</script>

<template>
  <div class="footer-area">
    <div class="footer-description">
      <img :src="siteConfig.logo" alt="logo" style="width: 5rem; user-select: none" />
      <p style="user-select: none">{{ siteConfig.name }}</p>
      <text style="margin-bottom: 0.5rem">{{ siteConfig.description }}</text>
      <span id="copyright" style="user-select: none">
        {{ siteConfig.copyright }}
        <template v-if="siteConfig.icp">
          | <a style="color: rgb(128, 128, 128)" href="https://beian.miit.gov.cn/">{{ siteConfig.icp }}</a>
        </template>
      </span>
      <span id="declaration" style="user-select: none">
        {{ siteConfig.declaration }}
      </span>
    </div>

    <div class="footer-links">
      <div class="link-block">
        <p>Links</p>
        <a
          class="link-item"
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
        >
          <component :is="link.iconComponent" class="link-icon" v-if="link.iconComponent" />
          {{ link.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.footer-area {
  padding: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: var(--background-color);
  border-top: 1px solid #909399;
}

.footer-description {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 30rem;
}

.footer-description p {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.footer-description #management {
  user-select: none;
  width: fit-content;
  font-size: 0.8rem;
  color: gray;
}

.footer-description #copyright {
  font-size: 0.8rem;
  color: gray;
}

.footer-description #declaration {
  font-size: 0.6rem;
  color: gray;
}

.footer-links {
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.footer-links p {
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.footer-links a {
  margin-bottom: 0.2rem;
}

.link-block {
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.link-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
}

.link-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 4px;
}
</style>
