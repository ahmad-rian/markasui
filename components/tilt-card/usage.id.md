## Blade

```blade
<x-markas.tilt-card :max-angle="12" class="w-72 border border-line bg-surface p-5">
    <img data-depth="16" src="/img/headphones.png" alt="" class="rounded-lg" />
    <p class="mt-4 font-semibold">Headphone studio</p>
    <x-markas.button>Tambah ke keranjang</x-markas.button>
</x-markas.tilt-card>
```

Butuh Alpine.js.

## React

```tsx
import { TiltCard } from "@/components/markas/TiltCard";

<TiltCard maxAngle={12} className="w-72 border border-line bg-surface p-5">
  <img
    data-depth="16"
    src="/img/headphones.png"
    alt=""
    className="rounded-lg"
  />
  <p className="mt-4 font-semibold">Headphone studio</p>
</TiltCard>;
```

## Vue

```vue
<template>
  <TiltCard :max-angle="12" class="w-72 border border-line bg-surface p-5">
    <img data-depth="16" src="/img/headphones.png" alt="" class="rounded-lg" />
    <p class="mt-4 font-semibold">Headphone studio</p>
  </TiltCard>
</template>
```

## Catatan

- Kartu berputar hingga `maxAngle` derajat ke arah kursor lewat custom property `--tilt-x` dan `--tilt-y`, lalu kembali halus saat kursor keluar.
- Anak dengan `data-depth="16"` bergeser hingga 16px untuk parallax. Pakai pada satu atau dua elemen.
- Fokus keyboard pada tautan atau tombol di dalam kartu membuat kartu sedikit terangkat. Dengan reduced motion kartu tetap datar.
- `glare={false}` menghapus cahaya bergerak. Atribut dan `class` jatuh ke kartu itu sendiri.
