<script setup>
import { useMoviesStore } from "@/store/store.js";
import MovieCard from "@/components/movies-card/MovieCard.vue";

const moviesData = useMoviesStore();
const watchedMovies = moviesData.popularMovies();
</script>

<template>
  <div>
    <h1>Watched Movies</h1>
    <p>List of watched movies will be displayed here.</p>
    <MovieCard :movies="watchedMovies" />
  </div>
</template>
