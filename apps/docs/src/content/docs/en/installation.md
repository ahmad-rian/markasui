---
title: Installation
description: Set up Tailwind CSS v4 and markas.css in Laravel, React, or Vue.
seoTitle: "Install Tailwind CSS components in Laravel, React and Vue"
seoDescription: "Set up Tailwind CSS v4 and markas.css in a Laravel, React, or Vue project, then add MarkasUI components with the CLI or by copying the source."
---

Every MarkasUI component needs two things: Tailwind CSS v4 and the `markas.css` file with the color tokens.

## Quick start with the CLI

```bash
npx markasui@latest init
```

This detects your framework, creates `markas.json`, and copies `markas.css`. Then import `markas.css` from your main CSS file as shown below.

## Laravel (Blade)

Laravel 11 and later already use Vite. Install Tailwind v4 and Alpine.js:

```bash
npm install tailwindcss @tailwindcss/vite alpinejs
```

Add the plugin in `vite.config.js`:

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

Save `markas.css` as `resources/css/markas.css`, then replace the contents of `resources/css/app.css`:

```css
@import "./markas.css";

@source "../views";
```

Start Alpine in `resources/js/app.js`:

```js
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();
```

Skip the Alpine step if you use Livewire 4 or 3, which already ships and starts Alpine. Loading it twice breaks `wire:model`. See [Livewire](/docs/livewire) for `wire:model`, re-renders, and `wire:navigate`.

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

Save `markas.css` as `src/markas.css` and import it from `src/main.tsx`:

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

Save `markas.css` as `app/markas.css` and import it from `app/layout.tsx`. Components that hold state already include `"use client"`.

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

Import `./markas.css` from `src/main.ts`.

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

## Dark mode

Dark tokens apply when an ancestor has the `dark` class. Put it on `<html>`:

```js
document.documentElement.classList.toggle("dark", true);
```
