<script setup>
import { useMoviesStore } from "@/store/store";

defineProps({
  filterMovie: Function,
});
const moviesStore = useMoviesStore();
</script>

<template>
  <div class="filter-container">
    <div class="filter">
      <button
        :class="{ active: moviesStore.movie_type == 'popular' }"
        @click="filterMovie('popular')"
      >
        Popular Movies
      </button>
      <button
        :class="{ active: moviesStore.movie_type == 'upcoming' }"
        @click="filterMovie('upcoming')"
      >
        Up Coming Movies
      </button>
      <button
        :class="{ active: moviesStore.movie_type == 'now_playing' }"
        @click="filterMovie('now_playing')"
      >
        Now Playing
      </button>
      <button
        :class="{ active: moviesStore.movie_type == 'top_rated' }"
        @click="filterMovie('top_rated')"
      >
        Top Rated Movies
      </button>
    </div>
    <div class="search-movies">
      <input type="text" placeholder="Search movies..." />
      <input type="submit" value="Search" />
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding-inline: 12px;
  padding-block: 12px;
}

.active {
  background-color: #0056b3 !important;
  /* background-color: red !important; */
}

.filter {
  display: flex;
  gap: 8px;
  justify-content: space-around;
  align-items: center;
}

.filter button {
  padding: 4px 8px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.filter button:hover {
  background-color: #0056b3;
}
/* .filter button:active {
  background-color: #004494;
} */
.filter button:focus {
  background-color: #004494;
}
.search-movies {
  flex-grow: 1;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.search-movies input[type="text"] {
  padding: 8px 12px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-movies input[type="submit"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.search-movies input[type="submit"]:hover {
  background-color: #0056b3;
}
.search-movies input[type="submit"]:active {
  background-color: #004494;
}
.search-movies input[type="text"]:focus-visible {
  outline: none;
}
</style>
