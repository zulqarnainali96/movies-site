<script setup>

import MovieCard from '@/components/movies-card/MovieCard.vue';
import { useMoviesStore } from '@/store/store.js'
import { onMounted } from 'vue';

const moviesData = useMoviesStore()
onMounted(() => {
  moviesData.watchedMovies()
})

console.log(moviesData.watched_movies)

</script>

<template>
  <div>
    <h1>Watched Movies</h1>
    <p>List of watched movies will be displayed here.</p>
    <MovieCard :movies="moviesData.watched_movies" />
  </div>
</template>
