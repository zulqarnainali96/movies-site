import { createRouter, createWebHistory } from "vue-router";
import About from "../components/About.vue";
import Movies from "../components/Movies.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
