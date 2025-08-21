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
    <div class="single-movie">
        <div class="main">
            <div>
                <h2>{{ singleMovie?.title }}</h2>
                <p class="overview"><span>Overview</span> : {{ singleMovie?.overview }}</p>
                <br />
                <p>Rating : {{ singleMovie?.vote_average }}</p>
            </div>
            <div>

                <img loading="lazy" :src="`https://image.tmdb.org/t/p/original${singleMovie?.backdrop_path}`"
                    alt="Movie Poster" />
            </div>
        </div>

    </div>
</template>

<style scoped>
.single-movie {
    width: 100%;
    height: 100%;
    color: #fff;
}

.main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
}

.overview {
    padding: 0.8rem;
    line-height: 1.7;
}

.overview span {
    font-size: 1.4rem;
}

img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 12px;
    /* aspect-ratio: 3; */
}

h2 {
    font-size: 2.4rem;
}
</style>