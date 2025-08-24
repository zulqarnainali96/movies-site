<script setup>
import PopularMovies from "./PopularMovies.vue";
import NowPlaying from "./NowPlaying.vue";
import UpComing from "./UpComing.vue";
</script>

<template>
  <h1>Welcome to the Movies Mania</h1>
  <h4>Now Playing</h4>
  <NowPlaying />
  <h4>Popular Movies</h4>
  <PopularMovies />
  <h4>Up Coming Movies</h4>
  <UpComing />
</template>

<style scoped>
.home {
  background-color: #f9f9f9;
  padding: 16px;
}
h1,
h3 {
  background-color: white;
  padding: 10px;
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
