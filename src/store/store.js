import { apiCalls } from "@/Api/api-call";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("moviesData", {
  state: () => ({
    movies: [],
    watched_movies: [],
    popular_movies: [],
    upcoming_movies: [],
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async popMovies() {
      try {
        this.isLoading = true;
        const data = await apiCalls.popularMovies();
        this.popular_movies = data.results;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    watchedMovies() {
      this.watched_movies = apiCalls.watchedMovies();
    },
  },
});
