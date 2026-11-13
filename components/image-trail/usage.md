## Blade

```blade
<x-markas.image-trail variant="scale" :threshold="48" class="grid h-72 place-items-center rounded-xl bg-subtle">
    <x-slot:items>
        <img src="/img/shoe-1.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/shoe-2.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/shoe-3.webp" alt="" class="w-20 rounded-lg" />
    </x-slot:items>
    <h2 class="text-2xl font-semibold">New season sneakers</h2>
</x-markas.image-trail>
```

Needs Alpine.js.

## React

```tsx
import { ImageTrail } from "@/components/markas/ImageTrail";

<ImageTrail
  variant="scale"
  threshold={48}
  className="grid h-72 place-items-center rounded-xl bg-subtle"
  items={
    <>
      <img src="/img/shoe-1.webp" alt="" className="w-20 rounded-lg" />
      <img src="/img/shoe-2.webp" alt="" className="w-20 rounded-lg" />
      <img src="/img/shoe-3.webp" alt="" className="w-20 rounded-lg" />
    </>
  }
>
  <h2 className="text-2xl font-semibold">New season sneakers</h2>
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
      <img src="/img/shoe-1.webp" alt="" class="w-20 rounded-lg" />
      <img src="/img/shoe-2.webp" alt="" class="w-20 rounded-lg" />
      <img src="/img/shoe-3.webp" alt="" class="w-20 rounded-lg" />
    </template>
    <h2 class="text-2xl font-semibold">New season sneakers</h2>
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

A small bundled script runs each trail through the `markas-image-trail` element.

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

## Notes

- Items are cloned in order to the pointer every `threshold` px. At most `max` clones live at once and finished ones are removed, so the DOM stays small.
- `variant`: `fade`, `scale`, `rotate` (the angle follows a fixed pattern, so every run looks the same), or `stack`, where items pile up until the pointer leaves.
- `autoplay` draws a figure-eight trail while the area is on screen and the pointer is elsewhere. It pauses when the area scrolls away or the tab is hidden.
- The trail sits behind the content and is aria-hidden. With reduced motion nothing is drawn. Attributes and `class` go to the area itself.
