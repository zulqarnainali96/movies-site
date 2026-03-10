import watchedMoviesArray from "@/watched-movies-data";

const API_BASE = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const apiCalls = {
  popularMovies() {
    return new Promise(async (resolve, reject) => {
      const repsonse = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}`);
      const data = await repsonse.json();
      resolve(data);
    });
  },
  watchedMovies(page = 1) {
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
    };
    return new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${API_BASE}/account/${
          import.meta.env.VITE_ACCOUND_ID
        }/watchlist/movies?page=${page}`,
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
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
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
          `${API_BASE}/account/${import.meta.env.VITE_ACCOUND_ID}/watchlist`,
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
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
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
          `${API_BASE}/account/${import.meta.env.VITE_ACCOUND_ID}/watchlist`,
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
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
