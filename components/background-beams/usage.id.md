## Blade

```blade
<x-markas.background-beams variant="flow" :count="10" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Luncurkan dengan gemerlap</h2>
</x-markas.background-beams>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { BackgroundBeams } from "@/components/markas/BackgroundBeams";

<BackgroundBeams
  variant="flow"
  count={10}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">
    Luncurkan dengan gemerlap
  </h2>
</BackgroundBeams>;
```

## Vue

```vue
<template>
  <BackgroundBeams
    variant="flow"
    :count="10"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">
      Luncurkan dengan gemerlap
    </h2>
  </BackgroundBeams>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import BackgroundBeams from "$lib/components/markas/BackgroundBeams.svelte";
</script>

<BackgroundBeams
  variant="flow"
  count={10}
  class="rounded-xl bg-surface px-6 py-16"
>
  <h2 class="text-center text-3xl font-bold text-ink">
    Luncurkan dengan gemerlap
  </h2>
</BackgroundBeams>
```

## Astro

```astro
---
import BackgroundBeams from "@/components/markas/BackgroundBeams.astro";
---

<BackgroundBeams
  variant="flow"
  count={10}
  class="rounded-xl bg-surface px-6 py-16"
>
  <h2 class="text-center text-3xl font-bold text-ink">
    Luncurkan dengan gemerlap
  </h2>
</BackgroundBeams>
```

Tanpa JavaScript di browser; markup dirender di server.

## Angular

```ts
import { Component } from "@angular/core";
import { BackgroundBeams } from "./markas/background-beams.component";

@Component({
  selector: "app-hero",
  imports: [BackgroundBeams],
  template: `
    <div
      markas-background-beams
      variant="flow"
      [count]="10"
      class="rounded-xl bg-surface px-6 py-16"
    >
      <h2 class="text-center text-3xl font-bold text-ink">
        Luncurkan dengan gemerlap
      </h2>
    </div>
  `,
})
export class Hero {}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- `flow` mengalirkan kilau di sepanjang kurva, `pulse` memudarkan kurva bergantian, `collide` menjatuhkan berkas vertikal yang memercik di tepi bawah.
- Dengan `collide`, beri padding bawah (misalnya `pb-16`) supaya percikan jatuh di bawah konten.
- Posisi berkas berasal dari rumus, jadi semua framework menghasilkan gambar yang sama.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
