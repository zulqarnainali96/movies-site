<script setup>
import { ref } from 'vue';

import MoviesCard from '@/components/movies-card/MovieCard.vue';
import Spinner from '@/components/Spinner.vue'; 
import { useMoviesStore } from '@/store/store.js';

const moviesStore = useMoviesStore();
// const movies = ref([]);
fetch(`${import.meta.env.VITE_API_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`)
    .then(response => {
        isLoading.value = true;
        return response.json();
    })
  .then(data => {
    // movies.value = data.results;
    moviesStore.movies = data.results; // Store the movies in Pinia store
    isLoading.value = false;
  });

const isLoading = ref(false);

</script>

<template>
    <div class="movies-list">
        <Spinner v-if="isLoading" />
        <MoviesCard :movies="moviesStore.movies" v-else />
    </div>
</template>


<style scoped>
.movies-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
</style>