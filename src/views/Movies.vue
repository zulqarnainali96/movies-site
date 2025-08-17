<script setup>
import MoviesCard from '@/components/movies-card/MovieCard.vue';
</script>

<template>
    <div class="movies-list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
    </div>
</template>


<style scoped>

.movies-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

</style>