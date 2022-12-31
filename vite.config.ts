import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://penpenpng.github.io/g2023/dist/",
  plugins: [vue()],
});
