import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import Movies from "@/views/Movies.vue";
import Home from "@/views/Home.vue";
import SingleMovie from "../components/movies-card/SingleMovie.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "About",
    path: "/about-us",
    component: About,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
    children: [
      {
        name: "Single Movie",
        path: "movies/:id",
        component: SingleMovie,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
