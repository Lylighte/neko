<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Your Organization',
  },
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '/logo.svg',
  },
  background: {
    type: String,
    default: '',
  },
})

const bgStyle = (bg: string) => {
  if (bg) return { backgroundImage: `url(${bg})` }
  return {
    background: 'var(--pixel-hero-gradient)',
  }
}
</script>

<template>
  <div class="hero" :style="bgStyle($props.background)">
    <div class="hero-content">
      <div class="logo-area">
        <img v-if="$props.logo" :src="$props.logo" alt="logo" class="hero-logo" />
        <h1 class="hero-title">{{ $props.title }}</h1>
        <p v-if="$props.subtitle" class="hero-subtitle">{{ $props.subtitle }}</p>
        <p v-if="$props.description" class="hero-desc">{{ $props.description }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.hero {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 40rem;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  text-shadow: var(--pixel-shadow-text);
}

.hero-content {
  width: 100%;
  display: flex;
}

.logo-area {
  width: 50%;
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10%;
  padding-right: 10%;
  background-color: var(--pixel-hero-overlay);
  backdrop-filter: blur(2px);
  padding: 2rem;
  height: 100%;
  justify-content: center;
}

.hero-logo {
  height: 5rem;
  width: auto;
  user-select: none;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--pixel-hero-title-color);
  margin: 0;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--pixel-green-light);
  margin: 0.5rem 0 0 0;
}

.hero-desc {
  font-size: 1.15rem;
  font-weight: bold;
  margin-top: 1rem;
  color: var(--pixel-color-text);
}

@media screen and (max-width: 623px) {
  .logo-area {
    width: 100%;
    min-width: unset;
  }
}
</style>
