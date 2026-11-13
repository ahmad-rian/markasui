## Blade

```blade
<x-markas.hover-card>
    <a href="https://github.com/markasui">@markasui</a>
    <x-slot:content>
        <p class="font-medium text-ink">Markas UI</p>
        <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
    </x-slot:content>
</x-markas.hover-card>
```

Butuh Alpine.js.

## React

```tsx
import { HoverCard } from "@/components/markas/HoverCard";

<HoverCard
  content={
    <>
      <p className="font-medium text-ink">Markas UI</p>
      <p className="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
    </>
  }
>
  <a href="https://github.com/markasui">@markasui</a>
</HoverCard>;
```

## Vue

```vue
<template>
  <HoverCard>
    <a href="https://github.com/markasui">@markasui</a>
    <template #content>
      <p class="font-medium text-ink">Markas UI</p>
      <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
    </template>
  </HoverCard>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import HoverCard from "$lib/components/markas/HoverCard.svelte";
</script>

<HoverCard>
  <a href="https://github.com/markasui">@markasui</a>
  {#snippet content()}
    <p class="font-medium text-ink">Markas UI</p>
    <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
  {/snippet}
</HoverCard>
```

## Astro

```astro
---
import HoverCard from "@/components/markas/HoverCard.astro";
---

<HoverCard>
  <a href="https://github.com/markasui">@markasui</a>
  <Fragment slot="content">
    <p class="font-medium text-ink">Markas UI</p>
    <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
  </Fragment>
</HoverCard>
```

Setiap kartu dibungkus custom element kecil `markas-hover-card` dengan `display: contents`, jadi tetap jalan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { HoverCard } from "./markas/hover-card.component";

@Component({
  selector: "app-maintainer",
  imports: [HoverCard],
  template: `
    <markas-hover-card>
      <a href="https://github.com/markasui">&#64;markasui</a>
      <ng-container content>
        <p class="font-medium text-ink">Markas UI</p>
        <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
      </ng-container>
    </markas-hover-card>
  `,
})
export class Maintainer {}
```

## Catatan

- Elemen pertama di dalam HoverCard adalah pemicu dan otomatis mendapat `aria-describedby` ke kartu.
- Kartu muncul di bawah pemicu dan pindah ke atas bila tidak ada ruang.
- Di dalam paragraf, isi kartu cukup elemen inline (span, a, strong), karena `div` atau `p` akan memecah paragraf pada HTML hasil render server.
- Hover Card tidak punya teks bawaan. Tulis isinya dalam bahasa situs Anda.
