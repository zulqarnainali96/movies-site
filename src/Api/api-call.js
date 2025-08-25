import watchedMoviesArray from "@/watched-movies-data";

const apiCalls = {
  popularMovies() {
    return new Promise(async (resolve, reject) => {
      const repsonse = await fetch(
        `${import.meta.env.VITE_API_URL}/movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await repsonse.json();
      resolve(data);
    });
  },
  watchedMovies() {
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
    };
    return new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/account/${
          import.meta.env.VITE_ACCOUND_ID
        }/watchlist/movies`, options
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
  nowPlaying() {
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
    };
    return new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movie/now_playing`, options
      );
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movie/upcoming`, options
      );
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
      const response = await fetch( `${import.meta.env.VITE_API_URL}/movie/top_rated`, options
      );
      const data = await response.json();
      resolve(data);
    });
  }
};

export { apiCalls };
