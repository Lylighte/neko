<script lang="ts" setup>
import Intro from './IntroView.vue'
</script>

<template>
  <div>
    <div class="main-area">
      <div class="logo-area">
        <div class="logo-content">
          <div>
            <img src="/logo-320px.png" alt="LOGO" style="user-select: none; height: 5rem" />
          </div>
          <p class="text-title">USTCraft 像素艺术社</p>
          <span class="intro-text text-body">
            从 Minecraft 等优秀数字作品出发，逐步拓展至更广阔的像素艺术领域，同时与其他领域交叉发展。
          </span>
        </div>
      </div>
    </div>
    <Intro />
  </div>
</template>

<style lang="css" scoped>
.main-area {
  width: 100%;
  height: 40rem;
  display: flex;
  background-image: url('/background/ustcmc.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;

  text-shadow: 2px 2px 2px black;
}

.main-area::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;
  /* background: linear-gradient(to bottom, transparent 0%, var(--background-color) 100%); */
}

.logo-area {
  width: 50%;
  height: 100%;
  min-width: 25rem;
  display: flex;
  align-items: center;
}

.logo-content {
  display: flex;
  flex-direction: column;
  /* border-left: 4px solid #fff; */
  padding-left: 10%;
  max-width: 30rem;
  padding-right: 10%;
  /* animation: fade-in-right 1s ease-out forwards; */
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  padding: 1rem;
  height: 100%;
  justify-content: center;
}

.logo-content p {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-top: 0;
  margin-bottom: 0;
  text-wrap: nowrap;
}

.intro-text {
  font-size: 1.15rem;
  font-weight: bold;
}

@media screen and (max-width: 623px) {
  .logo-content p {
    text-wrap: wrap;
  }
}
</style>
