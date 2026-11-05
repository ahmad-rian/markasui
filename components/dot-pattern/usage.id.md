## Blade

```blade
<x-markas.dot-pattern mask="radial" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Bangun antarmuka yang terasa akrab</h2>
    <x-markas.button>Mulai sekarang</x-markas.button>
</x-markas.dot-pattern>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { DotPattern } from "@/components/markas/DotPattern";

<DotPattern
  mask="radial"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Bangun antarmuka yang terasa akrab
  </h2>
  <Button>Mulai sekarang</Button>
</DotPattern>;
```

## Vue

```vue
<template>
  <DotPattern
    mask="radial"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Bangun antarmuka yang terasa akrab
    </h2>
    <Button>Mulai sekarang</Button>
  </DotPattern>
</template>
```

## Catatan

- `spacing` dan `dotSize` dalam piksel. Pakai `color` untuk warna token dan `mask` untuk memudarkan tepi.
- Murni CSS: tanpa JavaScript dan tanpa animasi, jadi tidak membebani runtime.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
