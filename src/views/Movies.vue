<script setup>
import { onMounted, ref } from "vue";

import MovieCard from "@/components/movies-card/MovieCard.vue";
import Spinner from "@/components/Spinner.vue";
import { useMoviesStore } from "@/store/store.js";
import MoviesFilter from "@/components/functionality-components/movies-filter.vue";

const moviesStore = useMoviesStore();

onMounted(() => {
  moviesStore.topRatedMovies();
});
</script>

<template>
  <MoviesFilter :filterMovie="moviesStore.filterMovie" v-if="$route.name === 'Movies'" />
  <div class="movies-list" v-if="$route.name === 'Movies'">
    <MovieCard
      v-if="moviesStore.movie_type == 'popular'"
      :movies="moviesStore.popular_movies"
    />
    <MovieCard
      v-if="moviesStore.movie_type == 'upcoming'"
      :movies="moviesStore.upcoming_movies"
    />
    <MovieCard
      v-if="moviesStore.movie_type == 'now_playing'"
      :movies="moviesStore.now_playing"
    />
    <MovieCard
      v-if="moviesStore.movie_type == 'top_rated'"
      :movies="moviesStore.top_rated_movies"
    />
  </div>
  <router-view />
</template>

<style scoped>
.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  height: 100%;
}
</style>
