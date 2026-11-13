## Blade

```blade
<div class="relative grid h-80 place-items-center overflow-hidden rounded-xl bg-canvas">
    <x-markas.float :parallax="14" aria-hidden="true" class="absolute inset-0">
        <span class="absolute top-[12%] left-[10%] rounded-xl bg-surface p-3">...</span>
        <span class="absolute right-[12%] bottom-[16%] rounded-xl bg-surface p-3">...</span>
    </x-markas.float>
    <h1 class="relative text-2xl font-semibold">Luncurkan idenya minggu ini</h1>
</div>
```

Butuh Alpine.js.

## React

```tsx
import { Float } from "@/components/markas/Float";

<Float
  motion="bob"
  amplitude={6}
  duration={3}
  className="absolute -top-3 right-5"
>
  <span className="rounded-full bg-primary px-3 py-1 text-xs text-on-primary">
    Hemat 20%
  </span>
</Float>;
```

## Vue

```vue
<template>
  <Float
    motion="orbit"
    :amplitude="8"
    entrance
    aria-hidden="true"
    class="absolute inset-0"
  >
    <span
      class="absolute top-[14%] left-[18%] size-12 rounded-full bg-primary-soft"
      >RP</span
    >
    <span
      class="absolute right-[14%] bottom-[18%] size-14 rounded-full bg-primary"
      >DP</span
    >
  </Float>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Float from "$lib/components/markas/Float.svelte";
</script>

<Float motion="bob" amplitude={6} duration={3} class="absolute -top-3 right-5">
  <span class="rounded-full bg-primary px-3 py-1 text-xs text-on-primary">
    Save 20%
  </span>
</Float>
```

## Astro

```astro
---
import Float from "@/components/markas/Float.astro";
---

<Float motion="bob" amplitude={6} duration={3} class="absolute -top-3 right-5">
  <span class="rounded-full bg-primary px-3 py-1 text-xs text-on-primary">
    Save 20%
  </span>
</Float>
```

Setiap grup adalah custom element kecil, jadi tetap jalan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { Float } from "./markas/float.component";

@Component({
  selector: "app-save-badge",
  imports: [Float],
  template: `
    <markas-float
      motion="bob"
      [amplitude]="6"
      [duration]="3"
      class="absolute -top-3 right-5"
    >
      <span class="rounded-full bg-primary px-3 py-1 text-xs text-on-primary">
        Save 20%
      </span>
    </markas-float>
  `,
})
export class SaveBadge {}
```

`aria-hidden` dan `class` pindah dari host ke grup.

## Catatan

- Setiap anak langsung melayang dengan ritmenya sendiri. `motion` memilih jalurnya: `drift` (angka delapan dengan sedikit goyang), `bob` (naik turun), `orbit` (lingkaran kecil), atau `breathe` (membesar lembut).
- Waktu, ukuran, dan arah berbeda per anak dari `seed`, sehingga seed yang sama terlihat sama di Blade, React, dan Vue.
- `parallax` menggeser anak ke arah kursor. Pasang `data-depth="0.2"` sampai `"1"` pada anak untuk mengatur seberapa jauh ia bergerak.
- `entrance` memunculkan anak satu per satu saat grup pertama kali masuk layar.
- Anak berhenti saat disorot kursor atau difokus, dan semua putaran berhenti di luar layar. Putaran menganimasikan `transform` pada setiap anak; bungkus anak yang butuh utilitas transform sendiri.
