import { fileURLToPath } from "node:url";
import angular from "@analogjs/vite-plugin-angular";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const workspace = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  root,
  plugins: [
    tailwindcss(),
    react(),
    vue(),
    svelte(),
    // Hanya file Angular (komponen *.component.ts dan examples/angular) yang dikompilasi AOT.
    angular({
      tsconfig: `${workspace}tsconfig.angular.json`,
      workspaceRoot: workspace,
      transformFilter: (_code, id) =>
        /\.component\.ts$|\/examples\/angular\//.test(id),
    }),
  ],
  server: { port: 5173, strictPort: true, fs: { allow: [".."] } },
  // Pre-bundle di awal agar Vite tidak reload halaman di tengah tes Playwright.
  optimizeDeps: {
    include: [
      "react",
      "react-dom/client",
      "react/jsx-runtime",
      "vue",
      "alpinejs",
      "svelte",
      "svelte/internal/client",
      "@angular/core",
      "@angular/platform-browser",
    ],
  },
  build: {
    rollupOptions: {
      input: {
        index: `${root}index.html`,
        react: `${root}react.html`,
        vue: `${root}vue.html`,
        blade: `${root}blade.html`,
        svelte: `${root}svelte.html`,
        astro: `${root}astro.html`,
        angular: `${root}angular.html`,
        template: `${root}template.html`,
      },
    },
  },
});
