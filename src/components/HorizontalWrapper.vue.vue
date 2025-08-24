<template>
  <div class="horizontal-wrapper">
    <slot></slot>
  </div>
</template>


<style scoped>
.horizontal-wrapper {
  display: flex;
  overflow-x: auto;
  padding: 12px 0;
}
.horizontal-wrapper::-webkit-scrollbar {
  height: 8px;
  visibility: hidden;
}
</style>
