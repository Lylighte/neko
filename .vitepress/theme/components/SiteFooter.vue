<script lang="ts" setup>
import { useData } from 'vitepress'
import BilibiliIcon from './icons/BilibiliIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'
import QQIcon from './icons/QQIcon.vue'

const { theme } = useData()

const iconMap: Record<string, unknown> = {
  github: GithubIcon,
  bilibili: BilibiliIcon,
  qq: QQIcon,
}
</script>

<template>
  <div class="footer-area">
    <div class="footer-description">
      <p class="footer-name">{{ theme.siteTitle || 'Your Organization' }}</p>
      <span>{{ theme.siteDescription || '' }}</span>
      <span id="copyright">
        © {{ new Date().getFullYear() }} - All rights reserved
      </span>
      <span id="declaration">
        NOT AN OFFICIAL MINECRAFT ORGANIZATION. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR
        MICROSOFT.
      </span>
    </div>

    <div class="footer-links">
      <div class="link-block" v-if="theme.socialLinks && theme.socialLinks.length">
        <p>Links</p>
        <a
          class="link-item"
          v-for="link in theme.socialLinks"
          :key="link.link"
          :href="link.link"
          target="_blank"
          rel="noopener"
        >
          <component :is="iconMap[link.icon]" class="link-icon" v-if="link.icon && iconMap[link.icon]" />
          {{ link.text || link.link }}
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
  margin-top: 3rem;
}

.footer-description {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 30rem;
}

.footer-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.footer-description span {
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}

#copyright {
  font-size: 0.9rem;
  color: rgb(128, 128, 128);
}

#declaration {
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.5rem;
}

.footer-links {
  margin-left: auto;
}

.link-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-block p {
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.link-item:hover {
  color: var(--pixel-green-light);
}

.link-icon {
  width: 1.2rem;
  height: 1.2rem;
}

@media screen and (max-width: 600px) {
  .footer-links {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
