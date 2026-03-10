import watchedMoviesArray from "@/watched-movies-data";

const getEnv = (key) =>
  (import.meta?.env && import.meta.env[key]) ||
  (typeof window !== "undefined" && window.__ENV__ && window.__ENV__[key]) ||
  "";

const API_BASE = getEnv("VITE_API_URL") || "https://api.themoviedb.org/3";
const API_KEY = getEnv("VITE_API_KEY");
const READ_TOKEN = getEnv("VITE_READ_ACCESS_TOKEN");
const ACCOUNT_ID = getEnv("VITE_ACCOUND_ID");

const authHeaders = READ_TOKEN
  ? {
      Authorization: `Bearer ${READ_TOKEN}`,
    }
  : {};

const missingEnvResponse = (message) => ({
  success: false,
  status_code: 0,
  status_message: message,
});

const apiCalls = {
  popularMovies() {
    return new Promise(async (resolve, reject) => {
      const url = API_KEY
        ? `${API_BASE}/movie/popular?api_key=${API_KEY}`
        : `${API_BASE}/movie/popular`;
      const repsonse = await fetch(url, {
        headers: authHeaders,
      });
      const data = await repsonse.json();
      resolve(data);
    });
  },
  watchedMovies(page = 1) {
    return new Promise(async (resolve, reject) => {
      if (!ACCOUNT_ID || !READ_TOKEN) {
        resolve({
          page,
          total_pages: 1,
          results: [],
          ...missingEnvResponse("Missing VITE_ACCOUND_ID or VITE_READ_ACCESS_TOKEN"),
        });
        return;
      }
      let options = {
        method: "GET",
        headers: authHeaders,
      };
      const response = await fetch(
        `${API_BASE}/account/${ACCOUNT_ID}/watchlist/movies?page=${page}`,
        options
      );
      const data = await response.json();
      resolve(data);
    });
    // for (let movie of watchedMoviesArray) {
    //   fetch(
    //     `${import.meta.env.VITE_API_URL}/search/movie?query=${
    //       movie.name
    //     }&year=${movie.year}`,
    //     options
    //   )
  },
  addToWatchlist(movieId) {
    if (!ACCOUNT_ID || !READ_TOKEN) {
      return Promise.resolve(
        missingEnvResponse("Missing VITE_ACCOUND_ID or VITE_READ_ACCESS_TOKEN")
      );
    }
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: true,
      }),
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${API_BASE}/account/${ACCOUNT_ID}/watchlist`,
          options
        );
        const data = await response.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  removeFromWatchlist(movieId) {
    if (!ACCOUNT_ID || !READ_TOKEN) {
      return Promise.resolve(
        missingEnvResponse("Missing VITE_ACCOUND_ID or VITE_READ_ACCESS_TOKEN")
      );
    }
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: false,
      }),
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${API_BASE}/account/${ACCOUNT_ID}/watchlist`,
          options
        );
        const data = await response.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  nowPlaying() {
    let options = {
      method: "GET",
      headers: authHeaders,
    };
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`${API_BASE}/movie/now_playing`, options);
      const data = await response.json();
      resolve(data);
    });
  },
  upComing() {
    let options = {
      method: "GET",
      headers: authHeaders,
    };
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`${API_BASE}/movie/upcoming`, options);
      const data = await response.json();
      resolve(data);
    });
  },  
  topRatedMovies() {
    let options = {
      method: "GET",
      headers: authHeaders,
    };
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`${API_BASE}/movie/top_rated`, options);
      const data = await response.json();
      resolve(data);
    });
  },
  searchMovies(query) {
    let options = {
      method: "GET",
      headers: authHeaders,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${API_BASE}/search/movie?query=${encodeURIComponent(query)}`,
          options
        );
        const data = await response.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  movieDetails(id) {
    let options = {
      method: "GET",
      headers: authHeaders,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${API_BASE}/movie/${id}?append_to_response=videos,credits`,
          options
        );
        const data = await response.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
};

export { apiCalls };
