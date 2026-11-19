---
title: Instalasi
description: Siapkan Tailwind CSS v4 dan markas.css di Laravel, React, Vue, Svelte, Astro, atau Angular.
seoTitle: "Instalasi komponen Tailwind CSS di Laravel, React, Vue, dan lainnya"
seoDescription: "Siapkan Tailwind CSS v4 dan markas.css di project Laravel, React, Vue, Svelte, Astro, atau Angular, lalu tambahkan komponen MarkasUI lewat CLI atau salin source-nya."
---

Semua komponen MarkasUI membutuhkan dua hal: Tailwind CSS v4 dan file `markas.css` yang berisi token warna.

## Cara cepat dengan CLI

```bash
npx markasui@latest init
```

Perintah ini mendeteksi framework project, membuat `markas.json`, dan menyalin `markas.css`. Setelah itu import `markas.css` dari file CSS utama Anda seperti contoh di bawah.

## Laravel (Blade)

Laravel 11 ke atas sudah memakai Vite. Pasang Tailwind v4 dan Alpine.js:

```bash
npm install tailwindcss @tailwindcss/vite alpinejs
```

Tambahkan plugin di `vite.config.js`:

```js
import tailwindcss from "@tailwindcss/vite";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true,
    }),
    tailwindcss(),
  ],
});
```

Simpan `markas.css` di `resources/css/markas.css`, lalu ganti isi `resources/css/app.css`:

```css
@import "./markas.css";

@source "../views";
```

Jalankan Alpine di `resources/js/app.js`:

```js
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();
```

Kalau memakai Livewire 4 atau 3, lewati langkah Alpine karena Livewire sudah membawa dan menjalankannya. Memuat Alpine dua kali merusak `wire:model`. Lihat [Livewire](/id/docs/livewire) untuk `wire:model`, render ulang, dan `wire:navigate`.

## React (Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ plugins: [react(), tailwindcss()] });
```

Simpan `markas.css` di `src/markas.css` dan import dari `src/main.tsx`:

```ts
import "./markas.css";
```

## Next.js

```bash
npm install tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
```

Simpan `markas.css` di `app/markas.css`, lalu import dari `app/layout.tsx`. Komponen yang memakai state sudah diberi `"use client"`.

## Vue (Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({ plugins: [vue(), tailwindcss()] });
```

Import `./markas.css` dari `src/main.ts`.

## Nuxt

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/markas.css"],
  vite: { plugins: [tailwindcss()] },
});
```

## SvelteKit

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({ plugins: [tailwindcss(), sveltekit()] });
```

Simpan `markas.css` di `src/markas.css`, lalu import dari `src/routes/+layout.svelte` dengan `import "../markas.css";`. Dengan Vite biasa, import dari `src/main.ts`. Komponen memakai rune Svelte 5.

## Astro

```bash
npx astro add tailwind
```

Simpan `markas.css` di `src/styles/markas.css`, lalu import dari layout dengan `import "../styles/markas.css";`. Komponen dirender di server; komponen interaktif membawa `<script>` kecil yang dibundel tanpa runtime framework.

## Angular

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

```jsonc
// .postcssrc.json
{ "plugins": { "@tailwindcss/postcss": {} } }
```

Simpan `markas.css` di `src/markas.css`, lalu tambahkan `@import "./markas.css";` ke `src/styles.css`. Komponen bersifat standalone dengan signal: tambahkan ke `imports` komponen yang memakainya.

## Mode gelap

Token gelap aktif saat elemen induk punya class `dark`. Pasang class itu di `<html>`:

```js
document.documentElement.classList.toggle("dark", true);
```
