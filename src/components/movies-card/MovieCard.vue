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
      <article class="movie-card">
        <div class="poster">
          <img
            v-if="movie.poster_path"
            loading="lazy"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div v-else class="poster-fallback">Poster unavailable</div>
          <span class="rating-badge">★ {{ movie.vote_average?.toFixed?.(1) || "0.0" }}</span>
          <div class="overlay">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <p class="movie-meta">
              {{ movie.release_date?.slice(0, 4) || "TBD" }}
            </p>
          </div>
        </div>
      </article>
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
  border-radius: 18px;
  overflow: hidden;
  width: clamp(170px, 18vw, 210px);
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 16px 28px rgba(2, 6, 23, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.movie-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 24px 40px rgba(2, 6, 23, 0.45);
}

.poster {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: radial-gradient(120px 80px at 20% 20%, rgba(56, 189, 248, 0.2), transparent 60%),
    rgba(15, 23, 42, 0.85);
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.poster-fallback {
  height: 100%;
  display: grid;
  place-items: center;
  color: #94a3b8;
  font-size: 0.85rem;
}

.rating-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 8px 14px rgba(2, 6, 23, 0.35);
}

.overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 14px 12px;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0), rgba(2, 6, 23, 0.9));
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.movie-title {
  font-size: 0.98rem;
  color: #fef3c7;
  margin-bottom: 4px;
  line-height: 1.2;
  text-shadow:
    0 2px 8px rgba(2, 6, 23, 0.85),
    0 0 12px rgba(0, 229, 255, 0.35);
}

.movie-meta {
  font-size: 0.8rem;
  color: #cbd5e1;
}
</style>
