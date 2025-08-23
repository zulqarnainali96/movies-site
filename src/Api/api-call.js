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
    let results = [];
    for (let movie of watchedMoviesArray) {
      let options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
        },
      };
      fetch(
        `${import.meta.env.VITE_API_URL}/search/movie?query=${
          movie.name
        }&year=${movie.year}`,
        options
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const filterData = data.results?.filter((item) =>
            item.release_date?.includes(movie.year)
          );
          // console.log(data.results);
          // console.log(filterData);
          results.push(...filterData);
        })
        .catch((err) => {
          results.push({ results: "error", message: `${err.message}` });
        });
    }
    return results;
  },
};

export { apiCalls };
