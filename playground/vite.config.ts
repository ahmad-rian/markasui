import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root,
  plugins: [tailwindcss(), react(), vue()],
  server: { port: 5173, strictPort: true, fs: { allow: [".."] } },
  build: {
    rollupOptions: {
      input: {
        index: `${root}index.html`,
        react: `${root}react.html`,
        vue: `${root}vue.html`,
        blade: `${root}blade.html`,
      },
    },
  },
});
