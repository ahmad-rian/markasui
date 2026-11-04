// @ts-check
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypeCodeFrame } from "./src/lib/rehype-code-frame.ts";

export default defineConfig({
  site: process.env.SITE_URL || "https://markasui.pages.dev",
  trailingSlash: "never",
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  build: { format: "file" },
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss()],
    server: { fs: { allow: ["../.."] } },
  },
  markdown: {
    rehypePlugins: [rehypeCodeFrame],
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
      defaultColor: false,
    },
  },
});
