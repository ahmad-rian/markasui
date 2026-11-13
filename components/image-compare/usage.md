## Blade

```blade
<x-markas.image-compare aria-label="Living room renovation" :position="40">
    <x-slot:before>
        <img src="/img/before.jpg" alt="Living room before renovation" class="aspect-video size-full object-cover" />
    </x-slot:before>
    <x-slot:after>
        <img src="/img/after.jpg" alt="Living room after renovation" class="aspect-video size-full object-cover" />
    </x-slot:after>
</x-markas.image-compare>
```

Needs Alpine.js. The component dispatches `position-change` with the new percent.

## React

```tsx
import { ImageCompare } from "@/components/markas/ImageCompare";

<ImageCompare
  aria-label="Living room renovation"
  defaultPosition={40}
  before={<img src="/img/before.jpg" alt="Living room before renovation" />}
  after={<img src="/img/after.jpg" alt="Living room after renovation" />}
/>;
```

## Vue

```vue
<template>
  <ImageCompare v-model:position="position" aria-label="Living room renovation">
    <template #before
      ><img src="/img/before.jpg" alt="Living room before renovation"
    /></template>
    <template #after
      ><img src="/img/after.jpg" alt="Living room after renovation"
    /></template>
  </ImageCompare>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ImageCompare from "$lib/components/markas/ImageCompare.svelte";

  let position = $state(50);
</script>

<ImageCompare bind:position aria-label="Kitchen renovation">
  {#snippet before()}<img src="/img/kitchen-old.webp" alt="" />{/snippet}
  {#snippet after()}<img src="/img/kitchen-new.webp" alt="" />{/snippet}
</ImageCompare>
```

## Astro

```astro
---
import ImageCompare from "@/components/markas/ImageCompare.astro";
---

<ImageCompare aria-label="Kitchen renovation">
  <img slot="before" src="/img/kitchen-old.webp" alt="" />
  <img slot="after" src="/img/kitchen-new.webp" alt="" />
</ImageCompare>
```

A small bundled script serves every comparison on the page and dispatches `position-change`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { ImageCompare } from "./markas/image-compare.component";

@Component({
  selector: "app-renovation",
  imports: [ImageCompare],
  template: `
    <markas-image-compare
      [(position)]="position"
      aria-label="Kitchen renovation"
    >
      <img before src="/img/kitchen-old.webp" alt="" />
      <img after src="/img/kitchen-new.webp" alt="" />
    </markas-image-compare>
  `,
})
export class Renovation {
  readonly position = signal(50);
}
```

## Notes

- Before sits on the left (or top with `orientation="vertical"`), after on the right (or bottom). Give both the same size.
- Drag anywhere, click a spot, or focus the handle and use the arrow keys, Page Up/Down, Home, and End.
- Any content works: img, picture, svg, or plain markup such as an old and a new UI.
- Attributes and `class` go to the outer element.
