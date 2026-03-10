<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "@/store/store.js";
import { apiCalls } from "@/Api/api-call.js";

const route = useRoute();
const moviesStore = useMoviesStore();

const movie = ref(moviesStore.single_movie || null);
const isLoading = ref(false);
const error = ref(null);

const movieId = computed(() => route.params.id);

const loadMovie = async (id) => {
  if (!id) return;
  isLoading.value = true;
  error.value = null;
  try {
    const data = await apiCalls.movieDetails(id);
    movie.value = data;
    moviesStore.openSingleMovie(data);
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadMovie(movieId.value);
});

watch(movieId, (nextId, prevId) => {
  if (nextId && nextId !== prevId) loadMovie(nextId);
});

const trailer = computed(() => {
  const list = movie.value?.videos?.results || [];
  const primary =
    list.find((item) => item.site === "YouTube" && item.type === "Trailer") ||
    list.find((item) => item.site === "YouTube" && item.type === "Teaser") ||
    list.find((item) => item.site === "YouTube");
  return primary || null;
});

const formattedRuntime = computed(() => {
  const runtime = movie.value?.runtime;
  if (!runtime && runtime !== 0) return "N/A";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
});

const ratingPercent = computed(() => {
  const score = Number(movie.value?.vote_average || 0);
  return Math.round(score * 10);
});
</script>

<template>
  <section class="single-movie" :style="{
    '--backdrop-image': movie?.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      : 'none'
  }">
    <div class="hero">
      <div class="hero-content">
        <div class="eyebrow">Movie Details</div>
        <h1>{{ movie?.title || "Loading..." }}</h1>
        <p class="tagline" v-if="movie?.tagline">{{ movie.tagline }}</p>
        <div class="meta-row">
          <span class="meta-pill">{{ movie?.release_date || "TBD" }}</span>
          <span class="meta-pill">{{ formattedRuntime }}</span>
          <span class="meta-pill" v-if="movie?.status">{{ movie.status }}</span>
          <span class="meta-pill" v-if="movie?.original_language">
            {{ movie.original_language?.toUpperCase() }}
          </span>
        </div>
        <p class="overview">
          {{ movie?.overview || "Overview not available for this title yet." }}
        </p>
        <div class="stats">
          <div class="stat-card">
            <span class="stat-label">Rating</span>
            <span class="stat-value">{{ movie?.vote_average?.toFixed?.(1) || "0.0" }}</span>
            <span class="stat-sub">{{ ratingPercent }}% user score</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Vote Count</span>
            <span class="stat-value">{{ movie?.vote_count || 0 }}</span>
            <span class="stat-sub">Total votes</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Popularity</span>
            <span class="stat-value">{{ Math.round(movie?.popularity || 0) }}</span>
            <span class="stat-sub">TMDB rank</span>
          </div>
        </div>
      </div>
      <div class="poster-panel">
        <div class="poster-frame">
          <img
            v-if="movie?.poster_path"
            loading="lazy"
            :src="`https://image.tmdb.org/t/p/w780${movie.poster_path}`"
            alt="Movie Poster"
          />
          <div v-else class="poster-fallback">Poster unavailable</div>
        </div>
        <div class="genre-row">
          <span class="genre-pill" v-for="genre in movie?.genres || []" :key="genre.id">
            {{ genre.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <section class="panel glass">
        <h2>About</h2>
        <div class="fact-grid">
          <div class="fact">
            <span class="fact-label">Release Date</span>
            <span class="fact-value">{{ movie?.release_date || "TBD" }}</span>
          </div>
          <div class="fact">
            <span class="fact-label">Runtime</span>
            <span class="fact-value">{{ formattedRuntime }}</span>
          </div>
          <div class="fact">
            <span class="fact-label">Budget</span>
            <span class="fact-value">
              {{ movie?.budget ? `$${movie.budget.toLocaleString()}` : "Not shared" }}
            </span>
          </div>
          <div class="fact">
            <span class="fact-label">Revenue</span>
            <span class="fact-value">
              {{ movie?.revenue ? `$${movie.revenue.toLocaleString()}` : "Not shared" }}
            </span>
          </div>
          <div class="fact">
            <span class="fact-label">Status</span>
            <span class="fact-value">{{ movie?.status || "N/A" }}</span>
          </div>
          <div class="fact">
            <span class="fact-label">Production</span>
            <span class="fact-value">
              {{ (movie?.production_companies || []).slice(0, 3).map((c) => c.name).join(", ") || "N/A" }}
            </span>
          </div>
        </div>
      </section>

      <section class="panel glass">
        <h2>Trailer</h2>
        <div class="trailer-frame" v-if="trailer">
          <iframe
            :src="`https://www.youtube.com/embed/${trailer.key}`"
            title="Movie trailer"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p v-else class="muted">
          Trailer not available for this title right now.
        </p>
      </section>

      <section class="panel glass">
        <h2>Top Cast</h2>
        <div class="cast-grid">
          <article
            class="cast-card"
            v-for="person in (movie?.credits?.cast || []).slice(0, 10)"
            :key="person.id"
          >
            <div class="cast-photo">
              <img
                v-if="person.profile_path"
                loading="lazy"
                :src="`https://image.tmdb.org/t/p/w300${person.profile_path}`"
                :alt="person.name"
              />
              <div v-else class="cast-fallback">
                {{ person.name?.slice(0, 1) || "?" }}
              </div>
            </div>
            <div class="cast-meta">
              <p class="cast-name">{{ person.name }}</p>
              <p class="cast-role">{{ person.character || "Unknown role" }}</p>
            </div>
          </article>
          <p class="muted" v-if="!movie?.credits?.cast?.length">
            Cast details not available.
          </p>
        </div>
      </section>
    </div>

    <div class="error" v-if="error">
      Failed to load movie details. Please try again.
    </div>
    <div class="loading" v-if="isLoading">
      Loading movie details...
    </div>
  </section>
</template>

<style scoped>
.single-movie {
  --ink: #f8fafc;
  --muted: #cbd5e1;
  --accent: #6ee7ff;
  --accent-2: #f0abfc;
  --glass: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.18);

  width: 100%;
  min-height: 100%;
  padding: 24px;
  border-radius: 20px;
  color: var(--ink);
  background:
    linear-gradient(180deg, rgba(2, 6, 23, 0.88), rgba(15, 23, 42, 0.95)),
    var(--backdrop-image);
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid var(--glass-border);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 24px 40px rgba(2, 6, 23, 0.45);
}

.hero-content h1 {
  font-size: clamp(2rem, 3.5vw, 3.1rem);
  line-height: 1.05;
  margin-bottom: 10px;
}

.eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #7dd3fc;
  margin-bottom: 10px;
  font-weight: 700;
}

.tagline {
  color: var(--accent-2);
  font-weight: 600;
  margin-bottom: 12px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.meta-pill {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
  color: var(--muted);
}

.overview {
  color: #e2e8f0;
  line-height: 1.7;
  margin-bottom: 18px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.stat-card {
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #94a3b8;
}

.stat-value {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: 6px;
}

.stat-sub {
  font-size: 0.8rem;
  color: #cbd5e1;
}

.poster-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

.poster-frame {
  width: min(320px, 100%);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 18px 30px rgba(2, 6, 23, 0.5);
  background: rgba(15, 23, 42, 0.6);
}

.poster-frame img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.poster-fallback {
  padding: 48px 16px;
  text-align: center;
  color: #94a3b8;
}

.genre-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.genre-pill {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(14, 116, 144, 0.35);
  border: 1px solid rgba(125, 211, 252, 0.4);
  font-size: 0.75rem;
  color: #e0f2fe;
}

.content-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.panel {
  padding: 18px;
  border-radius: 16px;
}

.panel h2 {
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.fact-grid {
  display: grid;
  gap: 12px;
}

.fact {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 8px;
}

.fact:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.fact-label {
  color: #94a3b8;
  font-size: 0.85rem;
}

.fact-value {
  color: #f8fafc;
  font-weight: 600;
  text-align: right;
}

.trailer-frame {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(15, 23, 42, 0.6);
}

.trailer-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.cast-card {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.cast-photo {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(148, 163, 184, 0.12);
  display: grid;
  place-items: center;
}

.cast-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cast-fallback {
  font-weight: 700;
  color: #94a3b8;
}

.cast-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cast-name {
  font-weight: 600;
  color: #f8fafc;
  font-size: 0.95rem;
}

.cast-role {
  color: #94a3b8;
  font-size: 0.8rem;
}

.muted {
  color: #94a3b8;
}

.error,
.loading {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.loading {
  background: rgba(14, 165, 233, 0.2);
  border-color: rgba(14, 165, 233, 0.4);
}

@media screen and (max-width: 900px) {
  .single-movie {
    padding: 16px;
  }

  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
