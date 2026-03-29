import { apiCalls } from "@/Api/api-call";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("moviesData", {
  state: () => ({
    movies: [],
    single_movie: {},
    watched_movies: [],
    watched_page: 0,
    watched_total_pages: 1,
    watched_loaded_pages: {},
    watched_loading_pages: {},
    watched_all_movies: [],
    watched_all_loaded: false,
    watched_all_loading: false,
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
    async watchedMovies(page = 1, options = {}) {
      const { force = false } = options;

      if (!force && this.watched_loaded_pages[page]) {
        this.watched_page = Math.max(this.watched_page, page);
        return;
      }

      if (this.watched_loading_pages[page]) return;
      this.watched_loading_pages = {
        ...this.watched_loading_pages,
        [page]: true,
      };

      try {
        const data = await apiCalls.watchedMovies(page);
        const incomingPage = data.page || page;
        const results = data.results || [];

        this.watched_total_pages = data.total_pages || 1;
        this.watched_page = Math.max(this.watched_page, incomingPage);

        if (incomingPage === 1 && (force || !this.watched_loaded_pages[1])) {
          this.watched_movies = results;
        } else {
          const existingIds = new Set(this.watched_movies.map((movie) => movie.id));
          const uniqueIncoming = results.filter((movie) => !existingIds.has(movie.id));
          this.watched_movies = [...this.watched_movies, ...uniqueIncoming];
        }

        this.watched_loaded_pages = {
          ...this.watched_loaded_pages,
          [incomingPage]: true,
        };
      } finally {
        this.watched_loading_pages = {
          ...this.watched_loading_pages,
          [page]: false,
        };
      }
    },
    async fetchAllWatchedMovies(options = {}) {
      const { force = false } = options;

      if (!force && this.watched_all_loaded) return this.watched_all_movies;
      if (this.watched_all_loading) return this.watched_all_movies;

      this.watched_all_loading = true;

      try {
        let page = 1;
        let totalPages = 1;
        const allMovies = [];
        const existingIds = new Set();

        while (page <= totalPages) {
          const data = await apiCalls.watchedMovies(page);
          totalPages = data.total_pages || 1;

          for (const movie of data.results || []) {
            if (existingIds.has(movie.id)) continue;
            existingIds.add(movie.id);
            allMovies.push(movie);
          }

          page += 1;
        }

        this.watched_all_movies = allMovies;
        this.watched_all_loaded = true;
        return this.watched_all_movies;
      } catch (err) {
        this.error = err;
        return this.watched_all_movies;
      } finally {
        this.watched_all_loading = false;
      }
    },
    clearWatchedCache() {
      this.watched_movies = [];
      this.watched_page = 0;
      this.watched_total_pages = 1;
      this.watched_loaded_pages = {};
      this.watched_loading_pages = {};
      this.watched_all_movies = [];
      this.watched_all_loaded = false;
      this.watched_all_loading = false;
    },
    async addMovieToWatchlist(movieId) {
      const data = await apiCalls.addToWatchlist(movieId);
      return data;
    },
    async removeMovieFromWatchlist(movieId) {
      const data = await apiCalls.removeFromWatchlist(movieId);
      if (data?.success || data?.status_code === 13) {
        this.watched_movies = this.watched_movies.filter((movie) => movie.id !== movieId);
        this.watched_all_movies = this.watched_all_movies.filter((movie) => movie.id !== movieId);
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
