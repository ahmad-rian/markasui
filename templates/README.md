# Templates

Halaman siap pakai yang disusun dari komponen MarkasUI, dalam tiga versi.

```
templates/<slug>/
  meta.json            judul dan deskripsi (Inggris + Indonesia), daftar komponen yang dipakai
  blade/<slug>.blade.php
  react/<Pascal>.tsx   export default
  vue/<Pascal>.vue
```

Komponen di-import dari `components/` dengan path relatif, sama seperti `examples/`. Uji di playground:
`http://localhost:5173/template.html?t=<slug>&fw=blade|react|vue` (render Blade dulu: `pnpm blade:playground`).
