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

- pnpm dev: jalankan website docs (http://localhost:4321)
- pnpm build: build website docs + registry + preview Blade + indeks Pagefind
- pnpm playground: halaman uji komponen (Blade, React, Vue) di http://localhost:5173
- pnpm test: Vitest (React, Vue, render Blade, registry)
- pnpm test:e2e: Playwright komponen (kesamaan tampilan, axe, keyboard)
- pnpm test:docs: Playwright website (butuh pnpm build dulu)
- pnpm typecheck: vue-tsc + astro check
- pnpm registry: build registry ke apps/docs/public/r
- pnpm thumbs: thumbnail WebP untuk /components
- pnpm size: cek budget ukuran (butuh pnpm build dulu)

## Sebelum menyatakan selesai

Jalankan pnpm lint, pnpm typecheck, pnpm test, pnpm test:e2e, pnpm build, pnpm test:docs, dan pnpm size. Semua harus lolos.

## Pola komponen (ditetapkan di Fase 1)

- Semua string class disimpan di konstanta (`$base`, `base`, dst.), bukan langsung di template, supaya Prettier tidak menyortir satu versi saja.
- Atribut dan class dari user jatuh ke elemen utama (input untuk Input, dialog untuk Modal).
- Id dibuat otomatis kalau kosong: `Str::random` di Blade, `useId` di React dan Vue.
- Setiap komponen baru wajib punya fixture identik di examples/{blade,react,vue}/ (dipakai playground dan preview docs, tanpa id eksplisit) dan masuk daftar `components` di tests/e2e/helpers.ts.
- Blade: ambil named slot dinamis lewat `$__laravel_slots[$key]`, jangan `${$key}` (bisa bentrok dengan variabel lokal template).
- React: `useId` aman di Server Component. `"use client"` hanya untuk komponen dengan state, ref, atau event handler.
- Vue: atribut native (`type`, `aria-*`) lewat fallthrough tidak dicek vue-tsc, beda dengan React yang memperluas `ComponentProps`. Uji perilaku atribut penting di tests/unit.
- Renderer Blade: `php scripts/render-blade.php <folder-sumber> <folder-output>`.
