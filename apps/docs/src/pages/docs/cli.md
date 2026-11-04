---
layout: ../../layouts/DocsMarkdown.astro
title: CLI
description: Tambahkan komponen MarkasUI ke project lewat npx markasui.
---

CLI `markasui` mengambil komponen dari registry dan menulisnya ke project Anda. Tidak perlu dipasang, cukup jalankan lewat `npx`. Project Laravel juga bisa memakainya karena sudah memakai Node lewat Vite.

## init

```bash
npx markasui@latest init
```

- Mendeteksi framework: ada `artisan` berarti Blade, ada `react` di `package.json` berarti React, ada `vue` berarti Vue.
- Membuat `markas.json` berisi framework dan folder tujuan.
- Menyalin `markas.css` ke folder CSS project.

Contoh `markas.json`:

```json
{
  "framework": "blade",
  "componentsDir": "resources/views/components/markas",
  "cssPath": "resources/css/markas.css"
}
```

## add

```bash
npx markasui@latest add button modal
```

Menulis file komponen ke `componentsDir`. CLI tidak pernah menimpa file yang sudah ada tanpa konfirmasi. Gunakan `--overwrite` untuk menimpa tanpa bertanya. Kalau komponen butuh dependensi (misalnya Alpine.js untuk Blade), CLI menampilkan perintah pemasangannya.

## list

```bash
npx markasui@latest list
```

Menampilkan semua komponen per kategori.

## Opsi

| Opsi                              | Keterangan                                   |
| --------------------------------- | -------------------------------------------- |
| `--cwd <path>`                    | Folder project. Default folder saat ini.     |
| `--framework <blade\|react\|vue>` | Lewati deteksi otomatis.                     |
| `--overwrite`                     | Timpa file yang sudah ada tanpa konfirmasi.  |
| `--registry <url>`                | Alamat registry lain, misalnya mirror lokal. |
