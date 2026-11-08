## Blade

```blade
<x-markas.spotlight-beam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
    <h2 class="text-3xl font-semibold text-ink">Roadmap kamu, di bawah sorotan</h2>
    <x-markas.button>Buat roadmap</x-markas.button>
</x-markas.spotlight-beam>
```

Butuh Alpine.js untuk animasi masuk dan `follow`.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { SpotlightBeam } from "@/components/markas/SpotlightBeam";

<SpotlightBeam follow className="dark rounded-xl bg-canvas px-6 py-16 text-ink">
  <h2 className="text-3xl font-semibold text-ink">
    Roadmap kamu, di bawah sorotan
  </h2>
  <Button>Buat roadmap</Button>
</SpotlightBeam>;
```

## Vue

```vue
<template>
  <SpotlightBeam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
    <h2 class="text-3xl font-semibold text-ink">
      Roadmap kamu, di bawah sorotan
    </h2>
    <Button>Buat roadmap</Button>
  </SpotlightBeam>
</template>
```

## Catatan

- Berkas cahaya terdiri dari tiga gradien radial yang direntangkan dan diputar dari sumber cahaya. Tanpa filter SVG atau blur, jadi ringan dilukis.
- `variant="top-right"` mencerminkan berkas, `variant="center"` menyorot lurus ke bawah.
- `follow` menyimpan posisi pointer di variabel CSS pada root; cahaya bergeser paling jauh 4% lalu kembali pelan.
- Animasi masuk diputar sekali saat section pertama kali masuk layar. Dengan reduced motion berkas langsung tampil dan `follow` mati.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
