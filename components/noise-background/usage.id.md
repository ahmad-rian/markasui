## Blade

```blade
<x-markas.noise-background color="warning" class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">Alat desain dengan sedikit tekstur</h2>
    <x-markas.button>Unduh kit</x-markas.button>
</x-markas.noise-background>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { NoiseBackground } from "@/components/markas/NoiseBackground";

<NoiseBackground
  color="warning"
  className="rounded-xl border border-line bg-surface px-6 py-14"
>
  <h2 className="text-3xl font-semibold text-ink">
    Alat desain dengan sedikit tekstur
  </h2>
  <Button>Unduh kit</Button>
</NoiseBackground>;
```

## Vue

```vue
<template>
  <NoiseBackground
    color="warning"
    class="rounded-xl border border-line bg-surface px-6 py-14"
  >
    <h2 class="text-3xl font-semibold text-ink">
      Alat desain dengan sedikit tekstur
    </h2>
    <Button>Unduh kit</Button>
  </NoiseBackground>
</template>
```

## Catatan

- Tekstur berupa satu tile SVG `feTurbulence` yang disisipkan sebagai data URL dan dipakai sebagai mask CSS di atas token `ink`, jadi ikut mode terang dan gelap. Browser merendernya sekali lalu mengulangnya.
- Hanya gradien di bawah tekstur yang bergerak, lewat transform pelan. Butirannya statis, jadi tidak ada kerja per frame.
- `variant="film"` menambah vignette yang menggelapkan tepi di kedua tema.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
