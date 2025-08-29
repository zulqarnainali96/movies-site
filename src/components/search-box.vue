<script setup>
import { useMoviesStore } from "@/store/store";
import { useRouter } from "vue-router"

const router = useRouter()
const moviesStore = useMoviesStore();

function selectMovie(movie) {
  moviesStore.openSingleMovie(movie); // example: save selected movie in store
  moviesStore.search_movies = ""; // clear search
  moviesStore.searched_results = []; // clear dropdown
  router.push({
    params : {id :movie.id},
    name : "SingleMovie",
    path : "/movies"
  })
}
</script>

<template>
  <div class="container">
    <ul>
      <li
        v-for="movie in moviesStore.searched_results"
        :key="movie.id"
        class="search-item"
        @click="selectMovie(movie)"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          width="80"
          height="100"
        />
        <strong>{{ movie.title }}</strong> ({{
          movie.release_date?.slice(0, 4)
        }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  width: 50%;
  max-height: 250px;
  overflow-y: auto;
  transition: all 0.3s ease-in;
  background-color: rgb(255, 248, 248);
  position: absolute;
  box-shadow: 10px 4px 21px -11px gray;
  z-index: 3;
  top: 39px;
  right: 74px;
}

.search-item {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  cursor: pointer;
  transition: background 0.2s;
}
.search-item:hover {
  background: #f0f0f0;
}
</style>
