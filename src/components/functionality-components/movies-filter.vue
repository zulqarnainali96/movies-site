<script setup>
import { useMoviesStore } from "@/store/store";
import { watch } from "vue";
import SearchBox from "../search-box.vue";
const moviesStore = useMoviesStore();

console.log("Initial search:", moviesStore.search_movies);
watch(
  () => moviesStore.search_movies,
  (newValue) => {
    if (newValue.trim().length > 0) {
      moviesStore.searchMovies(); // call Pinia action
    } else {
      moviesStore.searched_results = [];
    }
  }
);
defineProps({
  filterMovie: Function,
});
console.log(moviesStore.search_movies);
</script>

<template>
  <div class="filter-container glass">
    <div class="filter">
      <button
        class="chip"
        :class="{ active: moviesStore.movie_type == 'popular' }"
        @click="filterMovie('popular')"
      >
        Popular
      </button>
      <button
        class="chip"
        :class="{ active: moviesStore.movie_type == 'upcoming' }"
        @click="filterMovie('upcoming')"
      >
        Upcoming
      </button>
      <button
        class="chip"
        :class="{ active: moviesStore.movie_type == 'now_playing' }"
        @click="filterMovie('now_playing')"
      >
        Now Playing
      </button>
      <button
        class="chip"
        :class="{ active: moviesStore.movie_type == 'top_rated' }"
        @click="filterMovie('top_rated')"
      >
        Top Rated
      </button>
    </div>
    <form class="search-movies" @submit.prevent>
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input
          v-model="moviesStore.search_movies"
          type="text"
          placeholder="Search movies..."
        />
      </div>
      <button class="search-btn" type="submit">Search</button>
      <SearchBox v-if="moviesStore.searched_results.length > 0" />
    </form>
  </div>
</template>

<style scoped>
.filter-container {
  --glass: rgba(255, 255, 255, 0.14);
  --glass-border: rgba(255, 255, 255, 0.22);

  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 16px;
}

.glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
}

.filter-container {
  color: #e2e8f0;
}

.active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6)) !important;
  color: #0f172a !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
}

.filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}
.chip:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.3);
}
.chip:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.45);
}
.search-movies {
  flex-grow: 1;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  position: relative;
  align-items: center;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 6px 12px;
  width: min(420px, 100%);
}

.search-icon {
  color: #cbd5e1;
  font-size: 0.9rem;
}

.search-wrap input[type="text"] {
  background: transparent;
  border: none;
  color: #f8fafc;
  width: 100%;
  padding: 6px 4px;
}

.search-wrap input[type="text"]::placeholder {
  color: #94a3b8;
}

.search-wrap input[type="text"]:focus-visible {
  outline: none;
}

.search-btn {
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.2s ease;
  font-weight: 600;
}
.search-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.35);
}

@media screen and (max-width: 900px) {
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }
  .search-movies {
    justify-content: flex-start;
  }
  .search-wrap {
    width: 100%;
  }
}
</style>
