# MarkasUI

Library komponen UI open source untuk Blade, React, Vue, Svelte, Astro, dan Angular. Spesifikasi lengkap ada di docs/PRD.md. Keputusan yang mengubah PRD: bahasa default Inggris, desain situs mengikuti panduan unslop (tanpa label kapital mono dan serif miring). Pengecualian atas permintaan user: landing page memakai hero gelap berkaca beralur dan satu kata aksen serif miring (Instrument Serif) di judul section; CSS-nya di apps/docs/src/styles/landing.css. Pengecualian kedua: halaman /support (beserta thanks dan cancel) memakai ilustrasi garis tangan dua warna (hijau brand di atas krem), judul poster tebal kapital dengan satu kata Instrument Serif miring, dan pita hijau bergambar stiker; CSS-nya di apps/docs/src/styles/support.css, gambarnya di apps/docs/src/components/support/SupportArt.astro.

## Aturan wajib

- Setiap komponen ditulis di components/<nama>/ dengan class Tailwind dan nama varian yang identik di semua versi. Blade, React, Vue wajib; Svelte (`<Pascal>.svelte`), Astro (`<Pascal>.astro`), Angular (`<nama>.component.ts`) di-porting bertahap dan didaftarkan di meta.json saat siap. Panduan porting: .cache/frameworks-brief.md.
- Warna hanya dari token markas.css. Dilarang hex atau warna bawaan Tailwind di komponen.
- Komponen inti tanpa dependensi selain framework-nya sendiri (React, Vue, Svelte 5, @angular/*) atau Alpine.js (Blade). Astro: render server + `<script>` vanilla kecil.
- Pakai elemen native dulu: dialog, Popover API, details.
- Jangan menambah package npm tanpa bertanya.
- Bahasa: Inggris default (komponen, registry, CLI, MCP, situs di /). Indonesia lewat i18n.id di meta.json, usage.id.md, content/docs/id, dan /id. Jangan pakai em dash.
- Setiap teks bawaan komponen (aria-label, teks default) adalah prop `<tujuan>Label` dengan default Inggris yang sama di semua framework.

## Perintah

- pnpm dev: jalankan website docs (http://localhost:4321)
- pnpm build: build website docs + registry + preview Blade + indeks Pagefind
- pnpm playground: halaman uji komponen (/blade.html, /react.html, /vue.html, /svelte.html, /astro.html, /angular.html ?c=<nama>&theme=) di http://localhost:5173
- pnpm astro:playground: render examples/astro ke playground/public/astro (`node scripts/render-astro.ts playground/public/astro <nama...>` untuk sebagian)
- pnpm test: Vitest per proyek (unit React/Vue/registry, svelte, angular, astro), dipilih dari akhiran file `*.svelte.test.ts`, `*.angular.test.ts`, `*.astro.test.ts`
- pnpm test:e2e: Playwright komponen (kesamaan tampilan, axe, keyboard)
- pnpm test:docs: Playwright website (butuh pnpm build dulu)
- pnpm test:livewire: komponen Blade di app Laravel + Livewire sementara di folder tmp (`LIVEWIRE=3` atau `4`, default 4; butuh PHP dan Composer): morph, state terbuka, wire:model, wire:navigate, island
- pnpm typecheck: vue-tsc + svelte-check + ngc (template Angular strict) + astro check (termasuk components/*.astro)
- pnpm registry: build registry ke apps/docs/public/r
- pnpm thumbs: thumbnail WebP untuk /components
- pnpm size: cek budget ukuran (butuh pnpm build dulu)
- pnpm deploy:site: build untuk https://markas.jenderalcorp.com lalu rsync ke server (host SSH `tencent`, nginx statis di /var/www/markasui, config /etc/nginx/sites-available/markas.jenderalcorp.com, sertifikat certbot)

## Sebelum menyatakan selesai

Jalankan pnpm lint, pnpm typecheck, pnpm test, pnpm test:e2e, pnpm build, pnpm test:docs, dan pnpm size. Semua harus lolos.

## Pola komponen (ditetapkan di Fase 1)

- Semua string class disimpan di konstanta (`$base`, `base`, dst.), bukan langsung di template, supaya Prettier tidak menyortir satu versi saja.
- Atribut dan class dari user jatuh ke elemen utama (input untuk Input, dialog untuk Modal).
- Id dibuat otomatis kalau kosong: `Str::random` di Blade, `useId` di React dan Vue.
- Setiap komponen baru wajib punya fixture identik di examples/{blade,react,vue}/ (dan examples/{svelte,astro,angular}/ untuk framework yang sudah di-porting; contoh Angular `<nama>.ts` berisi default export class) (dipakai playground dan preview docs, tanpa id eksplisit) dan masuk daftar `components` di tests/e2e/helpers.ts.
- Blade: ambil named slot dinamis lewat `$__laravel_slots[$key]`, jangan `${$key}` (bisa bentrok dengan variabel lokal template).
- React: `useId` aman di Server Component. `"use client"` hanya untuk komponen dengan state, ref, atau event handler.
- Vue: atribut native (`type`, `aria-*`) lewat fallthrough tidak dicek vue-tsc, beda dengan React yang memperluas `ComponentProps`. Uji perilaku atribut penting di tests/unit.
- Renderer Blade: `php scripts/render-blade.php <folder-sumber> <folder-output>`.
- Svelte: `$props.id()` untuk id, snippet untuk slot, `$bindable` untuk dua arah. Angular: selector `markas-<nama>` dengan host `contents` (atau attribute selector untuk satu elemen native), atribut host dipindah lewat input ber-alias lalu `[attr.x]: "null"`, boolean pakai `booleanAttribute`. Astro: script dibundel sekali per halaman, jadi pakai event delegation atau custom element, bukan init per instance.
- Tes e2e: `openFixture` men-skip framework yang belum punya contoh; parity membandingkan setiap framework yang ada terhadap React.
- Variasi contoh: `examples/<fw>/<nama>--<variasi>.*` (otomatis masuk tes e2e dan galeri docs), judulnya di `apps/docs/src/lib/variants/<nama>.ts`.
- CSS docs dipecah per halaman (budget 30 KB per halaman): global.css hanya CSS situs; class komponen dibangkitkan per komponen oleh `apps/docs/scripts/page-css.ts`, landing memakai daftar di `apps/docs/src/lib/landing.ts`, demo template memakai `src/generated/css/templates/<slug>.css` (templates.css + template itu + komponennya). Halaman baru wajib mengimpor CSS-nya sendiri (Base tidak mengimpor CSS).
- Kontrol props di docs: `apps/docs/src/lib/playgrounds.ts`. Kombinasi Blade dirender saat build oleh `apps/docs/scripts/playgrounds.ts`.
- Vue: nama template ref jangan sama dengan konstanta class (`ref="panelRef"` untuk `const panel = "..."`), atau Vue memberi peringatan.

## Template

- `templates/<slug>/` berisi meta.json (`"kind": "page"` untuk welcome page di /pages, default dashboard di /templates), `blade/<slug>.blade.php`, `react/<Pascal>.tsx`, `vue/<Pascal>.vue`, disusun dari komponen MarkasUI.
- Ketiga versi harus identik secara visual (uji di `tests/e2e/template-<slug>.spec.ts`) dan semua interaksinya jalan.
- Blade dirender oleh `scripts/render-templates.ts`. Halaman docs: /templates, /templates/<slug>, /demo/templates/<slug>/<fw>.
