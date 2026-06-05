<template>
  <a
    class="link-card"
    :href="link.url"
    target="_blank"
    rel="noopener"
    :style="{ backgroundImage: link.image ? `url(${link.image})` : undefined }"
  >
    <div class="link-content">
      <p>{{ link.name }}</p>
      <span v-if="link.description">{{ link.description }}</span>
    </div>
  </a>
</template>

<script lang="ts" setup>
defineProps<{
  link: {
    name: string
    url: string
    image?: string
    description?: string
  }
}>()
</script>

<style scoped>
.link-card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 15rem;
  height: 15rem;
  border-top: 2px solid var(--pixel-green-light);
  border-left: 2px solid var(--pixel-green);
  border-right: 2px solid var(--pixel-green);
  border-bottom: 2px solid var(--pixel-green-dark);
  background-position: center;
  background-size: cover;
  background-color: var(--background-card);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
}

.link-content {
  margin-top: auto;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  user-select: none;
}

.link-content p {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.link-content span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
