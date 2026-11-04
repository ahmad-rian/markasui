# markasui

CLI untuk [MarkasUI](https://markasui.pages.dev): komponen UI ringan untuk Blade, React, dan Vue.

```bash
npx markasui@latest init          # deteksi framework, buat markas.json, salin markas.css
npx markasui@latest add button    # tulis komponen ke folder komponen
npx markasui@latest list          # daftar komponen
```

Opsi: `--cwd`, `--framework blade|react|vue`, `--overwrite`, `--yes`, `--registry <url|folder>`.
Registry juga bisa diatur lewat variabel `MARKASUI_REGISTRY`.

CLI tidak pernah menimpa file yang sudah Anda ubah tanpa konfirmasi. Butuh Node 20 atau lebih baru.

Lisensi MIT. Dibuat oleh CV Jenderal Solusi Digital, Purwokerto.
