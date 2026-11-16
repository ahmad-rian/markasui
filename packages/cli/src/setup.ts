import type { Framework } from "./types.ts";

/** Langkah setup Tailwind v4 + markas.css. Satu sumber untuk `markasui init` dan MCP get_setup. */
export function setupGuide(
  framework: Framework,
  cssPath = defaultCss[framework],
): string {
  const cssImport = `@import "./${cssPath.split("/").at(-1)}";`;
  switch (framework) {
    case "blade":
      return `## MarkasUI setup for Laravel (Blade)

1. Install Tailwind CSS v4 and Alpine.js:
   npm install tailwindcss @tailwindcss/vite alpinejs
2. Add the plugin to vite.config.js:
   import tailwindcss from "@tailwindcss/vite";
   plugins: [laravel({ input: ["resources/css/app.css", "resources/js/app.js"], refresh: true }), tailwindcss()]
3. Save markas.css as ${cssPath}, then set resources/css/app.css to:
   ${cssImport}
   @source "../views";
4. Start Alpine in resources/js/app.js (skip this with Livewire 3 or 4, which already start Alpine; see /docs/livewire):
   import Alpine from "alpinejs"; window.Alpine = Alpine; Alpine.start();
5. Use components as <x-markas.button>, stored in resources/views/components/markas/.`;
    case "react":
      return `## MarkasUI setup for React (Vite or Next.js)

1. Vite: npm install tailwindcss @tailwindcss/vite, then add tailwindcss() to plugins in vite.config.ts.
   Next.js: npm install tailwindcss @tailwindcss/postcss, then postcss.config.mjs with { plugins: { "@tailwindcss/postcss": {} } }.
2. Save markas.css as ${cssPath} and import it once from the entry (src/main.tsx or app/layout.tsx).
3. Import components from the components folder, for example import { Button } from "@/components/markas/Button".
4. Dark mode turns on when <html> has the "dark" class.`;
    case "vue":
      return `## MarkasUI setup for Vue (Vite or Nuxt)

1. npm install tailwindcss @tailwindcss/vite, then add tailwindcss() to plugins in vite.config.ts
   (Nuxt: vite: { plugins: [tailwindcss()] } and css: ["~/${cssPath}"] in nuxt.config.ts).
2. Save markas.css as ${cssPath} and import it once from src/main.ts (Vite).
3. Import components from the components folder, for example import Button from "@/components/markas/Button.vue".
4. Dark mode turns on when <html> has the "dark" class.`;
    case "svelte":
      return `## MarkasUI setup for Svelte (SvelteKit or Vite)

1. npm install tailwindcss @tailwindcss/vite, then add tailwindcss() before sveltekit() (or svelte()) in plugins in vite.config.ts.
2. Save markas.css as ${cssPath} and import it once: SvelteKit from src/routes/+layout.svelte (import "../markas.css"), Vite from src/main.ts.
3. Import components from the components folder, for example import Button from "$lib/components/markas/Button.svelte".
4. Components use Svelte 5 runes and have no other dependencies. Dark mode turns on when <html> has the "dark" class.`;
    case "astro":
      return `## MarkasUI setup for Astro

1. npx astro add tailwind (or npm install tailwindcss @tailwindcss/vite and add tailwindcss() to vite.plugins in astro.config.mjs).
2. Save markas.css as ${cssPath} and import it once from your layout: import "../styles/markas.css".
3. Import components from the components folder, for example import Button from "@/components/markas/Button.astro".
4. Components render on the server. Interactive ones ship a small bundled <script> with no framework runtime.
5. Dark mode turns on when <html> has the "dark" class.`;
    case "angular":
      return `## MarkasUI setup for Angular

1. npm install tailwindcss @tailwindcss/postcss postcss, then create .postcssrc.json with { "plugins": { "@tailwindcss/postcss": {} } }.
2. Save markas.css as ${cssPath} and add ${cssImport} to src/styles.css.
3. Components are standalone with signals and no other dependencies. Add them to imports, for example import { Button } from "./markas/button.component".
4. Dark mode turns on when <html> has the "dark" class.`;
  }
}

const defaultCss: Record<Framework, string> = {
  blade: "resources/css/markas.css",
  react: "src/markas.css",
  vue: "src/markas.css",
  svelte: "src/markas.css",
  astro: "src/styles/markas.css",
  angular: "src/markas.css",
};
