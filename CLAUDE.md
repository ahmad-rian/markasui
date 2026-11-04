# MarkasUI

Library komponen UI open source untuk Blade, React, dan Vue. Spesifikasi lengkap ada di docs/PRD.md.

## Aturan wajib

- Setiap komponen ditulis di components/<nama>/ dalam tiga versi dengan class Tailwind dan nama varian yang identik.
- Warna hanya dari token markas.css. Dilarang hex atau warna bawaan Tailwind di komponen.
- Komponen inti tanpa dependensi selain React, Vue, atau Alpine.js.
- Pakai elemen native dulu: dialog, Popover API, details.
- Jangan menambah package npm tanpa bertanya.
- Teks UI dan docs dalam Bahasa Indonesia. Jangan pakai em dash.

## Perintah

- pnpm dev: jalankan website docs
- pnpm test: Vitest
- pnpm test:e2e: Playwright (kesamaan tampilan dan axe)
- pnpm registry: build registry
- pnpm size: cek budget ukuran

## Sebelum menyatakan selesai

Jalankan pnpm lint, pnpm test, pnpm test:e2e, dan pnpm size. Semua harus lolos.
