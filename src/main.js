import { createApp } from "vue";
import router from "./router";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).use(router).mount("#app");
