# Templates

Halaman siap pakai yang disusun dari komponen MarkasUI. Blade, React, dan Vue wajib; Svelte, Astro,
dan Angular di-porting bertahap (panduan: .cache/templates-port-brief.md).

```
templates/<slug>/
  meta.json                     title (nama merek), headline, description, sectors (en + id), accent, komponen yang dipakai
  blade/<slug>.blade.php
  react/<Pascal>.tsx            export default
  vue/<Pascal>.vue
  svelte/<Pascal>.svelte        opsional
  astro/<Pascal>.astro          opsional, render server + custom element <slug>-template
  angular/<slug>.component.ts   opsional, export default class <Pascal>, selector template-<slug>
```

Komponen di-import dari `components/` dengan path relatif, sama seperti `examples/`. Framework yang
tersedia dideteksi dari file di atas (docs, tes e2e lewat `templateFrameworks(slug)`), tanpa daftar di
meta.json. `accent` (nama di apps/docs/src/lib/accents.ts, mis. `indigo`) adalah warna aksen bawaan di
pratinjau docs, kartu, demo, OG, dan playground; pemilih aksen tetap bisa menggantinya. Uji di playground: `http://localhost:5173/template.html?t=<slug>&fw=<framework>` (render
Blade dulu: `pnpm blade:playground`; Astro: `node scripts/render-astro.ts playground/public/astro <slug>`).
