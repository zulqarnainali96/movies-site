<template>
  <div class="wrapper" :class="{ 'gradient-color': $route.name == 'SingleMovie' }">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1rem;
  height: 92.9vh;
  background-color: #eee;
}

.simple_color {
  background-color: #eee;
}

.gradient-color {
  background: linear-gradient(to left, black, gray);
}
</style>