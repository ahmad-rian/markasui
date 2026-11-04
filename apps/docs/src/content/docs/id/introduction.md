---
title: Pengenalan
description: Apa itu MarkasUI dan cara memakainya di project Blade, React, atau Vue.
---

MarkasUI adalah library komponen UI gratis dan open source dari CV Jenderal Solusi Digital. Setiap komponen tersedia dalam tiga versi, yaitu Blade (Laravel), React, dan Vue, dengan desain yang sama persis karena memakai class Tailwind CSS yang sama.

## Prinsip

- **Blade didukung penuh.** Versi Blade bukan port sampingan. Interaksi memakai Alpine.js, jadi langsung jalan di Livewire.
- **Tanpa dependensi tambahan.** Komponen inti hanya butuh React, Vue, atau Alpine.js. Tidak ada `clsx`, `tailwind-merge`, atau icon pack.
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

## Bahasa

Teks bawaan komponen, seperti label tombol tutup di Modal, default dalam bahasa Inggris. Setiap label bawaan adalah prop, jadi bisa diterjemahkan, misalnya `close-label="Tutup"` di Blade atau `closeLabel="Tutup"` di React dan Vue.

## Lisensi

MIT. Bebas dipakai untuk project pribadi maupun komersial.
