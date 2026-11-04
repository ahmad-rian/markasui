# MarkasUI

[English](README.md) · Bahasa Indonesia

Markas komponen UI ringan untuk **Blade, React, dan Vue**. Satu desain, dibangun di atas Tailwind CSS v4, tanpa dependensi runtime selain framework-nya sendiri, dan siap dipakai agent AI.

**Docs:** https://markasui.pages.dev/id

## Kenapa MarkasUI

- **Blade didukung penuh.** Interaksi memakai Alpine.js, jadi langsung jalan di Livewire.
- **Tampilan sama persis** di tiga framework. Dijamin uji kesamaan tampilan otomatis (selisih piksel maks 0,5%).
- **Ringan.** Tanpa `clsx`, `tailwind-merge`, atau icon pack. JS tiap komponen React/Vue di bawah 3 KB gzip.
- **Elemen native dulu.** `<dialog>`, Popover API, `<details>`.
- **Siap untuk AI.** Registry JSON, Copy Prompt, `llms.txt`, Agent Skill, dan MCP server.

## Mulai

```bash
npx markasui@latest init
npx markasui@latest add button modal
```

Atau salin kode dari halaman komponen di docs. Panduan lengkap: [Instalasi](https://markasui.pages.dev/docs/installation).

### Untuk agent AI

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

Agent Skill ada di [`skills/markasui`](skills/markasui/SKILL.md).

## Struktur repo

```
apps/docs/          website docs (Astro)
components/<nama>/  sumber tunggal tiap komponen: Blade, React, Vue, meta.json, usage.md
examples/           contoh identik per framework, dipakai playground, tes, dan preview docs
packages/theme/     markas.css (token warna)
packages/registry/  build registry JSON dengan validasi Zod
packages/cli/       paket npm "markasui"
packages/mcp/       paket npm "@markasui/mcp"
skills/markasui/    Agent Skill
playground/         halaman uji Vite untuk tiga framework
```

## Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md).

## Lisensi

[MIT](LICENSE). Dibuat oleh CV Jenderal Solusi Digital, Purwokerto.
