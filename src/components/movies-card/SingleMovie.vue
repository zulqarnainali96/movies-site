<script setup>
import { ref, computed, reactive } from 'vue';
import { useMoviesStore } from '@/store/store.js';
const moviesStore = useMoviesStore();

const singleMovie = computed(() => {
    let id = location.pathname.split('/').pop();
    return moviesStore.movies.find(movie => movie.id.toString() === id);
});
</script>

<template>
    <div class="single-movie" >
        <img :src="`https://image.tmdb.org/t/p/original${singleMovie?.poster_path}`" alt="Movie Poster" />
        <h2>{{ singleMovie?.title }}</h2>
        <p>{{ singleMovie?.overview }}</p>
        <p>Rating : {{ singleMovie?.vote_average }}</p>
    </div>
</template>

<style scoped>
.single-movie {
    background-size: cover;
    background-position: center;
    width: 100%;
}
h2 {
    font-size: 2rem;
    color : #fff;
}
</style>