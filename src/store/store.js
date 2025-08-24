import { apiCalls } from "@/Api/api-call";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("moviesData", {
  state: () => ({
    movies: [],
    watched_movies: [],
    popular_movies: [],
    now_playing : [],
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
    async watchedMovies() {
      const data = await apiCalls.watchedMovies();
      this.watched_movies = data.results
    },
    async nowPlaying(){
      const data = await apiCalls.nowPlaying()
      this.now_playing = data.results;
    },
    async upComing(){
      const data = await apiCalls.upComing()
      this.upcoming_movies = data.results;
    }
  },
});
