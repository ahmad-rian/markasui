# MarkasUI

Library komponen UI open source untuk Blade, React, dan Vue. Spesifikasi lengkap ada di docs/PRD.md. Keputusan yang mengubah PRD: bahasa default Inggris, desain situs mengikuti panduan unslop (tanpa label kapital mono dan serif miring). Pengecualian atas permintaan user: landing page memakai hero gelap berkaca beralur dan satu kata aksen serif miring (Instrument Serif) di judul section; CSS-nya di apps/docs/src/styles/landing.css.

## Aturan wajib

- Setiap komponen ditulis di components/<nama>/ dalam tiga versi dengan class Tailwind dan nama varian yang identik.
- Warna hanya dari token markas.css. Dilarang hex atau warna bawaan Tailwind di komponen.
- Komponen inti tanpa dependensi selain React, Vue, atau Alpine.js.
- Pakai elemen native dulu: dialog, Popover API, details.
- Jangan menambah package npm tanpa bertanya.
- Bahasa: Inggris default (komponen, registry, CLI, MCP, situs di /). Indonesia lewat i18n.id di meta.json, usage.id.md, content/docs/id, dan /id. Jangan pakai em dash.
- Setiap teks bawaan komponen (aria-label, teks default) adalah prop `<tujuan>Label` dengan default Inggris yang sama di Blade, React, dan Vue.

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
- Variasi contoh: `examples/<fw>/<nama>--<variasi>.*` (otomatis masuk tes e2e dan galeri docs), judulnya di `apps/docs/src/lib/variants/<nama>.ts`.
- CSS docs dipecah per halaman (budget 30 KB per halaman): global.css hanya CSS situs; class komponen dibangkitkan per komponen oleh `apps/docs/scripts/page-css.ts`, landing memakai daftar di `apps/docs/src/lib/landing.ts`, demo template memakai `src/generated/css/templates/<slug>.css` (templates.css + template itu + komponennya). Halaman baru wajib mengimpor CSS-nya sendiri (Base tidak mengimpor CSS).
- Kontrol props di docs: `apps/docs/src/lib/playgrounds.ts`. Kombinasi Blade dirender saat build oleh `apps/docs/scripts/playgrounds.ts`.
- Vue: nama template ref jangan sama dengan konstanta class (`ref="panelRef"` untuk `const panel = "..."`), atau Vue memberi peringatan.

## Template

- `templates/<slug>/` berisi meta.json (`"kind": "page"` untuk welcome page di /pages, default dashboard di /templates), `blade/<slug>.blade.php`, `react/<Pascal>.tsx`, `vue/<Pascal>.vue`, disusun dari komponen MarkasUI.
- Ketiga versi harus identik secara visual (uji di `tests/e2e/template-<slug>.spec.ts`) dan semua interaksinya jalan.
- Blade dirender oleh `scripts/render-templates.ts`. Halaman docs: /templates, /templates/<slug>, /demo/templates/<slug>/<fw>.
