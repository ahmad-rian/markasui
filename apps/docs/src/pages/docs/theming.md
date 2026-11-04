---
layout: ../../layouts/DocsMarkdown.astro
title: Theming
description: Daftar token warna MarkasUI dan cara mengganti warna brand.
---

Semua warna komponen berasal dari variabel CSS `--markas-*` di `markas.css`. Komponen tidak pernah memakai hex atau warna bawaan Tailwind seperti `bg-green-700`, jadi mengganti tema cukup dengan mengubah variabel.

## Mengganti warna brand

Timpa variabel setelah `markas.css` di-import:

```css
@import "./markas.css";

:root {
  --markas-primary: #1d4ed8;
  --markas-primary-strong: #1e40af;
  --markas-primary-soft: #e0e7ff;
  --markas-primary-line: #a5b4fc;
}

.dark {
  --markas-primary: #818cf8;
  --markas-primary-strong: #a5b4fc;
  --markas-primary-soft: #1e1b4b;
  --markas-primary-line: #3730a3;
}
```

Pastikan pasangan teks dan latar tetap lolos kontras WCAG AA (4.5:1).

## Daftar token

| Token            | Class Tailwind        | Dipakai untuk                 |
| ---------------- | --------------------- | ----------------------------- |
| `canvas`         | `bg-canvas`           | Latar halaman                 |
| `surface`        | `bg-surface`          | Kartu, kotak preview, input   |
| `subtle`         | `bg-subtle`           | Hover, latar kode, item aktif |
| `line`           | `border-line`         | Border dan garis pemisah      |
| `ink`            | `text-ink`            | Teks utama                    |
| `muted`          | `text-muted`          | Teks sekunder                 |
| `faint`          | `text-faint`          | Label mono, placeholder       |
| `primary`        | `bg-primary`          | Tombol utama, link, fokus     |
| `primary-strong` | `bg-primary-strong`   | Hover tombol utama            |
| `on-primary`     | `text-on-primary`     | Teks di atas primary          |
| `primary-soft`   | `bg-primary-soft`     | Latar badge dan highlight     |
| `primary-line`   | `border-primary-line` | Border badge                  |
| `success`        | `bg-success`          | Status berhasil               |
| `warning`        | `bg-warning`          | Peringatan                    |
| `danger`         | `bg-danger`           | Error dan aksi hapus          |

Nilai light dan dark setiap token juga tersedia di registry: [`/r/theme.json`](/r/theme.json).

## Bayangan

Elemen yang melayang (Dropdown Menu, Tooltip, Toast, Modal, Drawer) memakai satu token `shadow-overlay`. Ganti lewat `--shadow-overlay` di `@theme` kalau perlu.

## Radius dan font

Komponen memakai radius bawaan Tailwind (`rounded-md` 6px, `rounded-lg` 8px, `rounded-xl` 12px) dan tidak memuat font apa pun. Teks mengikuti font project Anda.
