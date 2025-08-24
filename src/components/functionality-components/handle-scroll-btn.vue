<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const slideWidth = 300 + 20; // card width + margin
const scrollContainer = ref(null);
const autoScrollInterval = ref(null);

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -slideWidth, behavior: "smooth" });
}
function scrollRight() {
  scrollContainer.value?.scrollBy({ left: slideWidth, behavior: "smooth" });
}

function handleWheel(e) {
  scrollContainer.value?.scrollBy({
    left: e.deltaY < 0 ? -100 : 100,
    behavior: "smooth",
  });
}

function startAutoScroll() {
  if (autoScrollInterval.value) return;

  autoScrollInterval.value = setInterval(() => {
    if (!scrollContainer.value) return;

    scrollContainer.value.scrollBy({ left: slideWidth, behavior: "smooth" });

    if (
      scrollContainer.value.scrollLeft >=
      scrollContainer.value.scrollWidth / 2
    ) {
      scrollContainer.value.scrollLeft = 0;
    }
  }, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval.value);
  autoScrollInterval.value = null;
}

// ✅ Lifecycle
onMounted(() => startAutoScroll());
onBeforeUnmount(() => stopAutoScroll());
</script>

<template>
  <div
    class="slider-wrapper"
    @mouseenter="stopAutoScroll"
    @mouseleave="startAutoScroll"
  >
    <!-- Left Arrow -->
    <button class="arrow-btn left" @click="scrollLeft">
      <span>‹</span>
    </button>

    <!-- Scrollable Container -->
    <div
      class="scroll-container"
      ref="scrollContainer"
      @wheel.prevent="handleWheel"
    >
      <slot></slot>
    </div>

    <!-- Right Arrow -->
    <button class="arrow-btn right" @click="scrollRight">
      <span>›</span>
    </button>
  </div>
</template>

<style scoped>
.scroll-container {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}

.slide {
  flex: 0 0 auto;
  width: 250px;
  height: 150px;
  margin-right: 16px;
  border-radius: 12px;
  background: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50%;
}
.arrow-btn.left {
  left: 10px;
}
.arrow-btn.right {
  right: 10px;
}
.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>
