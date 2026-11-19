---
title: Pengenalan
description: Apa itu MarkasUI dan cara memakainya di project Blade, React, Vue, Svelte, Astro, atau Angular.
seoTitle: "Pengenalan MarkasUI, library komponen Tailwind"
seoDescription: "MarkasUI adalah library komponen Tailwind CSS v4 gratis dan open source untuk Laravel Blade, React, Vue, Svelte, Astro, dan Angular."
---

MarkasUI adalah library komponen UI gratis dan open source dari CV Jenderal Solusi Digital. Setiap komponen dan template tersedia untuk enam framework: Blade (Laravel), React, Vue, Svelte, Astro, dan Angular. Tampilan setiap versi sama persis karena memakai class Tailwind CSS yang sama.

## Prinsip

- **Blade didukung penuh.** Versi Blade bukan port sampingan. Interaksi memakai Alpine.js, jadi langsung jalan di Livewire.
- **Tanpa dependensi tambahan.** Komponen inti hanya bergantung pada framework-nya sendiri: React, Vue, Svelte 5, atau Angular. Komponen Astro dirender di server dengan script vanilla kecil, dan Blade memakai Alpine.js. Tidak ada `clsx`, `tailwind-merge`, atau icon pack.
- **Elemen native dulu.** Modal memakai `<dialog>`, accordion memakai `<details>`, dropdown dan tooltip memakai Popover API.
- **Kode milik Anda.** Komponen disalin ke project Anda, bukan dipasang sebagai package. Ubah sesuka hati.
- **Siap untuk AI.** Registry JSON, Copy Prompt, `llms.txt`, Agent Skill, dan MCP server membantu agent seperti Claude Code dan Cursor memakai komponen dengan benar.

## Cara memakai

1. Pasang Tailwind CSS v4 dan `markas.css`. Ikuti [Instalasi](/id/docs/installation).
2. Pilih framework di sidebar. Pilihan ini berlaku di seluruh situs.
3. Buka halaman komponen, lalu salin kode atau jalankan perintah CLI:

```bash
npx markasui@latest add button
```

## Struktur file

| Framework | Lokasi default                       | Cara pakai           |
| --------- | ------------------------------------ | -------------------- |
| Blade     | `resources/views/components/markas/` | `<x-markas.button>`  |
| React     | `src/components/markas/`             | `import { Button }`  |
| Vue       | `src/components/markas/`             | `import Button from` |
| Svelte    | `src/lib/components/markas/`         | `import Button from` |
| Astro     | `src/components/markas/`             | `import Button from` |
| Angular   | `src/app/markas/`                    | `import { Button }`  |

## Bahasa

Teks bawaan komponen, seperti label tombol tutup di Modal, default dalam bahasa Inggris. Setiap label bawaan adalah prop, jadi bisa diterjemahkan, misalnya `close-label="Tutup"` di Blade atau `closeLabel="Tutup"` di framework lainnya.

## Lisensi

MIT. Bebas dipakai untuk project pribadi maupun komersial.
