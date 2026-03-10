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
  width: min(520px, 100%);
  max-height: 250px;
  overflow-y: auto;
  transition: all 0.3s ease-in;
  position: absolute;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 28px rgba(2, 6, 23, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 999;
  top: calc(100% + 8px);
  right: 0;
  border-radius: 10px;
}

.container ul {
  list-style: none;
  padding: 6px;
}

.search-item {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 10px;
  color: #e2e8f0;
}
.search-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.search-item img {
  border-radius: 8px;
  object-fit: cover;
}
</style>
