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
};

export { apiCalls };
