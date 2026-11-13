## Blade

```blade
<x-markas.drag-elements :seed="4" class="h-80 rounded-xl border border-line bg-subtle" role="group" aria-label="Moodboard">
    <div class="w-44 rounded-lg bg-surface p-4">Brand refresh</div>
    <span class="rounded-full bg-primary px-4 py-2 text-on-primary">Kopi susu</span>
    <span data-x="90" data-y="10" data-rotate="8" class="rounded-md border border-line bg-surface px-3 py-1.5">Batik pattern</span>
</x-markas.drag-elements>
```

Needs Alpine.js.

## React

```tsx
import { DragElements } from "@/components/markas/DragElements";

<DragElements
  release="return"
  className="h-80 rounded-xl border border-line bg-subtle"
  role="group"
  aria-label="Skills"
>
  <span className="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
  <span className="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
</DragElements>;
```

## Vue

```vue
<template>
  <DragElements
    release="stay"
    :rotate="0"
    class="h-80 rounded-xl border border-line bg-canvas"
    role="group"
    aria-label="Team"
  >
    <div data-x="8" data-y="10" class="w-48 rounded-xl bg-surface p-3">
      Rania Putri
    </div>
    <div data-x="92" data-y="30" class="w-48 rounded-xl bg-surface p-3">
      Bima Saputra
    </div>
  </DragElements>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import DragElements from "$lib/components/markas/DragElements.svelte";
</script>

<DragElements
  release="return"
  class="h-80 rounded-xl border border-line bg-subtle"
  role="group"
  aria-label="Skills"
>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
</DragElements>
```

## Astro

```astro
---
import DragElements from "@/components/markas/DragElements.astro";
---

<DragElements
  release="return"
  class="h-80 rounded-xl border border-line bg-subtle"
  role="group"
  aria-label="Skills"
>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
</DragElements>
```

Each area is a small custom element, so it keeps working after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { DragElements } from "./markas/drag-elements.component";

@Component({
  selector: "app-skills",
  imports: [DragElements],
  template: `
    <markas-drag-elements
      release="return"
      class="h-80 rounded-xl border border-line bg-subtle"
      role="group"
      aria-label="Skills"
    >
      <span class="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
      <span class="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
    </markas-drag-elements>
  `,
})
export class Skills {}
```

`role`, `aria-label`, and `class` move from the host to the area.

## Notes

- Each direct child becomes draggable and is placed at a seeded spot inside the area. `data-x` and `data-y` (0 to 100) and `data-rotate` on a child pin its start.
- `release="inertia"` glides on and bounces off the edges, `"stay"` stops where it is dropped, `"return"` springs back home.
- Focus an item with Tab, move it with the arrow keys (Shift for bigger steps), and press Escape to put it back. The item you touch comes to the front.
- Give the area a height. Items never leave it. Positions are not saved; use it for play, not for real ordering.
- Change the screen reader hint with `hintLabel`.
