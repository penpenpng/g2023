import { createApp } from "vue";
import App from "./App.vue";
import { preloadImages } from "./lib/object";

preloadImages().then(() => {
  createApp(App).mount("#app");
});
