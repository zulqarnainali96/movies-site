<script setup>
import HandleScrollBtn from "@/components/functionality-components/handle-scroll-btn.vue";
import HorizontalWrapperVue from "@/components/HorizontalWrapper.vue.vue";
import MovieCard from "@/components/movies-card/MovieCard.vue";
import { useMoviesStore } from "@/store/store.js";
import { onMounted, computed } from "vue";

const moviesStore = useMoviesStore();
onMounted(() => {
  moviesStore.popMovies();
});

const doubledMovies = computed(() => [...moviesStore.popular_movies, ...moviesStore.popular_movies]);
console.log(moviesStore.movies);
</script>

<template>
  <HandleScrollBtn>
    <MovieCard class="slide" :movies="doubledMovies" />
  </HandleScrollBtn>
  <br/>
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
