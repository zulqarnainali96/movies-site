<script setup>
import { ref, computed, reactive } from "vue";
import { useMoviesStore } from "@/store/store.js";
const moviesStore = useMoviesStore();

const singleMovie = computed(() => {
  // let id = location.pathname.split("/").pop();
  // return moviesStore.movies.find((movie) => movie.id.toString() === id);
  return moviesStore.single_movie;
});
console.log(moviesStore.single_movie);
</script>

<template>
  <div class="single-movie">
    <div class="main">
      <div>
        <h2>{{ singleMovie?.title }}</h2>
        <p class="overview">
          <span>Overview</span> : {{ singleMovie?.overview }}
        </p>
        <br />
        <p class="text-small">
          Release Date : <span class="pd">{{ singleMovie?.release_date }}</span>
        </p>
        <p class="text-small">
          Rating : <span class="pd">{{ singleMovie?.vote_average }}</span>
        </p>
        <p class="text-small">
          Vote Count : <span class="pd">{{ singleMovie?.vote_count }}</span>
        </p>
      </div>
      <div>
        <img
          loading="lazy"
          :src="`https://image.tmdb.org/t/p/original${singleMovie?.poster_path}`"
          alt="Movie Poster"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.single-movie {
  width: 100%;
  height: 100%;
  color: #fff;
}

.main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 12px;
  width: 100%;
}

.overview {
  padding: 0.8rem;
  line-height: 1.7;
}

.overview span {
  font-size: 1.4rem;
}

img {
  width: 100%;
  height: 850px;
  display: block;
  border-radius: 12px;
  object-fit: contain;
}
.text-small {
  font-size: 1em;
  padding-block: 4px;
}
.pd {
  padding: 0.3rem 6px;
  background-color: cadetblue;
  border-radius: 17px;
  font-size: 0.9em;
}
h2 {
  font-size: 2.4rem;
}
@media screen and (max-width: 768px) {
  img {
    height: 400px;
  }
}
</style>
