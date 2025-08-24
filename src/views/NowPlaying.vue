<script setup>
import { computed, onMounted } from "vue";
import { useMoviesStore } from "@/store/store.js";
import MovieCard from "@/components/movies-card/MovieCard.vue";
import HandleScrollBtn from "@/components/functionality-components/handle-scroll-btn.vue";

const moviesStore = useMoviesStore();

onMounted(() => {
  moviesStore.nowPlaying();
});

const doubledMovies = computed(() => [
  ...moviesStore.now_playing,
  ...moviesStore.now_playing,
]);
</script>

<template>
    <HandleScrollBtn>
      <MovieCard class="slide" :movies="doubledMovies" />
    </HandleScrollBtn>
</template>

<style scoped>
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
</style>
