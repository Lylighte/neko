<template>
  <div class="center">
    <img class="not-found-image" src="/404.png" alt="404 Not Found" />
  </div>
</template>

<style lang="css" scoped>
.center {
  min-height: 100vh;
  width: 100vw;
  padding: 6rem 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.04), transparent 45%),
    linear-gradient(180deg, var(--background-color), var(--background-page));
}

.not-found-image {
  width: min(30rem, 92vw);
  height: auto;
  user-select: none;
}
</style>
