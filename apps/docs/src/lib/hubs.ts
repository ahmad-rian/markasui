import type { Framework } from "@markasui/registry/schema";
import type { ShikiFrameworkLang } from "./frameworks";
import type { Locale } from "./i18n";

/**
 * Isi halaman /frameworks/<fw>: judul, intro, dan contoh pemakaian khusus per framework.
 * Teks umum (judul section, label) ada di i18n.ts bagian hub.
 */
type HubCopy = {
  /** Judul h1 sekaligus title halaman. */
  heading: string;
  description: (count: number) => string;
  intro: string;
  points: string[];
};

type Hub = {
  /** Folder tujuan CLI di project user. */
  target: string;
  usage: { lang: ShikiFrameworkLang; code: string };
  copy: Record<Locale, HubCopy>;
};

export const HUBS: Record<Framework, Hub> = {
  blade: {
    target: "resources/views/components/markas",
    usage: {
      lang: "blade",
      code: `<x-markas.button variant="secondary">Cancel</x-markas.button>
<x-markas.input name="email" type="email" label="Email" />`,
    },
    copy: {
      en: {
        heading: "Laravel Blade components built with Tailwind CSS",
        description: (n) =>
          `${n} free Blade components for Laravel on Tailwind CSS v4 and Alpine.js. Works with Livewire 3. Add them with one CLI command and own the code.`,
        intro:
          "MarkasUI components for Laravel are anonymous Blade components you use as <x-markas.button>. Interactive parts such as modals, dropdowns, and tabs run on Alpine.js, so they also work inside Livewire 3 pages without extra setup.",
        points: [
          "The CLI detects Laravel and writes files to resources/views/components/markas, with markas.css in resources/css.",
          "Attributes and classes you pass land on the main element, and ids are generated with Str::random when you leave them out.",
          "Alpine.js is the only runtime. Skip starting it yourself if Livewire 3 already does.",
        ],
      },
      id: {
        heading: "Komponen Laravel Blade dengan Tailwind CSS",
        description: (n) =>
          `${n} komponen Blade gratis untuk Laravel di atas Tailwind CSS v4 dan Alpine.js. Jalan di Livewire 3. Pasang dengan satu perintah CLI, kodenya milik Anda.`,
        intro:
          "Komponen MarkasUI untuk Laravel adalah anonymous Blade component yang dipakai sebagai <x-markas.button>. Bagian interaktif seperti modal, dropdown, dan tab memakai Alpine.js, jadi tetap jalan di halaman Livewire 3 tanpa setup tambahan.",
        points: [
          "CLI mendeteksi Laravel lalu menulis file ke resources/views/components/markas, dengan markas.css di resources/css.",
          "Atribut dan class yang Anda berikan jatuh ke elemen utama, dan id dibuat dengan Str::random kalau dikosongkan.",
          "Alpine.js satu-satunya runtime. Tidak perlu menjalankannya sendiri kalau Livewire 3 sudah melakukannya.",
        ],
      },
    },
  },
  react: {
    target: "src/components/markas",
    usage: {
      lang: "tsx",
      code: `import { Button } from "@/components/markas/Button";

export default function Actions() {
  return <Button variant="secondary">Cancel</Button>;
}`,
    },
    copy: {
      en: {
        heading: "React UI components built with Tailwind CSS",
        description: (n) =>
          `${n} free React 19 components on Tailwind CSS v4, ready for Next.js and Vite. Server Component friendly, no runtime packages beyond React.`,
        intro:
          'MarkasUI ships React components as plain .tsx files that the CLI copies into your project. Components without state render as React Server Components; only the interactive ones add "use client", and only where they need state, refs, or event handlers.',
        points: [
          "The CLI detects Next.js or Vite and writes files to src/components/markas (components/markas in a Next.js app without src).",
          "Props extend the native element props, so type, aria-*, and className pass straight through. Ids come from useId.",
          "No clsx, tailwind-merge, or icon pack. Each component stays under 3 KB of gzipped JS.",
        ],
      },
      id: {
        heading: "Komponen UI React dengan Tailwind CSS",
        description: (n) =>
          `${n} komponen React 19 gratis di atas Tailwind CSS v4, siap untuk Next.js dan Vite. Ramah Server Component, tanpa paket runtime selain React.`,
        intro:
          'MarkasUI mengirim komponen React sebagai file .tsx biasa yang disalin CLI ke project Anda. Komponen tanpa state dirender sebagai React Server Component; hanya komponen interaktif yang memakai "use client", dan hanya saat butuh state, ref, atau event handler.',
        points: [
          "CLI mendeteksi Next.js atau Vite lalu menulis file ke src/components/markas (components/markas untuk app Next.js tanpa src).",
          "Props memperluas props elemen native, jadi type, aria-*, dan className diteruskan langsung. Id dibuat dengan useId.",
          "Tanpa clsx, tailwind-merge, atau paket ikon. Setiap komponen di bawah 3 KB JS setelah gzip.",
        ],
      },
    },
  },
  vue: {
    target: "src/components/markas",
    usage: {
      lang: "vue",
      code: `<script setup lang="ts">
import Button from "@/components/markas/Button.vue";
</script>

<template>
  <Button variant="secondary">Cancel</Button>
</template>`,
    },
    copy: {
      en: {
        heading: "Vue 3 UI components built with Tailwind CSS",
        description: (n) =>
          `${n} free Vue 3 components on Tailwind CSS v4 for Vite and Nuxt. Typed props, v-model support, and no runtime packages beyond Vue.`,
        intro:
          "MarkasUI components for Vue are single-file components written with <script setup> and TypeScript. They use v-model for two-way values, useId for stable ids, and the same Tailwind classes as every other framework.",
        points: [
          "The CLI detects Vite or Nuxt and writes files to src/components/markas (components/markas on Nuxt).",
          "Native attributes such as type and aria-* fall through to the main element, so forms and labels behave as in plain HTML.",
          "No dependencies beyond Vue. Each component stays under 3 KB of gzipped JS.",
        ],
      },
      id: {
        heading: "Komponen UI Vue 3 dengan Tailwind CSS",
        description: (n) =>
          `${n} komponen Vue 3 gratis di atas Tailwind CSS v4 untuk Vite dan Nuxt. Props bertipe, dukungan v-model, tanpa paket runtime selain Vue.`,
        intro:
          "Komponen MarkasUI untuk Vue adalah single-file component dengan <script setup> dan TypeScript. Komponen memakai v-model untuk nilai dua arah, useId untuk id yang stabil, dan class Tailwind yang sama dengan framework lain.",
        points: [
          "CLI mendeteksi Vite atau Nuxt lalu menulis file ke src/components/markas (components/markas di Nuxt).",
          "Atribut native seperti type dan aria-* diteruskan ke elemen utama, jadi form dan label berperilaku seperti HTML biasa.",
          "Tanpa dependensi selain Vue. Setiap komponen di bawah 3 KB JS setelah gzip.",
        ],
      },
    },
  },
  svelte: {
    target: "src/lib/components/markas",
    usage: {
      lang: "svelte",
      code: `<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
</script>

<Button variant="secondary">Cancel</Button>`,
    },
    copy: {
      en: {
        heading: "Svelte 5 UI components built with Tailwind CSS",
        description: (n) =>
          `${n} free Svelte 5 components on Tailwind CSS v4 for SvelteKit and Vite. Written with runes and snippets, no dependencies beyond Svelte.`,
        intro:
          "MarkasUI components for Svelte are written for Svelte 5 with runes: $props for inputs, $bindable for two-way values, $props.id() for ids, and snippets where other frameworks use slots.",
        points: [
          "The CLI detects SvelteKit or Vite and writes files to src/lib/components/markas.",
          "Bind values with bind:value or bind:checked, the same way you would with native inputs.",
          "No dependencies beyond Svelte, and the markup and classes match the React and Vue versions exactly.",
        ],
      },
      id: {
        heading: "Komponen UI Svelte 5 dengan Tailwind CSS",
        description: (n) =>
          `${n} komponen Svelte 5 gratis di atas Tailwind CSS v4 untuk SvelteKit dan Vite. Ditulis dengan runes dan snippet, tanpa dependensi selain Svelte.`,
        intro:
          "Komponen MarkasUI untuk Svelte ditulis untuk Svelte 5 dengan runes: $props untuk input, $bindable untuk nilai dua arah, $props.id() untuk id, dan snippet sebagai pengganti slot.",
        points: [
          "CLI mendeteksi SvelteKit atau Vite lalu menulis file ke src/lib/components/markas.",
          "Ikat nilai dengan bind:value atau bind:checked, sama seperti input native.",
          "Tanpa dependensi selain Svelte, dan markup serta class-nya sama persis dengan versi React dan Vue.",
        ],
      },
    },
  },
  astro: {
    target: "src/components/markas",
    usage: {
      lang: "astro",
      code: `---
import Button from "@/components/markas/Button.astro";
---

<Button variant="secondary">Cancel</Button>`,
    },
    copy: {
      en: {
        heading: "Astro components built with Tailwind CSS",
        description: (n) =>
          `${n} free Astro components on Tailwind CSS v4. Rendered on the server, with small vanilla scripts for interactivity and no framework runtime.`,
        intro:
          "MarkasUI components for Astro are .astro files rendered on the server. Interactive ones ship one small vanilla <script> that Astro bundles once per page, so a modal or tabs need no React, Vue, or Svelte runtime on the client.",
        points: [
          "The CLI detects Astro and writes files to src/components/markas, with markas.css in src/styles.",
          "Scripts use event delegation and custom elements, so they keep working after view transitions.",
          "Islands are optional: mix MarkasUI Astro components with the React, Vue, or Svelte versions in the same project.",
        ],
      },
      id: {
        heading: "Komponen Astro dengan Tailwind CSS",
        description: (n) =>
          `${n} komponen Astro gratis di atas Tailwind CSS v4. Dirender di server, dengan script vanilla kecil untuk interaksi dan tanpa runtime framework.`,
        intro:
          "Komponen MarkasUI untuk Astro adalah file .astro yang dirender di server. Komponen interaktif membawa satu <script> vanilla kecil yang dibundel Astro sekali per halaman, jadi modal atau tab tidak butuh runtime React, Vue, atau Svelte di browser.",
        points: [
          "CLI mendeteksi Astro lalu menulis file ke src/components/markas, dengan markas.css di src/styles.",
          "Script memakai event delegation dan custom element, jadi tetap jalan setelah view transition.",
          "Island tetap opsional: campur komponen Astro MarkasUI dengan versi React, Vue, atau Svelte di project yang sama.",
        ],
      },
    },
  },
  angular: {
    target: "src/app/markas",
    usage: {
      lang: "angular-ts",
      code: `import { Component } from "@angular/core";
import { Button } from "./markas/button.component";

@Component({
  selector: "app-actions",
  imports: [Button],
  template: \`<button markas-button variant="secondary">Cancel</button>\`,
})
export class Actions {}`,
    },
    copy: {
      en: {
        heading: "Angular UI components built with Tailwind CSS",
        description: (n) =>
          `${n} free standalone Angular components on Tailwind CSS v4, built with signals. No NgModule and no dependencies beyond @angular/*.`,
        intro:
          "MarkasUI components for Angular are standalone components built on signals. Add one to a component's imports and use its markas-* selector; boolean inputs accept plain attributes, so <markas-switch checked> works as expected.",
        points: [
          "The CLI detects Angular and writes files to src/app/markas. Tailwind CSS v4 runs through PostCSS.",
          "Templates compile under strict template checking, and host attributes move to the native element inside.",
          "No dependencies beyond @angular/*. Each component stays under 4 KB of gzipped JS, runtime excluded.",
        ],
      },
      id: {
        heading: "Komponen UI Angular dengan Tailwind CSS",
        description: (n) =>
          `${n} komponen Angular standalone gratis di atas Tailwind CSS v4, dibuat dengan signals. Tanpa NgModule dan tanpa dependensi selain @angular/*.`,
        intro:
          "Komponen MarkasUI untuk Angular adalah standalone component berbasis signals. Tambahkan ke imports sebuah komponen lalu pakai selector markas-*; input boolean menerima atribut biasa, jadi <markas-switch checked> langsung jalan.",
        points: [
          "CLI mendeteksi Angular lalu menulis file ke src/app/markas. Tailwind CSS v4 dijalankan lewat PostCSS.",
          "Template dikompilasi dengan strict template checking, dan atribut host dipindah ke elemen native di dalamnya.",
          "Tanpa dependensi selain @angular/*. Setiap komponen di bawah 4 KB JS setelah gzip, tanpa runtime.",
        ],
      },
    },
  },
};
