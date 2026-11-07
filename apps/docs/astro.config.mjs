// @ts-check
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypeCodeFrame } from "./src/lib/rehype-code-frame.ts";

/** Batas CSS landing yang masih disisipkan ke HTML (byte, sebelum gzip). */
const LANDING_CSS_LIMIT = 16 * 1024;

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
    build: {
      // CSS khusus landing (bingkai hero, kaca beralur) disisipkan ke HTML: tanpa request
      // render-blocking tambahan untuk LCP. Aset lain tetap memakai batas bawaan 4 KB.
      assetsInlineLimit: (file, content) =>
        /(^|\/)index\.[\w-]+\.css$/.test(file) &&
        content.length < LANDING_CSS_LIMIT
          ? true
          : undefined,
    },
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
