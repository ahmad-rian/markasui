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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import DotPattern from "$lib/components/markas/DotPattern.svelte";
</script>

<DotPattern
  mask="radial"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Bangun antarmuka yang terasa akrab
  </h2>
  <Button>Mulai sekarang</Button>
</DotPattern>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import DotPattern from "@/components/markas/DotPattern.astro";
---

<DotPattern
  mask="radial"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Bangun antarmuka yang terasa akrab
  </h2>
  <Button>Mulai sekarang</Button>
</DotPattern>
```

Tanpa JavaScript di browser; markup dirender di server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { DotPattern } from "./markas/dot-pattern.component";

@Component({
  selector: "app-hero",
  imports: [Button, DotPattern],
  template: `
    <div
      markas-dot-pattern
      mask="radial"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Bangun antarmuka yang terasa akrab
      </h2>
      <button markas-button>Mulai sekarang</button>
    </div>
  `,
})
export class Hero {}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- `spacing` dan `dotSize` dalam piksel. Pakai `color` untuk warna token dan `mask` untuk memudarkan tepi.
- Murni CSS: tanpa JavaScript dan tanpa animasi, jadi tidak membebani runtime.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
