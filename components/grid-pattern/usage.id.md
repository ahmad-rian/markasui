## Blade

```blade
<x-markas.grid-pattern :cells="[[2, 1], [10, 3]]" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Rencanakan, bangun, dan rilis di satu tempat</h2>
    <x-markas.button>Mulai sekarang</x-markas.button>
</x-markas.grid-pattern>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { GridPattern } from "@/components/markas/GridPattern";

<GridPattern
  cells={[
    [2, 1],
    [10, 3],
  ]}
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Rencanakan, bangun, dan rilis di satu tempat
  </h2>
  <Button>Mulai sekarang</Button>
</GridPattern>;
```

## Vue

```vue
<template>
  <GridPattern
    :cells="[
      [2, 1],
      [10, 3],
    ]"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Rencanakan, bangun, dan rilis di satu tempat
    </h2>
    <Button>Mulai sekarang</Button>
  </GridPattern>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import GridPattern from "$lib/components/markas/GridPattern.svelte";
</script>

<GridPattern
  cells={[
    [2, 1],
    [10, 3],
  ]}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Rencanakan, bangun, dan rilis di satu tempat
  </h2>
  <Button>Mulai sekarang</Button>
</GridPattern>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import GridPattern from "@/components/markas/GridPattern.astro";
---

<GridPattern
  cells={[
    [2, 1],
    [10, 3],
  ]}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Rencanakan, bangun, dan rilis di satu tempat
  </h2>
  <Button>Mulai sekarang</Button>
</GridPattern>
```

Tanpa JavaScript di browser; markup dirender di server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { GridPattern } from "./markas/grid-pattern.component";

@Component({
  selector: "app-hero",
  imports: [Button, GridPattern],
  template: `
    <div
      markas-grid-pattern
      [cells]="cells"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Rencanakan, bangun, dan rilis di satu tempat
      </h2>
      <button markas-button>Mulai sekarang</button>
    </div>
  `,
})
export class Hero {
  readonly cells: [number, number][] = [
    [2, 1],
    [10, 3],
  ];
}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- `cells` menerima pasangan `[kolom, baris]` dari kiri atas, mulai 0.
- Sel sorotan berdenyut bergantian. Dengan reduced motion sel diam.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
