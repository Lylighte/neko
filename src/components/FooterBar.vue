<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import QQIcon from './icons/QQIcon.vue'
// import BilibiliIcon from './icons/BilibiliIcon.vue'
// import GithubIcon from './icons/GithubIcon.vue'
import { GetSlogan } from '@/api/slogan'
import { RouterLink } from 'vue-router'

const slogan = ref('')

onMounted(async () => {
  slogan.value = await GetSlogan()
})
</script>

<template>
  <div class="footer-area">
    <div class="footer-description">
      <img src="/logo-320px.png" alt="logo" style="width: 5rem; user-select: none" />
      <p style="user-select: none">中国科学技术大学 USTCraft 像素艺术社</p>
      <text style="margin-bottom: 0.5rem">{{ slogan }}</text>
      <span id="copyright" style="user-select: none">
        © 2026 USTCraft. |
        <a style="color: rgb(128, 128, 128)" href="https://beian.miit.gov.cn/"
          >豫ICP备2025158752号</a
        >
      </span>
      <span id="powered-by" style="user-select: none;">
        <a class="link-item" href="https://github.com/EntropyGenerator/neco">
          Powered by Neco
        </a>
        | Thanks to INT15 &amp; Kingcq
      </span>
      <span id="declaration" style="user-select: none">
        NOT AN OFFICIAL MINECRAFT ORGANIZATION <br />
        NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
      </span>

      <RouterLink id="management" to="/management/user">后台</RouterLink>
    </div>

    <div class="footer-links">
      <div class="link-block">
        <p>社区</p>
        <a class="link-item" href="https://qm.qq.com/q/GcTr6vaKEQ">
          <!-- <QQIcon class="link-icon" /> -->
          MC交流群
        </a>
        <a class="link-item" href="https://space.bilibili.com/3546788017474530">
          <!-- <BilibiliIcon class="link-icon" /> -->
          bilibili
        </a>
        <p>友链</p>
        <a class="link-item" href="https://www.nmo.net.cn">
          NMO
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

.footer-description #powered-by {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: gray;
}

.footer-description #powered-by a {
  display: inline;
  color: gray;
  margin-bottom: 0;
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

.link-block + .link-block {
  margin-left: 1.25rem;
  padding-left: 1.25rem;
  border-left: 2px solid #606266;
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
