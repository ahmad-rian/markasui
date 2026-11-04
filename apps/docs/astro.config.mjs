// @ts-check
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://markasui.pages.dev",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss()],
    server: { fs: { allow: ["../.."] } },
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
