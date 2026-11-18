// @ts-check
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypeCodeFrame } from "./src/lib/rehype-code-frame.ts";

/** Direktif client:near (src/lib/client-near.ts) untuk island preview. */
const nearDirective = {
  name: "client-near",
  hooks: {
    "astro:config:setup": ({ addClientDirective }) =>
      addClientDirective({
        name: "near",
        entrypoint: "./src/lib/client-near.ts",
      }),
  },
};

/**
 * ClientRouter memakai <script type="module" src="data:..."> kosong untuk menunggu skrip module inline. CSP situs
 * (scripts/csp-policy.ts) tidak mengizinkan data: di script-src, jadi diarahkan ke modul kosong same-origin.
 */
const ROUTER_DUMMY = 'src="data:application/javascript,"';
const cspSafeRouter = {
  name: "markas-csp-safe-router",
  transform(code, id) {
    if (!/astro\/dist\/transitions\/router\.js$/.test(id)) return;
    if (!code.includes(ROUTER_DUMMY)) {
      throw new Error(
        "Astro router no longer uses the data: dummy script: review cspSafeRouter",
      );
    }
    return code.replace(ROUTER_DUMMY, 'src="/empty-module.js"');
  },
};

/** Batas CSS landing yang masih disisipkan ke HTML (byte, sebelum gzip). */
const LANDING_CSS_LIMIT = 16 * 1024;

export default defineConfig({
  site: process.env.SITE_URL || "https://markas.jenderalcorp.com",
  trailingSlash: "never",
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  build: { format: "file" },
  integrations: [react(), vue(), svelte(), nearDirective],
  vite: {
    plugins: [tailwindcss(), cspSafeRouter],
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
