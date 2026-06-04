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
    background: 'linear-gradient(135deg, #2a641c 0%, #171615 50%, #3c8527 100%)',
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
  width: 100%;
  min-height: 40rem;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  text-shadow: 2px 2px 2px black;
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
  padding-left: 10%;
  padding-right: 10%;
  background-color: rgba(0, 0, 0, 0.5);
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
  color: #fff;
  margin: 0;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--minecraft-green-light);
  margin: 0.5rem 0 0 0;
}

.hero-desc {
  font-size: 1.15rem;
  font-weight: bold;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

@media screen and (max-width: 623px) {
  .logo-area {
    width: 100%;
    min-width: unset;
  }
}
</style>
