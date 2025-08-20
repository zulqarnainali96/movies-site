<script setup>

defineProps({
    movies: Array
});

</script>

<template>
    <router-link v-for="movie in movies" :key="movie.id" :to="`movies/${movie.id}`">
        <div :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})` }" class="movie-card">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <p>Rating : {{ movie.vote_average }}</p>
        </div>
    </router-link>
</template>

<style scoped>
.movie-card {
    border: 1px solid #eee;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 180px;
    height: 220px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    position: relative;
    cursor: pointer;

    background-size: cover;
    background-position: center;
}
.movie-card:hover {
    transform: scale(1.05);
}
p{
    position: absolute;
    font-size: 0.8em;
    font-weight: 800;
    bottom: 6px;
    right:6px;
}
.movie-title {
    font-size: 1rem;
    color: #eee;
    margin-bottom: 0.5rem;
}

.movie-description {
    font-size: 1rem;
    color: #666;
}
</style>