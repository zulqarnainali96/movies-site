<script setup>
import { useMoviesStore } from "@/store/store";
import { useRouter } from "vue-router"
import { ref } from "vue";

const router = useRouter()
const moviesStore = useMoviesStore();
const openMenuFor = ref(null);
const pendingMovieId = ref(null);
const addedMovieIds = ref(new Set());

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

const toggleMenu = (movieId) => {
  openMenuFor.value = openMenuFor.value === movieId ? null : movieId;
};

const addToWatchlist = async (movieId) => {
  if (pendingMovieId.value === movieId) return;
  pendingMovieId.value = movieId;
  try {
    const response = await moviesStore.addMovieToWatchlist(movieId);
    if (response?.success || response?.status_code === 1 || response?.status_code === 12) {
      addedMovieIds.value = new Set(addedMovieIds.value).add(movieId);
    }
  } finally {
    pendingMovieId.value = null;
    openMenuFor.value = null;
  }
};

const isAdded = (movieId) => addedMovieIds.value.has(movieId);
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
        <div class="search-meta">
          <strong>{{ movie.title }}</strong>
          <span class="search-year">({{ movie.release_date?.slice(0, 4) || "TBD" }})</span>
        </div>
        <div class="menu-wrapper" @click.stop>
          <button class="menu-btn" type="button" @click.stop.prevent="toggleMenu(movie.id)">
            &#8942;
          </button>
          <div v-if="openMenuFor === movie.id" class="menu-dropdown">
            <button
              class="menu-item"
              type="button"
              :disabled="pendingMovieId === movie.id || isAdded(movie.id)"
              @click.stop.prevent="addToWatchlist(movie.id)"
            >
              {{ isAdded(movie.id) ? "Added to Watchlist" : "Add to Watchlist" }}
            </button>
          </div>
        </div>
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

.search-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.search-year {
  color: #94a3b8;
  font-size: 0.85rem;
}

.menu-wrapper {
  position: relative;
  margin-left: auto;
}

.menu-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.8);
  color: #fff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.menu-dropdown {
  position: absolute;
  top: 30px;
  right: 0;
  min-width: 160px;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  padding: 4px;
  z-index: 1000;
}

.menu-item {
  width: 100%;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #e2e8f0;
  text-align: left;
  padding: 8px;
  font-size: 0.85rem;
  cursor: pointer;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.12);
}

.menu-item:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>
