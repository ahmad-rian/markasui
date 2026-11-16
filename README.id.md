# MarkasUI

[English](README.md) · Bahasa Indonesia

[![CI](https://github.com/ahmad-rian/markasui/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmad-rian/markasui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/markasui?label=markasui)](https://www.npmjs.com/package/markasui)
[![Lisensi: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Komponen UI Tailwind CSS v4 untuk Laravel Blade, React, Vue, Svelte, Astro, dan Angular**, gratis dan open source. Setiap komponen punya class, varian, dan tampilan yang sama di keenam framework. CLI menyalin source-nya ke project Anda, jadi kodenya milik Anda dan tidak ada tambahan di runtime.

**Docs dan preview langsung:** https://markasui.pages.dev/id

## Framework

| Framework     | Dibuat dengan                                    | Panduan                                                              |
| ------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| Laravel Blade | Anonymous Blade component + Alpine.js (Livewire) | [Komponen Blade](https://markasui.pages.dev/id/frameworks/blade)     |
| React         | React 19, ramah Server Component                 | [Komponen React](https://markasui.pages.dev/id/frameworks/react)     |
| Vue           | Vue 3 `<script setup>`, Vite dan Nuxt            | [Komponen Vue](https://markasui.pages.dev/id/frameworks/vue)         |
| Svelte        | Svelte 5 runes, SvelteKit dan Vite               | [Komponen Svelte](https://markasui.pages.dev/id/frameworks/svelte)   |
| Astro         | Dirender di server, script vanilla kecil         | [Komponen Astro](https://markasui.pages.dev/id/frameworks/astro)     |
| Angular       | Standalone component dengan signals              | [Komponen Angular](https://markasui.pages.dev/id/frameworks/angular) |

## Kenapa MarkasUI

- **Tampilan sama di setiap framework.** Uji kesamaan tampilan otomatis membandingkan setiap framework dengan React.
- **Blade didukung penuh.** Interaksi memakai Alpine.js, jadi langsung jalan di Livewire.
- **Ringan.** Tanpa `clsx`, `tailwind-merge`, atau icon pack. JS tiap komponen React/Vue di bawah 3 KB gzip.
- **Elemen native dulu.** `<dialog>`, Popover API, `<details>`.
- **Aksesibel.** Diuji terhadap WCAG 2.2 AA dengan axe dan cek keyboard di CI.
- **Satu file tema.** Warna terang dan gelap berasal dari token di `markas.css`.
- **Siap untuk agent AI.** Registry JSON, Copy prompt, `llms.txt`, Agent Skill, dan MCP server.

## Mulai

```bash
npx markasui@latest init
npx markasui@latest add button modal
```

`init` mendeteksi Laravel, Next.js, Vite, Nuxt, SvelteKit, Astro, atau Angular, menyimpan `markas.css`, dan menulis `markas.json`. `add` menulis setiap komponen ke folder komponen Anda. Ingin menyalin manual? Setiap halaman komponen menampilkan source-nya. Panduan lengkap: [Instalasi](https://markasui.pages.dev/id/docs/installation).

Lihat [komponen](https://markasui.pages.dev/id/components), [template dashboard](https://markasui.pages.dev/id/templates), dan [landing page](https://markasui.pages.dev/id/pages).

### Untuk agent AI

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

MCP server jalan di Claude Code, Cursor, dan VS Code ([setup](https://markasui.pages.dev/id/docs/mcp)). Agent Skill ada di [`skills/markasui`](skills/markasui/SKILL.md), dan ringkasan seluruh library ada di [llms.txt](https://markasui.pages.dev/id/llms.txt).

## Paket

| Paket                              | Keterangan                                     |
| ---------------------------------- | ---------------------------------------------- |
| [`markasui`](packages/cli)         | CLI: `init`, `add`, dan `list`                 |
| [`@markasui/mcp`](packages/mcp)    | MCP server untuk agent AI                      |
| [`packages/theme`](packages/theme) | Token warna `markas.css` untuk Tailwind CSS v4 |

## Struktur repo

```
apps/docs/          website docs (Astro), Inggris di / dan Indonesia di /id
components/<nama>/  sumber tunggal tiap komponen: Blade, React, Vue, Svelte, Astro, Angular, meta.json, usage.md
examples/           contoh identik per framework, dipakai playground, tes, dan preview docs
templates/<slug>/   template halaman penuh yang disusun dari komponen
packages/theme/     markas.css (token warna)
packages/registry/  build registry JSON dengan validasi Zod
packages/cli/       paket npm "markasui"
packages/mcp/       paket npm "@markasui/mcp"
skills/markasui/    Agent Skill
playground/         halaman uji Vite untuk setiap framework
```

## Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md). Laporan bug dan ide lewat [GitHub issues](https://github.com/ahmad-rian/markasui/issues).

## Lisensi

[MIT](LICENSE). Dibuat oleh CV Jenderal Solusi Digital, Purwokerto.
