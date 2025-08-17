import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import Movies from "@/views/Movies.vue";
import Home from "@/views/Home.vue";
import SingleMovie from "../components/movies-card/SingleMovie.vue";

const routes = [
  {
    name : "Home",
    path : "/",
    component : Home
  },
  {
    name: "About",
    path: "/about-us",
    component: About,
  },
  {
    name: "Movies",
    path: "/movies",
    component: Movies,
  },
  {
    name : 'SingleMovie',
    path : '/single-movie',
    component : SingleMovie,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
