import { apiCalls } from "@/Api/api-call";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("moviesData", {
  state: () => ({
    movies: [],
    single_movie: {},
    watched_movies: [],
    watched_page: 0,
    watched_total_pages: 1,
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
    async watchedMovies(page = 1) {
      const data = await apiCalls.watchedMovies(page);
      this.watched_page = data.page || page;
      this.watched_total_pages = data.total_pages || 1;
      if (page === 1) {
        this.watched_movies = data.results || [];
        return;
      }
      this.watched_movies = [...this.watched_movies, ...(data.results || [])];
    },
    async addMovieToWatchlist(movieId) {
      const data = await apiCalls.addToWatchlist(movieId);
      return data;
    },
    async removeMovieFromWatchlist(movieId) {
      const data = await apiCalls.removeFromWatchlist(movieId);
      if (data?.success || data?.status_code === 13) {
        this.watched_movies = this.watched_movies.filter((movie) => movie.id !== movieId);
      }
      return data;
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
