<script setup>
import MovieCard from "@/components/movies-card/MovieCard.vue";
import { useMoviesStore } from "@/store/store.js";
import { useRouter } from "vue-router";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const router = useRouter();
const moviesData = useMoviesStore();
const searchTerm = ref("");
const selectedRating = ref("");
const selectedIndustry = ref("");
const useApiSearch = ref(false);
const SEARCH_MODE_STORAGE_KEY = "watched_movies_use_api_search";
let searchDebounceTimer = null;

const toRatingBucket = (rating) => {
  const numericRating = Number(rating || 0);
  if (!Number.isFinite(numericRating) || numericRating <= 0) return "";
  const bucket = Math.min(10, Math.floor(numericRating) + 1);
  return bucket.toFixed(1);
};

const getIndustryTag = (movie) => {
  const language = (movie.original_language || "").toLowerCase();
  if (language === "en") return "Hollywood";

  // Heuristic grouping based on language for Indian cinema.
  if (["hi", "bn", "ta", "te", "ml", "mr", "pa", "kn", "gu"].includes(language)) {
    return "Bollywood";
  }

  return "Other";
};

onMounted(() => {
  const savedMode =
    typeof window !== "undefined"
      ? window.localStorage.getItem(SEARCH_MODE_STORAGE_KEY)
      : null;
  useApiSearch.value = savedMode === "1";

  if (!moviesData.watched_movies.length) {
    moviesData.watchedMovies(1);
  }
});

onBeforeUnmount(() => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = null;
  }
});

watch(useApiSearch, (enabled) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SEARCH_MODE_STORAGE_KEY, enabled ? "1" : "0");
  }

  if (enabled) {
    moviesData.fetchAllWatchedMovies();
  }
});

watch(searchTerm, (value) => {
  if (!useApiSearch.value) return;

  if (searchDebounceTimer) clearTimeout(searchDebounceTimer);

  const term = value.trim();
  if (!term) return;

  searchDebounceTimer = setTimeout(() => {
    moviesData.fetchAllWatchedMovies();
  }, 350);
});

const canLoadMore = computed(
  () => moviesData.watched_page < moviesData.watched_total_pages
);

const loadNextPage = async () => {
  if (!canLoadMore.value) return;
  await moviesData.watchedMovies(moviesData.watched_page + 1);
};

const activeWatchedSource = computed(() =>
  useApiSearch.value && searchTerm.value.trim()
    ? moviesData.watched_all_movies
    : moviesData.watched_movies
);

const apiSearchSuggestions = computed(() => {
  if (!useApiSearch.value) return [];
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return [];

  return moviesData.watched_all_movies
    .filter((movie) => {
      const title = (movie.title || movie.original_title || "").toLowerCase();
      return title.includes(term);
    })
    .slice(0, 8);
});

const openMovieFromSearch = (movie) => {
  moviesData.openSingleMovie(movie);
  searchTerm.value = "";
  router.push({ name: "SingleMovie", params: { id: movie.id } });
};

const filteredWatched = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  const isYear = /^\d{4}$/.test(term);

  return activeWatchedSource.value.filter((movie) => {
    const title = (movie.title || movie.original_title || "").toLowerCase();
    const matchesSearch = !term
      ? true
      : isYear
      ? (movie.release_date || "").slice(0, 4) === term
      : title.includes(term);

    const movieRatingBucket = toRatingBucket(movie.vote_average);
    const matchesRating = !selectedRating.value || movieRatingBucket === selectedRating.value;
    const movieIndustry = getIndustryTag(movie);
    const matchesIndustry = !selectedIndustry.value || movieIndustry === selectedIndustry.value;

    return matchesSearch && matchesRating && matchesIndustry;
  });
});

const ratingOptions = computed(() => {
  const available = new Set(
    activeWatchedSource.value
      .map((movie) => toRatingBucket(movie.vote_average))
      .filter((rating) => !!rating)
  );

  return [...available].sort((a, b) => Number(b) - Number(a));
});

const industryOptions = computed(() => {
  const available = new Set(activeWatchedSource.value.map((movie) => getIndustryTag(movie)));
  return ["Hollywood", "Bollywood", "Other"].filter((label) => available.has(label));
});
</script>

<template>
  <section class="watched">
    <header class="hero glass">
      <div>
        <p class="eyebrow">Your Collection</p>
        <h1>Watched Movies</h1>
        <p class="sub">Everything you’ve already seen, all in one place.</p>
      </div>
      <div class="stat">
        <span class="count">{{ moviesData.watched_movies.length }}</span>
        <span class="label">Titles</span>
      </div>
    </header>

    <div class="content glass">
      <div class="search-row">
        <div class="search-wrap">
          <span class="search-icon">Search</span>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search your watched movies..."
          />
        </div>
        <label class="mode-check" for="search-mode-api">
          <input id="search-mode-api" v-model="useApiSearch" type="checkbox" />
          Search via API
        </label>
        <button
          class="clear-btn"
          type="button"
          v-if="searchTerm"
          @click="searchTerm = ''"
        >
          Clear
        </button>
      </div>
      <p class="api-search-note" v-if="useApiSearch && searchTerm.trim() && moviesData.watched_all_loading">
        Searching full watched list from API...
      </p>

      <div
        class="search-drop"
        v-if="useApiSearch && searchTerm.trim() && !moviesData.watched_all_loading"
      >
        <ul v-if="apiSearchSuggestions.length">
          <li
            v-for="movie in apiSearchSuggestions"
            :key="movie.id"
            class="search-drop-item"
            @click="openMovieFromSearch(movie)"
          >
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
              width="44"
              height="66"
              :alt="movie.title"
            />
            <div v-else class="search-drop-fallback">No Poster</div>
            <div class="search-drop-meta">
              <strong>{{ movie.title }}</strong>
              <span>{{ movie.release_date?.slice(0, 4) || "TBD" }}</span>
            </div>
          </li>
        </ul>
        <p v-else class="search-drop-empty">No matching watched movie found.</p>
      </div>

      <div class="rating-row" v-if="ratingOptions.length">
        <label class="rating-label" for="rating-filter">Rating</label>
        <div class="rating-select-wrap">
          <select id="rating-filter" class="rating-select" v-model="selectedRating">
            <option value="">All Ratings</option>
            <option v-for="rating in ratingOptions" :key="rating" :value="rating">
              {{ rating }}
            </option>
          </select>
        </div>
      </div>

      <div class="rating-row" v-if="industryOptions.length">
        <label class="rating-label" for="industry-filter">Origin</label>
        <div class="rating-select-wrap">
          <select id="industry-filter" class="rating-select" v-model="selectedIndustry">
            <option value="">All Origins</option>
            <option v-for="industry in industryOptions" :key="industry" :value="industry">
              {{ industry }}
            </option>
          </select>
        </div>
      </div>

      <div class="pagination" v-if="!(useApiSearch && searchTerm.trim())">
        <span class="page-info">
          Page {{ moviesData.watched_page }} of {{ moviesData.watched_total_pages }}
        </span>
        <button
          class="next-btn"
          type="button"
          :disabled="!canLoadMore"
          @click="loadNextPage"
        >
          Next
        </button>
      </div>
      <div class="movies-list">
        <MovieCard :movies="filteredWatched" poster-size="w342" />
        <p class="empty" v-if="!filteredWatched.length">No matches found.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.watched {
  --glass: rgba(255, 255, 255, 0.14);
  --glass-border: rgba(255, 255, 255, 0.22);

  color: #e2e8f0;
  padding: 16px;
  display: grid;
  gap: 16px;
}

.glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
  border-radius: 18px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
}

.eyebrow {
  color: #cbd5f5;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 8px;
}

h1 {
  font-size: clamp(1.8rem, 2.5vw, 2.6rem);
  color: #f8fafc;
  line-height: 1.1;
  margin-bottom: 6px;
}

.sub {
  color: #cbd5e1;
}

.stat {
  min-width: 120px;
  text-align: center;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.count {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #f8fafc;
}

.label {
  color: #cbd5e1;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.content {
  padding: 16px;
  overflow: hidden;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.mode-check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 0.86rem;
  white-space: nowrap;
}

.mode-check input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #2563eb;
}

.api-search-note {
  color: #bfdbfe;
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.search-drop {
  width: min(520px, 100%);
  max-height: 300px;
  overflow-y: auto;
  border-radius: 10px;
  margin-bottom: 12px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 24px rgba(2, 6, 23, 0.45);
}

.search-drop ul {
  list-style: none;
  margin: 0;
  padding: 6px;
}

.search-drop-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e2e8f0;
  padding: 8px;
  border-radius: 9px;
  cursor: pointer;
}

.search-drop-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.search-drop-item img {
  border-radius: 7px;
  object-fit: cover;
  flex-shrink: 0;
}

.search-drop-fallback {
  width: 44px;
  height: 66px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  display: grid;
  place-items: center;
  font-size: 0.65rem;
  text-align: center;
  flex-shrink: 0;
}

.search-drop-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.search-drop-meta span {
  color: #94a3b8;
  font-size: 0.82rem;
}

.search-drop-empty {
  color: #cbd5e1;
  font-size: 0.88rem;
  padding: 10px 12px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.rating-label {
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 600;
}

.rating-select-wrap {
  position: relative;
  min-width: 160px;
}

.rating-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 8px 36px 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(15, 23, 42, 0.75);
  color: #e2e8f0;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.rating-select:hover {
  border-color: rgba(255, 255, 255, 0.42);
}

.rating-select:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.65);
  outline-offset: 1px;
}

.rating-select option {
  background: #0f172a;
  color: #e2e8f0;
}

.rating-select-wrap::after {
  content: "▾";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #cbd5e1;
  pointer-events: none;
  font-size: 0.8rem;
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

.clear-btn {
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.2s ease;
  font-weight: 600;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.35);
}

.movies-list {
  display: grid;
  padding-top: 14px;
  padding-bottom: 10px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  width: 100%;
  height: auto;
  align-content: flex-start;
}

.movies-list :deep(.movie-card) {
  width: 100%;
}

.empty {
  color: #cbd5e1;
  font-size: 0.95rem;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  gap: 12px;
}

.page-info {
  color: #cbd5e1;
  font-size: 0.9rem;
}

.next-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
}

.next-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

@media screen and (max-width: 768px) {
  .watched {
    padding: 12px;
  }
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
  .stat {
    width: 100%;
  }
  .search-row {
    flex-direction: column;
    align-items: stretch;
  }
  .search-wrap {
    width: 100%;
  }
  .movies-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .movies-list :deep(.movie-card) {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .movies-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
