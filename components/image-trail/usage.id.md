## Blade

```blade
<x-markas.image-trail variant="scale" :threshold="48" class="grid h-72 place-items-center rounded-xl bg-subtle">
    <x-slot:items>
        <img src="/img/sepatu-1.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/sepatu-2.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/sepatu-3.webp" alt="" class="w-20 rounded-lg" />
    </x-slot:items>
    <h2 class="text-2xl font-semibold">Sneakers musim baru</h2>
</x-markas.image-trail>
```

Butuh Alpine.js.

## React

```tsx
import { ImageTrail } from "@/components/markas/ImageTrail";

<ImageTrail
  variant="scale"
  threshold={48}
  className="grid h-72 place-items-center rounded-xl bg-subtle"
  items={
    <>
      <img src="/img/sepatu-1.webp" alt="" className="w-20 rounded-lg" />
      <img src="/img/sepatu-2.webp" alt="" className="w-20 rounded-lg" />
      <img src="/img/sepatu-3.webp" alt="" className="w-20 rounded-lg" />
    </>
  }
>
  <h2 className="text-2xl font-semibold">Sneakers musim baru</h2>
</ImageTrail>;
```

## Vue

```vue
<template>
  <ImageTrail
    variant="scale"
    :threshold="48"
    class="grid h-72 place-items-center rounded-xl bg-subtle"
  >
    <template #items>
      <img src="/img/sepatu-1.webp" alt="" class="w-20 rounded-lg" />
      <img src="/img/sepatu-2.webp" alt="" class="w-20 rounded-lg" />
      <img src="/img/sepatu-3.webp" alt="" class="w-20 rounded-lg" />
    </template>
    <h2 class="text-2xl font-semibold">Sneakers musim baru</h2>
  </ImageTrail>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ImageTrail from "$lib/components/markas/ImageTrail.svelte";
</script>

<ImageTrail
  variant="scale"
  threshold={48}
  class="grid h-72 place-items-center rounded-xl bg-subtle"
>
  {#snippet items()}
    <img src="/img/shoe-1.webp" alt="" class="w-20 rounded-lg" />
    <img src="/img/shoe-2.webp" alt="" class="w-20 rounded-lg" />
  {/snippet}
  <h2 class="text-2xl font-semibold">New season sneakers</h2>
</ImageTrail>
```

## Astro

```astro
---
import ImageTrail from "@/components/markas/ImageTrail.astro";
---

<ImageTrail
  variant="scale"
  threshold={48}
  class="grid h-72 place-items-center rounded-xl bg-subtle"
>
  <Fragment slot="items">
    <img src="/img/shoe-1.webp" alt="" class="w-20 rounded-lg" />
    <img src="/img/shoe-2.webp" alt="" class="w-20 rounded-lg" />
  </Fragment>
  <h2 class="text-2xl font-semibold">New season sneakers</h2>
</ImageTrail>
```

Satu script kecil yang dibundel menjalankan setiap jejak lewat elemen `markas-image-trail`.

## Angular

```ts
import { Component } from "@angular/core";
import { ImageTrail } from "./markas/image-trail.component";

@Component({
  selector: "app-sneakers",
  imports: [ImageTrail],
  template: `
    <markas-image-trail
      variant="scale"
      [threshold]="48"
      class="grid h-72 place-items-center rounded-xl bg-subtle"
    >
      <ng-container items>
        <img src="/img/shoe-1.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/shoe-2.webp" alt="" class="w-20 rounded-lg" />
      </ng-container>
      <h2 class="text-2xl font-semibold">New season sneakers</h2>
    </markas-image-trail>
  `,
})
export class Sneakers {}
```

## Catatan

- Elemen digandakan bergantian ke posisi kursor setiap `threshold` px. Paling banyak `max` salinan hidup sekaligus dan yang selesai dihapus, sehingga DOM tetap kecil.
- `variant`: `fade`, `scale`, `rotate` (sudutnya mengikuti pola tetap, jadi setiap putaran terlihat sama), atau `stack`, tempat elemen menumpuk sampai kursor keluar.
- `autoplay` menggambar jejak angka delapan selama area terlihat dan kursor di tempat lain. Berhenti saat area tergulir keluar atau tab disembunyikan.
- Jejak berada di belakang konten dan bersifat aria-hidden. Dengan reduced motion tidak ada yang digambar. Atribut dan `class` jatuh ke area itu sendiri.
