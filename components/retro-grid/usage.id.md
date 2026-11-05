## Blade

```blade
<x-markas.retro-grid :cell-size="48" color="primary" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Rilis masa depan</h2>
    <x-markas.button>Mulai sekarang</x-markas.button>
</x-markas.retro-grid>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { RetroGrid } from "@/components/markas/RetroGrid";

<RetroGrid
  cellSize={48}
  color="primary"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">Rilis masa depan</h2>
  <Button>Mulai sekarang</Button>
</RetroGrid>;
```

## Vue

```vue
<template>
  <RetroGrid
    :cell-size="48"
    color="primary"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">Rilis masa depan</h2>
    <Button>Mulai sekarang</Button>
  </RetroGrid>
</template>
```

## Catatan

- Beri komponen tinggi yang cukup (minimal 240px) supaya perspektif punya ruang.
- Grid bergerak satu sel per detik ke arah penonton. Dengan reduced motion grid berhenti.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
