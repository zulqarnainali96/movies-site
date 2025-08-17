<script setup>
    import { useRoute } from 'vue-router'
</script>

<template>
    <router-link to="/single-movie">
        <div class="movie-card">
            <h3 class="movie-title">Movie Title</h3>
            <p class="movie-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Rating : 6.7</p>
        </div>
    </router-link>
</template>

<style scoped>
.movie-card {
    border: 1px solid #eee;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 160px;
    height: 220px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
}

.movie-card:hover {
    transform: scale(1.05);
}

.movie-title {
    border-bottom: 1px solid red;
    font-size: 1.5rem;
    color : #333;
    margin-bottom: 0.5rem;
}

.movie-description {
    font-size: 1rem;
    color: #666;
}
</style>