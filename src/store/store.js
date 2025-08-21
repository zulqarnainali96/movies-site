import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('moviesData',({
    state : () => ({
        movies : [],
        allMovies : [],
        isLoading : false,
        error : ""
    }),
    getters : {
        
    },
    actions : {
        async popularMovies(){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`)
            const data = await response.json()
            return data.results
        }
    }
}))