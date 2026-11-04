# PRD MarkasUI

Nov 4, 2026 · @Prince Jenderal

## 1. Ringkasan produk

MarkasUI adalah library komponen UI gratis dan open source dari CV Jenderal Solusi Digital, tersedia dalam tiga versi: **Blade (Laravel), React, dan Vue**. Setiap komponen punya satu desain yang sama, dibangun di atas Tailwind CSS, dengan dependensi seminimal mungkin dan siap dipakai untuk vibe coding lewat Copy Prompt, Agent Skill, dan MCP server.

**Visi:** menjadi "markas" komponen UI yang ringan dan siap pakai untuk developer Indonesia, lalu pasar global.

**Tagline (draft):** Markas komponen UI ringan untuk Blade, React, dan Vue.

**Tujuan bisnis**

- Membangun brand awareness CV Jenderal Solusi Digital di komunitas developer.
- Menjadi portofolio teknis yang terbuka dan bisa dinilai calon klien.
- Menjadi fondasi untuk produk turunan (template, block, versi Pro) di masa depan.

**Diferensiasi utama**

- Blade didukung penuh, bukan versi sampingan. ReactBits, Animate UI, dan shadcn fokus ke React, padahal pengguna Laravel di Indonesia sangat banyak.
- Komponen inti tidak punya dependensi runtime selain framework-nya sendiri. Animasi berat dipisah ke kategori opsional.
- Sejak rilis pertama sudah ada registry, Copy Prompt, `llms.txt`, Agent Skill, dan MCP server untuk vibe coding.
- Tampilan komponen sama persis di Blade, React, dan Vue karena memakai class Tailwind yang sama.

## 2. Target pengguna

Pengguna utama adalah developer Laravel di Indonesia, disusul developer React dan Vue yang mencari komponen ringan.

| Persona | Situasi | Yang dibutuhkan dari MarkasUI |
| --- | --- | --- |
| Developer Laravel (Blade) | Membuat web company profile, dashboard admin, sistem informasi untuk klien | Komponen Blade siap tempel, Alpine.js saja, tanpa build step tambahan |
| Developer React / Next.js | Membuat landing page dan web app | Komponen tanpa dependensi berat, bisa di-copy atau dipasang lewat CLI |
| Developer Vue / Nuxt | Membuat web app dan dashboard | Versi Vue yang setara dengan React, bukan port setengah jadi |
| Vibe coder | Membangun lewat Claude Code, Cursor, atau Codex | Copy Prompt, Agent Skill, dan MCP agar AI memakai komponen dengan benar |
| Mahasiswa dan peserta magang | Belajar membuat UI yang rapi | Dokumentasi berbahasa Indonesia dan contoh pemakaian yang jelas |

Bahasa dokumentasi di MVP: Indonesia sebagai default, Inggris menyusul di fase berikutnya.

## 3. Ruang lingkup MVP

MVP berisi 24 komponen dasar dalam tiga framework, website dokumentasi statis, dan empat fitur AI. Tidak ada backend, login, atau fitur berbayar.

**Masuk MVP**

- 24 komponen inti (daftar di bagian 6), masing-masing versi Blade, React, dan Vue.
- Website dokumentasi: landing page, halaman browse komponen, halaman detail komponen, halaman docs (instalasi, theming, MCP, changelog).
- Switcher framework global (Blade / React / Vue) yang tersimpan di browser.
- Light dan dark mode.
- Pencarian statis.
- Registry JSON yang di-generate saat build.
- Copy code, Copy Prompt, Copy page (Markdown), `llms.txt`.
- CLI `npx markasui add <nama>` untuk Blade, React, dan Vue (project Laravel sudah memakai Node lewat Vite).
- Agent Skill (`SKILL.md`) dan MCP server lokal via npx.

**Tidak masuk MVP**

- Backend, akun user, favorit yang tersimpan di server.
- Versi Pro, template berbayar, sistem lisensi.
- Package Composer untuk Blade (MVP cukup copy-paste dan CLI).
- MCP server remote (HTTP).
- Komponen animasi berat berbasis WebGL atau canvas.
- Dokumentasi bahasa Inggris.

## 4. Arsitektur dan tech stack

Semua bagian MarkasUI berjalan tanpa server: website di-build jadi file statis, dan CLI serta MCP server membaca registry JSON dari website tersebut.

&#91;embedded content: arsitektur MarkasUI · sumber, build, hosting, tiga jalur pemakaian\]

CLI dan MCP mengambil `/r/*.json` dari CDN yang sama dengan website, jadi tidak ada server yang perlu dijaga.

| Lapisan | Pilihan | Catatan |
| --- | --- | --- |
| Styling | Tailwind CSS v4 | Class yang sama dipakai di ketiga framework |
| Theming | CSS variables lewat `@theme` | Warna, radius, font bisa diganti user |
| Interaksi Blade | Alpine.js | Kompatibel dengan Livewire |
| Interaksi React | Hooks bawaan React | Tanpa library tambahan untuk komponen inti |
| Interaksi Vue | Vue 3, `<script setup>` | Tanpa library tambahan untuk komponen inti |
| Ikon | Inline SVG (set ikon sendiri, gaya outline 24px) | Tidak menambah package ke project user |
| Website docs | Astro + integrasi React dan Vue | Halaman statis, JavaScript hanya di bagian interaktif |
| Highlight kode | Shiki saat build | Kode sudah berwarna di HTML, tanpa JS di browser |
| Pencarian | Pagefind | Index dibuat saat build |
| Monorepo | pnpm workspaces | Satu repo untuk komponen, docs, CLI, MCP |
| CLI dan MCP | TypeScript, dipublish ke npm | `markasui` dan `@markasui/mcp` |
| Hosting | Cloudflare Pages | Gratis, CDN global |
| CI | GitHub Actions | Lint, test, build, deploy |
| Lisensi | MIT | Bebas dipakai untuk project komersial |

Versi pasti setiap package ditentukan saat setup project, dikunci di `package.json`, dan diperbarui lewat Renovate atau Dependabot.

## 5. Struktur monorepo dan registry

Satu folder per komponen menjadi sumber data tunggal. Website, registry, CLI, Skill, dan MCP semuanya membaca dari folder ini, sehingga tidak ada data yang ditulis dua kali.

```
markasui/
  apps/
    docs/                  # website Astro
  components/
    button/
      button.blade.php
      Button.tsx
      Button.vue
      meta.json            # metadata komponen
      usage.md             # contoh pemakaian dan catatan
    modal/
    ...
  packages/
    theme/                 # markas.css: token warna, font, radius
    registry/              # script build registry
    cli/                   # paket npm: markasui
    mcp/                   # paket npm: @markasui/mcp
  skills/
    markasui/SKILL.md      # Agent Skill
  CLAUDE.md                # aturan kerja untuk Claude Code
  pnpm-workspace.yaml
```

**Isi `meta.json`**

```json
{
  "name": "button",
  "title": "Button",
  "description": "Tombol dengan varian primary, secondary, ghost, dan danger.",
  "category": "form",
  "tags": ["button", "cta", "action"],
  "status": "stable",
  "frameworks": {
    "blade": { "file": "button.blade.php", "deps": [] },
    "react": { "file": "Button.tsx", "deps": [] },
    "vue": { "file": "Button.vue", "deps": [] }
  },
  "props": [
    { "name": "variant", "type": "'primary' | 'secondary' | 'ghost' | 'danger'", "default": "primary" },
    { "name": "size", "type": "'sm' | 'md' | 'lg'", "default": "md" }
  ],
  "ai": {
    "whenToUse": "Aksi utama atau sekunder di form dan halaman.",
    "rules": ["Satu tombol primary per area", "Gunakan ghost untuk aksi di toolbar"]
  },
  "addedAt": "2026-11-04"
}
```

**Output build registry** (dipublish ke website, dibaca CLI dan MCP):

- `/r/index.json`: daftar semua komponen beserta nama, judul, kategori, tag, status.
- `/r/{name}.json`: satu komponen lengkap, berisi kode ketiga framework, props, dependensi, dan aturan AI.
- `/r/theme.json`: token tema dan isi `markas.css`.

Script build memvalidasi setiap `meta.json` dengan skema Zod dan gagal kalau ada file framework yang hilang.

## 6. Standar komponen

Setiap komponen ditulis tiga kali dengan class Tailwind dan nama varian yang identik, lalu diuji agar hasil render-nya sama.

### Aturan umum

- Warna hanya dari token tema (`bg-primary`, `text-muted`, `border-line`). Tidak ada hex atau warna Tailwind bawaan seperti `bg-green-700` di dalam komponen.
- Varian dan ukuran ditulis sebagai objek map dengan nama yang sama di ketiga versi.
- State visual memakai atribut `data-state` (`open`, `closed`, `active`), bukan class yang di-toggle.
- Pakai elemen native bila ada: `<dialog>` untuk modal, Popover API untuk dropdown dan tooltip, `<details>` untuk accordion.
- Class tambahan dari user selalu digabung di akhir. Tidak memakai `tailwind-merge` agar tetap tanpa dependensi.
- Satu file per komponen. Komponen yang punya sub-bagian (Tabs, Accordion) tetap satu file, dengan sub-komponen yang diekspor dari file itu.

### Blade

- Anonymous component di `resources/views/components/markas/`, dipakai sebagai `<x-markas.button>`.
- Props lewat `@props([...])` dengan default.
- Atribut digabung dengan `$attributes->class([...])`.
- Interaksi lewat `x-data` Alpine di dalam komponen. Tidak memakai `Alpine.data()` global agar file tetap mandiri.

```blade
@props(['variant' => 'primary', 'size' => 'md'])
@php
$variants = [
  'primary' => 'bg-primary text-on-primary hover:bg-primary-strong',
  'secondary' => 'border border-line bg-surface text-ink hover:bg-subtle',
];
$sizes = ['sm' => 'h-8 px-3 text-sm', 'md' => 'h-10 px-4 text-sm', 'lg' => 'h-12 px-6'];
@endphp
<button {{ $attributes->class(['inline-flex items-center gap-2 rounded-md font-medium transition-colors', $variants[$variant], $sizes[$size]]) }}>
  {{ $slot }}
</button>
```

### React

- TypeScript (`.tsx`), function component, props memperluas props elemen native (`ComponentProps<'button'>`).
- Ref diteruskan sebagai prop biasa (React 19).
- Tambahkan `"use client"` hanya pada komponen yang memakai state atau event, agar aman di Next.js.
- Helper `cx()` kecil ditulis di dalam file, bukan import `clsx`.

```tsx
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
};
const sizes = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-6" };
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

type Props = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  return (
    <button
      className={cx("inline-flex items-center gap-2 rounded-md font-medium transition-colors", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
```

### Vue

- Single File Component dengan `<script setup lang="ts">`.
- Props lewat `defineProps` dan `withDefaults`, two-way binding lewat `defineModel`.
- Atribut dan class dari user diteruskan otomatis (attribute fallthrough).

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}>(), { variant: "primary", size: "md" });

const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
};
const sizes = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-6" };
</script>

<template>
  <button :class="['inline-flex items-center gap-2 rounded-md font-medium transition-colors', variants[props.variant], sizes[props.size]]">
    <slot />
  </button>
</template>
```

### Daftar 24 komponen MVP

| Komponen | Kategori | Dasar teknis | Butuh JS |
| --- | --- | --- | --- |
| Button | Form | `<button>` | Tidak |
| Input | Form | `<input>` + label + pesan error | Tidak |
| Textarea | Form | `<textarea>` | Tidak |
| Select | Form | `<select>` native yang di-styling | Tidak |
| Checkbox | Form | `<input type="checkbox">` | Tidak |
| Radio Group | Form | `<fieldset>` + radio | Tidak |
| Switch | Form | checkbox dengan `role="switch"` | Tidak |
| Alert | Feedback | `<div role="alert">` | Tidak |
| Badge | Feedback | `<span>` | Tidak |
| Toast | Feedback | region `aria-live` | Ya |
| Progress | Feedback | `<progress>` | Tidak |
| Skeleton | Feedback | `<div>` + animasi CSS | Tidak |
| Modal | Overlay | `<dialog>` | Sedikit (buka/tutup) |
| Dropdown Menu | Overlay | Popover API | Sedikit (navigasi keyboard) |
| Tooltip | Overlay | Popover API | Sedikit |
| Drawer | Overlay | `<dialog>` dari sisi layar | Sedikit |
| Tabs | Navigasi | `role="tablist"` | Ya |
| Accordion | Navigasi | `<details>` / `<summary>` | Tidak |
| Breadcrumb | Navigasi | `<nav>` + `<ol>` | Tidak |
| Pagination | Navigasi | `<nav>` + link | Tidak |
| Navbar | Navigasi | `<header>` + menu mobile | Sedikit (menu mobile) |
| Card | Data | `<article>` | Tidak |
| Avatar | Data | `<img>` + fallback inisial | Tidak |
| Table | Data | `<table>` responsif | Tidak |

Setelah MVP, kategori berikutnya adalah Blocks (hero, pricing, footer, testimonial, stat seperti di jenderalcorp.com) dan Motion (animasi ringan berbasis CSS).

## 7. Website dokumentasi

Website memakai struktur halaman docs seperti Animate UI dan halaman browse seperti ReactBits, dengan warna dan tipografi Jenderal (bagian 8).

### Halaman

| Route | Isi |
| --- | --- |
| `/` | Landing: hero, contoh komponen live, perintah instalasi, bagian AI, daftar kategori, footer |
| `/components` | Grid semua komponen dengan pencarian, filter kategori, dan urutan (terbaru, A sampai Z) |
| `/components/[name]` | Detail komponen: preview, kode, instalasi, props, catatan aksesibilitas |
| `/docs/introduction` | Apa itu MarkasUI dan cara memakainya |
| `/docs/installation` | Setup Tailwind dan `markas.css` untuk Laravel, React (Vite / Next.js), Vue (Vite / Nuxt) |
| `/docs/theming` | Daftar token dan cara mengganti warna brand |
| `/docs/cli` | Perintah CLI |
| `/docs/mcp` | Cara memasang MCP di Claude Code, Cursor, dan VS Code |
| `/docs/skills` | Cara memasang Agent Skill |
| `/docs/changelog` | Riwayat rilis |
| `/llms.txt`, `/llms-full.txt` | Ringkasan dan isi lengkap docs untuk AI |
| `/components/[name].md` | Versi Markdown tiap halaman komponen |
| `/r/*.json` | Registry (bagian 5) |

### Header

Logo MarkasUI, menu Docs, Components, MCP, kotak pencarian dengan shortcut `Ctrl/Cmd + K`, jumlah GitHub star, dan tombol tema. Tinggi 64px, sticky, garis bawah tipis.

### Halaman detail komponen

Tiga kolom di desktop: sidebar kiri 240px, konten tengah maksimal 768px, daftar isi kanan 200px. Di mobile, sidebar menjadi drawer dan daftar isi disembunyikan.

1. Sidebar kiri: switcher framework Blade / React / Vue di bagian atas, lalu daftar komponen per kategori dengan label kecil `baru` atau `diperbarui`.
2. Judul dan deskripsi satu kalimat.
3. Baris aksi di kanan judul: tombol **Copy page** dengan dropdown (Copy prompt, Lihat Markdown, Buka di Claude, Buka di ChatGPT), lalu tombol sebelumnya dan berikutnya.
4. Kotak preview dengan latar titik-titik halus, tombol reload, dan tombol pengaturan props sederhana.
5. Kotak kode di bawah preview, terpotong dengan tombol "Lihat kode" kalau lebih dari 12 baris, plus tombol copy.
6. Instalasi dengan tab **CLI** dan **Manual**. Tab CLI punya sub-tab npm, pnpm, yarn, bun.
7. Contoh pemakaian.
8. Tabel props: nama, tipe, default, keterangan.
9. Catatan aksesibilitas: dukungan keyboard dan atribut ARIA.

Pilihan framework disimpan di `localStorage` dan berlaku di seluruh situs. Kode, perintah CLI, dan prompt otomatis mengikuti framework yang dipilih.

### Preview

- React dan Vue dirender sebagai island Astro dengan `client:visible`, hanya untuk framework yang sedang dipilih.
- Blade dirender ke HTML saat build oleh script PHP kecil yang memakai `illuminate/view`. Hasilnya HTML statis plus Alpine.js, sehingga preview Blade adalah output Blade sungguhan.
- Alpine.js hanya dimuat di halaman yang menampilkan preview Blade interaktif.

### Halaman `/components`

Grid kartu 3 kolom di desktop, 2 di tablet, 1 di mobile. Setiap kartu berisi thumbnail preview (gambar WebP statis yang di-generate saat build, bukan komponen live), nama, dan kategori dengan huruf mono kapital. Label `BARU` muncul selama 30 hari sejak `addedAt`.

### Landing page

1. Badge kecil mono: `OPEN SOURCE · BLADE · REACT · VUE`.
2. Headline besar dua baris dengan satu frasa serif miring, mengikuti gaya jenderalcorp.com. Draft: "Komponen UI ringan untuk *setiap stack.*"
3. Subjudul satu kalimat, dua tombol: **Lihat Komponen** (primary) dan **Baca Docs** (secondary).
4. Kotak perintah instalasi dengan tab npm, pnpm, yarn, bun.
5. Demo beberapa komponen live dengan switcher framework.
6. Bagian AI: contoh prompt di kiri, hasil komponen di kanan, seperti Animate UI. Teks: "Minta komponen dengan bahasa biasa."
7. Angka ringkas dengan label mono kapital: jumlah komponen, jumlah framework, ukuran JS komponen inti.
8. Footer: tautan GitHub, docs, lisensi MIT, dan "Dibuat oleh CV Jenderal Solusi Digital, Purwokerto".

## 8. Design system

Warna mengikuti jenderalcorp.com: hijau hutan sebagai warna utama di atas latar putih tulang, teks hampir hitam, dan label mono huruf kapital. Gaya layout dan komponen mengikuti kerapian Animate UI: banyak ruang kosong, garis tipis, hampir tanpa bayangan.

Nilai hex di bawah diambil dari screenshot, jadi masih perkiraan. Cocokkan dengan brand guideline Jenderal sebelum rilis.

### Warna

| Token | Light | Dark | Dipakai untuk |
| --- | --- | --- | --- |
| `canvas` | `#F4F4F1` | `#0E110E` | Latar halaman |
| `surface` | `#FFFFFF` | `#151915` | Kartu, kotak preview, input |
| `subtle` | `#ECECE8` | `#1C211C` | Hover, latar kode, sidebar aktif |
| `line` | `#E2E2DD` | `#2A302A` | Border dan garis pemisah |
| `ink` | `#121412` | `#F2F4F1` | Teks utama |
| `muted` | `#5E625D` | `#A3A9A2` | Teks sekunder |
| `faint` | `#8A8E89` | `#6E756D` | Label mono, placeholder |
| `primary` | `#2E6B3A` | `#5FA36B` | Tombol utama, link, fokus |
| `primary-strong` | `#24552E` | `#74B47F` | Hover tombol utama |
| `on-primary` | `#FFFFFF` | `#0E110E` | Teks di atas `primary` |
| `primary-soft` | `#E7EFE5` | `#1B2A1D` | Latar badge dan highlight |
| `primary-line` | `#B9D1B5` | `#2F4A33` | Border badge |
| `success` | `#3FA463` | `#4CC074` | Titik status, alert sukses |
| `warning` | `#B54708` | `#FDB022` | Alert peringatan |
| `danger` | `#B42318` | `#F97066` | Error, tombol hapus |

Semua pasangan teks dan latar harus lolos kontras WCAG AA (4.5:1 untuk teks biasa). Cek ulang `primary` di mode gelap setelah hex final ditetapkan.

### Tipografi

| Peran | Font | Pemakaian |
| --- | --- | --- |
| Sans | Plus Jakarta Sans | Teks, judul, tombol |
| Serif miring | Instrument Serif Italic | Satu frasa penekanan di headline, hanya di website (tidak di komponen) |
| Mono | JetBrains Mono | Kode, label kapital, badge |

Plus Jakarta Sans dipilih karena dirancang di Indonesia dan cocok dengan cerita brand. Font di-host sendiri dalam format WOFF2, subset Latin, `font-display: swap`. Komponen sendiri tidak memuat font apa pun dan mewarisi font project user.

Skala: 12, 14, 16, 18, 20, 24, 30, 36, 48, 64 px. Headline landing 64px di desktop, 40px di mobile, `tracking-tight`, tebal 700. Label mono: 11 sampai 12px, huruf kapital, `tracking-[0.2em]`, warna `faint`, seperti menu BERANDA dan PROFIL di jenderalcorp.com.

### Bentuk dan ruang

- Radius: 6px untuk input dan tombol kecil, 8px untuk tombol dan kartu, 12px untuk kotak preview dan modal, penuh untuk badge.
- Border 1px warna `line` sebagai pemisah utama. Bayangan hanya untuk elemen yang melayang (dropdown, modal, toast).
- Spasi kelipatan 4px.
- Fokus: outline 2px `primary` dengan offset 2px, hanya muncul lewat `:focus-visible`.
- Animasi 150 sampai 200ms `ease-out`, dan dimatikan saat `prefers-reduced-motion: reduce`.
- Latar titik-titik halus (dot grid) dipakai di hero dan kotak preview, dibuat dengan `radial-gradient` CSS, bukan gambar.

### File `markas.css`

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --markas-canvas: #F4F4F1;
  --markas-surface: #FFFFFF;
  --markas-subtle: #ECECE8;
  --markas-line: #E2E2DD;
  --markas-ink: #121412;
  --markas-muted: #5E625D;
  --markas-faint: #8A8E89;
  --markas-primary: #2E6B3A;
  --markas-primary-strong: #24552E;
  --markas-on-primary: #FFFFFF;
  --markas-primary-soft: #E7EFE5;
  --markas-primary-line: #B9D1B5;
  --markas-danger: #B42318;
}

.dark {
  --markas-canvas: #0E110E;
  --markas-surface: #151915;
  --markas-subtle: #1C211C;
  --markas-line: #2A302A;
  --markas-ink: #F2F4F1;
  --markas-muted: #A3A9A2;
  --markas-faint: #6E756D;
  --markas-primary: #5FA36B;
  --markas-primary-strong: #74B47F;
  --markas-on-primary: #0E110E;
  --markas-primary-soft: #1B2A1D;
  --markas-primary-line: #2F4A33;
  --markas-danger: #F97066;
}

@theme inline {
  --color-canvas: var(--markas-canvas);
  --color-surface: var(--markas-surface);
  --color-subtle: var(--markas-subtle);
  --color-line: var(--markas-line);
  --color-ink: var(--markas-ink);
  --color-muted: var(--markas-muted);
  --color-faint: var(--markas-faint);
  --color-primary: var(--markas-primary);
  --color-primary-strong: var(--markas-primary-strong);
  --color-on-primary: var(--markas-on-primary);
  --color-primary-soft: var(--markas-primary-soft);
  --color-primary-line: var(--markas-primary-line);
  --color-danger: var(--markas-danger);
}
```

Token `success` dan `warning` ditambahkan dengan pola yang sama. User yang ingin warna brand sendiri cukup mengganti variabel `--markas-*`.

## 9. Fitur AI dan CLI

Lima fitur ini membaca registry yang sama, jadi menambah satu komponen otomatis memperbarui semuanya.

### Copy Prompt

Tombol di dropdown **Copy page** menyalin prompt yang sudah berisi kode komponen untuk framework yang dipilih. Template:

```markdown
Tambahkan komponen {title} dari MarkasUI ke project {framework} saya.

Aturan:
- Simpan file di {targetPath}.
- Pastikan markas.css sudah di-import. Kalau belum, ikuti {installUrl}.
- Jangan ubah class Tailwind inti dan nama token warna.
- {aiRules}

Kode komponen:
{code}

Contoh pemakaian:
{usage}
```

`targetPath` default: `resources/views/components/markas/` (Blade), `src/components/markas/` (React dan Vue).

### llms.txt dan Markdown

- `/llms.txt`: daftar halaman docs dan komponen dengan satu kalimat deskripsi dan link ke versi `.md`.
- `/llms-full.txt`: seluruh isi docs dalam satu file Markdown.
- Setiap halaman komponen punya versi `.md` yang di-generate dari `meta.json` dan `usage.md`.

### Agent Skill

Folder `skills/markasui/` berisi `SKILL.md` yang mengajari agent cara memakai MarkasUI. Isinya:

1. Kapan skill dipakai: user menyebut MarkasUI, atau meminta UI di project yang sudah memakai `markas.css`.
2. Cara mendeteksi framework project: ada `artisan` dan `resources/views` berarti Blade, ada `react` di `package.json` berarti React, ada `vue` berarti Vue.
3. Cara mengambil komponen: lewat MCP kalau tersedia, kalau tidak lewat `npx markasui add`, kalau tidak lewat `/r/{name}.json`.
4. Aturan desain: hanya token warna, satu tombol primary per area, label mono untuk metadata.
5. Checklist sebelum selesai: file tersimpan di path yang benar, `markas.css` ter-import, dark mode tetap berfungsi, tidak ada dependensi baru.

User bisa memasang skill lewat CLI skills seperti di Animate UI, atau menyalin folder ke `.claude/skills/` secara manual.

### MCP server

Paket `@markasui/mcp` berjalan lokal lewat stdio dan mengambil data dari `https://<domain>/r/`. Hasil fetch di-cache di memori selama proses berjalan.

| Tool | Input | Output |
| --- | --- | --- |
| `list_components` | `category?` | Nama, judul, kategori, deskripsi semua komponen |
| `search_components` | `query` | Komponen yang cocok berdasarkan nama, deskripsi, dan tag |
| `get_component` | `name`, `framework` | Kode, props, dependensi, aturan AI, contoh pemakaian, target path |
| `get_theme` | tidak ada | Isi `markas.css` dan daftar token |
| `get_setup` | `framework` | Langkah instalasi Tailwind dan `markas.css` untuk framework itu |

Cara pasang di Claude Code:

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

Di Cursor, tambahkan ke `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "markasui": { "command": "npx", "args": ["-y", "@markasui/mcp"] }
  }
}
```

### CLI

| Perintah | Fungsi |
| --- | --- |
| `npx markasui init` | Deteksi framework, buat `markas.json` (path tujuan, framework), salin `markas.css` |
| `npx markasui add <nama...>` | Unduh komponen dari registry dan tulis ke path tujuan |
| `npx markasui list` | Tampilkan daftar komponen per kategori |

CLI tidak pernah menimpa file yang sudah ada tanpa konfirmasi, dan menampilkan dependensi yang perlu dipasang (misalnya Alpine.js untuk Blade).

## 10. Budget performa

"Ringan" diukur dengan angka di bawah. CI gagal kalau salah satu batas terlampaui.

| Ukuran | Batas | Cara cek |
| --- | --- | --- |
| JS halaman docs, di luar island preview | maks. 25 KB gzip | `size-limit` di CI |
| CSS seluruh situs | maks. 30 KB gzip | `size-limit` di CI |
| Font | maks. 4 file WOFF2, total maks. 120 KB | Cek folder build |
| JS satu komponen React atau Vue | maks. 3 KB gzip | `size-limit` per komponen |
| Dependensi runtime komponen inti | 0, selain React, Vue, atau Alpine.js | Validasi `meta.json` |
| Thumbnail komponen | WebP, maks. 30 KB, `loading="lazy"` | Script build |
| Lighthouse mobile | Performance min. 95, Accessibility 100 | Lighthouse CI |
| Core Web Vitals | LCP < 2 detik, CLS < 0.05, INP < 200 ms | Lighthouse CI dan Cloudflare Web Analytics |

Aturan yang menjaga budget:

- Halaman tidak mengirim JavaScript kecuali bagian yang memang interaktif (pencarian, switcher, tombol copy, preview).
- Island preview memakai `client:visible`, jadi baru dimuat saat terlihat di layar.
- Highlight kode dikerjakan saat build oleh Shiki.
- Tidak ada library animasi, icon pack, atau UI kit lain di website maupun komponen inti.
- Analytics memakai Cloudflare Web Analytics, tanpa script pihak ketiga lain.

## 11. Aksesibilitas dan quality gate

Satu komponen dianggap selesai hanya kalau ketiga versinya lolos semua cek di bawah.

### Aksesibilitas

- Pola keyboard dan ARIA mengikuti WAI-ARIA Authoring Practices untuk tiap jenis komponen (Tabs, Menu, Dialog, dan seterusnya).
- Semua elemen interaktif bisa dijangkau dengan Tab dan punya fokus yang terlihat.
- Modal dan Drawer mengunci fokus, menutup dengan Escape, dan mengembalikan fokus ke pemicu.
- Kontras teks memenuhi WCAG AA di mode terang dan gelap.
- Animasi menghormati `prefers-reduced-motion`.

### Pengujian

| Cek | Alat | Berlaku untuk |
| --- | --- | --- |
| Validasi `meta.json` dan kelengkapan file | Zod di script registry | Semua komponen |
| Unit test perilaku | Vitest + Testing Library | React dan Vue |
| Uji aksesibilitas otomatis | Playwright + axe-core | Halaman preview ketiga framework |
| Uji keyboard | Playwright | Komponen yang butuh JS |
| Kesamaan tampilan | Screenshot Playwright, versi Blade, React, dan Vue dibandingkan untuk contoh yang sama | Semua komponen |
| Format dan lint | Prettier, ESLint, Laravel Pint | Semua file |
| Ukuran | `size-limit` | Bagian 10 |
| Performa | Lighthouse CI | Landing, `/components`, satu halaman detail |

Uji kesamaan tampilan adalah jaminan utama "satu desain, tiga framework". Selisih piksel di atas 0,5% membuat CI gagal.

### Definition of done satu komponen

- [ ] File Blade, React, Vue, `meta.json`, dan `usage.md` lengkap
- [ ] Hanya memakai token warna dari `markas.css`
- [ ] Lolos uji kesamaan tampilan, axe-core, dan keyboard
- [ ] Lolos batas ukuran
- [ ] Tampil benar di mode terang dan gelap
- [ ] Halaman docs, `.md`, dan entri registry ter-generate

## 12. Roadmap pengerjaan dengan Claude Code

Pekerjaan dibagi tujuh fase. Kerjakan satu fase per sesi Claude Code, dan jangan lanjut sebelum syarat lolos fase itu terpenuhi.

Simpan PRD ini di repo sebagai `docs/PRD.md` (doc ini bisa diunduh sebagai Markdown), lalu buka setiap sesi dengan prompt seperti:

```text
Baca docs/PRD.md dan CLAUDE.md. Kerjakan Fase {n}. Buat rencana dulu, tunggu persetujuan saya, lalu kerjakan sampai semua checklist fase ini lolos.
```

### Fase 0: Fondasi

- [ ] Monorepo pnpm sesuai struktur di bagian 5
- [ ] `packages/theme/markas.css` sesuai bagian 8
- [ ] `CLAUDE.md` di root (isi di bawah)
- [ ] Prettier, ESLint, Laravel Pint, dan workflow GitHub Actions dasar

Syarat lolos: `pnpm install` dan `pnpm lint` berjalan tanpa error.

### Fase 1: Komponen pilot

- [ ] Button, Input, Modal, Tabs dalam versi Blade, React, dan Vue
- [ ] Halaman uji per framework (app Laravel, Vite React, Vite Vue kecil di folder `playground/`)
- [ ] Uji kesamaan tampilan Playwright dan axe-core untuk keempat komponen

Syarat lolos: uji kesamaan tampilan dan aksesibilitas hijau. Fase ini menetapkan pola untuk 20 komponen lain, jadi review kodenya dengan teliti.

### Fase 2: Registry dan website docs

- [ ] Script build registry dengan validasi Zod
- [ ] Website Astro: header, sidebar, halaman detail, halaman `/components`, docs dasar
- [ ] Switcher framework, mode gelap, pencarian Pagefind
- [ ] Script render Blade ke HTML untuk preview
- [ ] Deploy ke Cloudflare Pages

Syarat lolos: keempat komponen pilot tampil lengkap di website dan budget di bagian 10 terpenuhi.

### Fase 3: 20 komponen sisanya

- [ ] Form: Textarea, Select, Checkbox, Radio Group, Switch
- [ ] Feedback: Alert, Badge, Toast, Progress, Skeleton
- [ ] Overlay: Dropdown Menu, Tooltip, Drawer
- [ ] Navigasi: Accordion, Breadcrumb, Pagination, Navbar
- [ ] Data: Card, Avatar, Table

Syarat lolos: setiap komponen memenuhi definition of done di bagian 11.

### Fase 4: Fitur AI

- [ ] Copy Prompt dan dropdown Copy page
- [ ] `llms.txt`, `llms-full.txt`, versi `.md` tiap halaman
- [ ] `skills/markasui/SKILL.md`
- [ ] Paket `@markasui/mcp` dengan lima tool di bagian 9

Syarat lolos: di project kosong, Claude Code dengan MCP terpasang bisa membuat halaman login memakai komponen MarkasUI untuk ketiga framework.

### Fase 5: CLI

- [ ] Perintah `init`, `add`, `list`
- [ ] Publish `markasui` dan `@markasui/mcp` ke npm

Syarat lolos: `npx markasui init` lalu `npx markasui add button modal` berhasil di project Laravel, React, dan Vue baru.

### Fase 6: Launch

- [ ] Landing page final
- [ ] README, CONTRIBUTING, lisensi MIT
- [ ] Repo GitHub publik dan domain aktif
- [ ] Pengumuman di komunitas Laravel Indonesia, grup developer, dan media sosial Jenderal

### Isi `CLAUDE.md`

```markdown
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
```

## 13. Metrik, risiko, dan keputusan terbuka

### Metrik keberhasilan

Target di bawah adalah usulan untuk 6 bulan pertama setelah launch. Sesuaikan setelah melihat data bulan pertama.

| Metrik | Target usulan | Sumber data |
| --- | --- | --- |
| GitHub star | 1.000 | GitHub |
| Pengunjung unik per bulan | 10.000 | Cloudflare Web Analytics |
| Unduhan npm `markasui` + `@markasui/mcp` per minggu | 500 | npm |
| Rasio pemakaian Blade : React : Vue | Tercatat (tanpa target) | Event klik switcher dan perintah CLI |
| Lighthouse mobile | Tetap di atas batas bagian 10 | Lighthouse CI |
| Leads klien yang menyebut MarkasUI | Tercatat (tanpa target) | Form kontak jenderalcorp.com |

### Risiko

| Risiko | Dampak | Penanganan |
| --- | --- | --- |
| Tiga versi per komponen membuat pengerjaan tiga kali lebih lama | Rilis lambat | Fase 1 menetapkan pola, uji kesamaan tampilan otomatis, Claude Code mengerjakan port |
| Versi Blade, React, Vue lama-lama berbeda | Janji "satu desain" rusak | Uji kesamaan tampilan wajib di CI |
| Popover API belum didukung browser lama | Dropdown dan tooltip tidak muncul | Cek dukungan browser saat Fase 1, siapkan fallback kecil kalau perlu |
| Tanpa `tailwind-merge`, class user bisa bentrok dengan class bawaan | Styling tidak sesuai harapan user | Dokumentasikan, sediakan prop varian yang cukup |
| Nama "MarkasUI" sudah dipakai pihak lain | Harus ganti nama setelah launch | Cek domain, npm, GitHub, dan merek sebelum Fase 0 |
| Hex warna di PRD hanya perkiraan dari screenshot | Warna tidak sama dengan brand | Ambil hex resmi dari tim desain Jenderal |

### Keputusan terbuka

- [ ] Domain: `markasui.com`, `markasui.dev`, atau subdomain `ui.jenderalcorp.com`
- [ ] Nama organisasi GitHub dan scope npm
- [ ] Hex warna resmi brand Jenderal
- [ ] Font final: Plus Jakarta Sans atau font yang sudah dipakai jenderalcorp.com
- [ ] Apakah ada versi Pro di masa depan, dan kalau ada, kapan backend mulai dibangun
- [ ] Siapa maintainer utama dan berapa jam per minggu dialokasikan
