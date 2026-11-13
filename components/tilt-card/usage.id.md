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

## Svelte

```svelte
<script lang="ts">
  import TiltCard from "$lib/components/markas/TiltCard.svelte";
</script>

<TiltCard maxAngle={8} class="border border-line bg-surface p-6">
  <div data-depth="20">Pro plan</div>
</TiltCard>
```

## Astro

```astro
---
import TiltCard from "@/components/markas/TiltCard.astro";
---

<TiltCard maxAngle={8} class="border border-line bg-surface p-6">
  <div data-depth="20">Pro plan</div>
</TiltCard>
```

Satu script kecil yang dibundel melayani semua kartu di halaman.

## Angular

```ts
import { Component } from "@angular/core";
import { TiltCard } from "./markas/tilt-card.component";

@Component({
  selector: "app-plan",
  imports: [TiltCard],
  template: `
    <markas-tilt-card [maxAngle]="8" class="border border-line bg-surface p-6">
      <div data-depth="20">Pro plan</div>
    </markas-tilt-card>
  `,
})
export class Plan {}
```

## Catatan

- Kartu berputar hingga `maxAngle` derajat ke arah kursor lewat custom property `--tilt-x` dan `--tilt-y`, lalu kembali halus saat kursor keluar.
- Anak dengan `data-depth="16"` bergeser hingga 16px untuk parallax. Pakai pada satu atau dua elemen.
- Fokus keyboard pada tautan atau tombol di dalam kartu membuat kartu sedikit terangkat. Dengan reduced motion kartu tetap datar.
- `glare={false}` menghapus cahaya bergerak. Atribut dan `class` jatuh ke kartu itu sendiri.
