<script setup>
import MovieCard from "@/components/movies-card/MovieCard.vue";
import { useMoviesStore } from "@/store/store.js";
import { computed, onMounted, ref } from "vue";

const moviesData = useMoviesStore();
const searchTerm = ref("");

onMounted(() => {
  moviesData.watchedMovies(1);
});

const canLoadMore = computed(
  () => moviesData.watched_page < moviesData.watched_total_pages
);

const loadNextPage = async () => {
  if (!canLoadMore.value) return;
  await moviesData.watchedMovies(moviesData.watched_page + 1);
};

const filteredWatched = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return moviesData.watched_movies;
  const isYear = /^\d{4}$/.test(term);
  return moviesData.watched_movies.filter((movie) =>
    isYear
      ? (movie.release_date || "").slice(0, 4) === term
      : (movie.title || movie.original_title || "").toLowerCase().includes(term)
  );
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
        <button
          class="clear-btn"
          type="button"
          v-if="searchTerm"
          @click="searchTerm = ''"
        >
          Clear
        </button>
      </div>
      <div class="pagination">
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
        <MovieCard :movies="filteredWatched" />
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
  display: flex;
  padding-top: 14px;
  padding-bottom: 10px;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  height: auto;
  align-content: flex-start;
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
}
</style>
