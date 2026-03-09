<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useMoviesStore } from "@/store/store";

const moviesStore = useMoviesStore();

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
  class: {
    type: String,
    required: false,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
});

const openMenuFor = ref(null);
const pendingMovieId = ref(null);
const addedMovieIds = ref(new Set());

const toggleMenu = (movieId) => {
  openMenuFor.value = openMenuFor.value === movieId ? null : movieId;
};

const handleGlobalClick = (event) => {
  if (!event.target.closest(".menu-wrapper")) {
    openMenuFor.value = null;
  }
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

onMounted(() => {
  document.addEventListener("click", handleGlobalClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleGlobalClick);
});
</script>

<template>
  <div class="movie-item" v-for="movie in props.movies" :key="movie.id">
    <div class="menu-wrapper" v-if="props.showActions">
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

    <router-link
      :class="[props.class, 'movie-link']"
      :to="{ name: 'SingleMovie', params: { id: movie.id } }"
      @click="moviesStore.openSingleMovie(movie)"
    >
      <div
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }"
        class="movie-card"
      >
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p>Rating : {{ movie.vote_average }}</p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.movie-item {
  position: relative;
}

.movie-link {
  display: block;
  text-decoration: none;
}

.menu-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 12;
}

.menu-btn {
  width: 30px;
  height: 30px;
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
  top: 34px;
  right: 0;
  min-width: 160px;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  padding: 4px;
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

p {
  position: absolute;
  font-size: 0.8em;
  font-weight: 800;
  bottom: 6px;
  right: 6px;
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
