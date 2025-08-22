<script setup>
import MovieCard from "@/components/movies-card/MovieCard.vue";
import { useMoviesStore } from "@/store/store.js";
import { onMounted, reactive } from "vue";

const moviesStore = useMoviesStore();
onMounted(() => {
  moviesStore.popMovies();
});
</script>

<template>
  <div class="home">
    <h1>Welcome to the Movies Mania</h1>
    <h3 v-if="!moviesStore.popular_movies.length">No Data Found</h3>
  </div>
  <h4>Popular Movies</h4>
  <div class="movies-list">
    <MovieCard :movies="moviesStore.popular_movies" />
  </div>
</template>

<style scoped>
.home {
  background-color: #f9f9f9;
  padding: 16px;
}
.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  height: 100%;
}

h1,
h3 {
  text-align: center;
  color: rgba(18, 18, 53, 0.61);
}
h3 {
  color: #666;
  padding: 10px 0;
}
h4 {
  color: #666;
  padding: 10px 0;
}
</style>
