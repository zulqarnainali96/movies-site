import { apiCalls } from "@/Api/api-call";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("moviesData", {
  state: () => ({
    movies: [],
    single_movie: {},
    watched_movies: [],
    popular_movies: [],
    now_playing: [],
    top_rated_movies: [],
    upcoming_movies: [],
    searched_results: [],  
    search_movies: "",
    movie_type: "popular",
    isLoading: false,
    error: null,
  }),
  getters: {
  },
  actions: {
    filterMovie(type) {
      this.movie_type = type;
    },
    openSingleMovie(obj) {
      this.single_movie = obj;
    },
    searchedMovie() {
      return "Hello world";
    },

    // Api Calls
    async searchMovies() {
      if (!this.search_movies) {
        this.searched_results = [];
        return;
      }
      try {
        this.isLoading = true;
        const data = await apiCalls.searchMovies(this.search_movies);
        this.searched_results = data.results || [];
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

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
      this.watched_movies = data.results;
    },
    async nowPlaying() {
      const data = await apiCalls.nowPlaying();
      this.now_playing = data.results;
    },
    async upComing() {
      const data = await apiCalls.upComing();
      this.upcoming_movies = data.results;
    },
    async topRatedMovies() {
      const data = await apiCalls.topRatedMovies();
      this.top_rated_movies = data.results;
    },
  },
});
