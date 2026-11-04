# Berkontribusi ke MarkasUI

Terima kasih sudah ingin membantu. Dokumen ini menjelaskan cara menyiapkan repo dan standar komponen.

## Persiapan

Butuh Node 26 (lihat `.nvmrc`), pnpm 12, PHP 8.4+, dan Composer.

```bash
pnpm install
composer install
pnpm exec playwright install chromium
```

## Perintah harian

| Perintah                                           | Fungsi                                                         |
| -------------------------------------------------- | -------------------------------------------------------------- |
| `pnpm playground`                                  | Halaman uji Blade, React, Vue di http://localhost:5173         |
| `pnpm dev`                                         | Website docs di http://localhost:4321                          |
| `pnpm lint`                                        | ESLint, Prettier, Laravel Pint                                 |
| `pnpm typecheck`                                   | vue-tsc dan astro check                                        |
| `pnpm test`                                        | Vitest (React, Vue, render Blade, registry, CLI, MCP)          |
| `pnpm test:e2e`                                    | Kesamaan tampilan, axe-core, dan keyboard untuk semua komponen |
| `pnpm build` lalu `pnpm test:docs` dan `pnpm size` | Website, uji website, dan budget ukuran                        |

## Menambah komponen

1. Buat `components/<nama>/` berisi `<nama>.blade.php`, `<Nama>.tsx`, `<Nama>.vue`, `meta.json`, dan `usage.md`. Contoh lengkap: `components/modal/`.
2. Tulis class Tailwind yang **identik** di ketiga versi dan simpan di konstanta, bukan langsung di template.
3. Pakai hanya token warna dari `markas.css` (`bg-primary`, `text-muted`, `border-line`). Build registry gagal kalau ada hex atau warna palet Tailwind.
4. Tambahkan contoh identik di `examples/blade`, `examples/react`, dan `examples/vue`. Komponen otomatis masuk uji kesamaan tampilan dan axe-core.
5. Tambahkan unit test di `tests/unit/` dan uji keyboard di `tests/e2e/` kalau komponen punya interaksi.

Aturan lengkap ada di [`CLAUDE.md`](CLAUDE.md) dan [`docs/PRD.md`](docs/PRD.md) bagian 6 dan 11.

## Definition of done

- [ ] File Blade, React, Vue, `meta.json`, dan `usage.md` lengkap
- [ ] Hanya memakai token warna dari `markas.css`
- [ ] Lolos uji kesamaan tampilan, axe-core, dan keyboard
- [ ] Lolos batas ukuran (`pnpm size`)
- [ ] Tampil benar di mode terang dan gelap
- [ ] Halaman docs, `.md`, dan entri registry ter-generate

## Commit

Format `<type>: <deskripsi>` dengan type `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, atau `ci`. Teks UI dan docs dalam Bahasa Indonesia, tanpa em dash.
