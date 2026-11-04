import type { Framework } from "./types.ts";

/** Langkah setup Tailwind v4 + markas.css. Satu sumber untuk `markasui init` dan MCP get_setup. */
export function setupGuide(
  framework: Framework,
  cssPath = defaultCss[framework],
): string {
  const cssImport = `@import "./${cssPath.split("/").at(-1)}";`;
  switch (framework) {
    case "blade":
      return `## Setup MarkasUI untuk Laravel (Blade)

1. Pasang Tailwind CSS v4 dan Alpine.js:
   npm install tailwindcss @tailwindcss/vite alpinejs
2. Tambahkan plugin di vite.config.js:
   import tailwindcss from "@tailwindcss/vite";
   plugins: [laravel({ input: ["resources/css/app.css", "resources/js/app.js"], refresh: true }), tailwindcss()]
3. Simpan markas.css di ${cssPath}, lalu isi resources/css/app.css:
   ${cssImport}
   @source "../views";
4. Jalankan Alpine di resources/js/app.js (lewati kalau memakai Livewire 3):
   import Alpine from "alpinejs"; window.Alpine = Alpine; Alpine.start();
5. Komponen dipakai sebagai <x-markas.button>, file di resources/views/components/markas/.`;
    case "react":
      return `## Setup MarkasUI untuk React (Vite atau Next.js)

1. Vite: npm install tailwindcss @tailwindcss/vite, lalu tambahkan tailwindcss() ke plugins di vite.config.ts.
   Next.js: npm install tailwindcss @tailwindcss/postcss, lalu postcss.config.mjs berisi { plugins: { "@tailwindcss/postcss": {} } }.
2. Simpan markas.css di ${cssPath} dan import sekali dari entry (src/main.tsx atau app/layout.tsx).
3. Komponen di-import dari folder komponen, misalnya import { Button } from "@/components/markas/Button".
4. Mode gelap aktif saat <html> punya class "dark".`;
    case "vue":
      return `## Setup MarkasUI untuk Vue (Vite atau Nuxt)

1. npm install tailwindcss @tailwindcss/vite, lalu tambahkan tailwindcss() ke plugins di vite.config.ts
   (Nuxt: vite: { plugins: [tailwindcss()] } dan css: ["~/${cssPath}"] di nuxt.config.ts).
2. Simpan markas.css di ${cssPath} dan import sekali dari src/main.ts (Vite).
3. Komponen di-import dari folder komponen, misalnya import Button from "@/components/markas/Button.vue".
4. Mode gelap aktif saat <html> punya class "dark".`;
  }
}

const defaultCss: Record<Framework, string> = {
  blade: "resources/css/markas.css",
  react: "src/markas.css",
  vue: "src/markas.css",
};
