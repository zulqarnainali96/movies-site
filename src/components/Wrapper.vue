<template>
  <div
    class="wrapper"
    :class="{ 'gradient-color': $route.name == 'SingleMovie' }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1rem;
  height: 92.7vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  background-color: #eee;
}

.simple_color {
  background-color: #eee;
}

.gradient-color {
  background: linear-gradient(to left, black, gray);
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 0.5rem;
    height: none;
  }
}
</style>
