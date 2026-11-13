## Blade

```blade
<x-markas.screensaver class="h-44 rounded-lg bg-subtle" aria-hidden="true">
    <span class="flex items-center gap-2 text-3xl font-bold">
        <svg class="size-8" aria-hidden="true">...</svg>404
    </span>
</x-markas.screensaver>
```

Needs Alpine.js.

## React

```tsx
import { Screensaver } from "@/components/markas/Screensaver";

<Screensaver
  effect="squash"
  speed={50}
  className="h-32 w-36 rounded-lg bg-subtle"
  aria-hidden="true"
>
  <span className="grid size-12 place-items-center rounded-xl bg-surface">
    ...
  </span>
</Screensaver>;
```

## Vue

```vue
<template>
  <Screensaver
    :speed="60"
    :tones="['success', 'warning']"
    class="h-52 rounded-lg bg-canvas"
  >
    <span class="flex items-center gap-2 rounded-full bg-surface px-3 py-1">
      <span class="size-2.5 rounded-full bg-current"></span>
      <span class="text-ink">Rania Putri</span>
    </span>
  </Screensaver>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Screensaver from "$lib/components/markas/Screensaver.svelte";
</script>

<Screensaver class="h-56 rounded-xl border border-line" aria-hidden="true">
  <span class="text-3xl font-bold">Markas</span>
</Screensaver>
```

## Astro

```astro
---
import Screensaver from "@/components/markas/Screensaver.astro";
---

<Screensaver class="h-56 rounded-xl border border-line" aria-hidden="true">
  <span class="text-3xl font-bold">Markas</span>
</Screensaver>
```

A small bundled script runs each area through the `markas-screensaver` element.

## Angular

```ts
import { Component } from "@angular/core";
import { Screensaver } from "./markas/screensaver.component";

@Component({
  selector: "app-idle",
  imports: [Screensaver],
  template: `
    <markas-screensaver
      effect="squash"
      class="h-56 rounded-xl border border-line"
      aria-hidden="true"
    >
      <span class="text-3xl font-bold">Markas</span>
    </markas-screensaver>
  `,
})
export class Idle {}
```

## Notes

- Each direct child starts at a seeded spot and bounces off the walls at `speed` px per second. Give the area a height.
- `effect="tone"` switches each element to the next token in `tones` on every wall hit; color the parts that should change with `currentColor` (such as `bg-current` or an SVG stroke). `effect="squash"` squashes and stretches instead, `"none"` just bounces.
- Motion pauses while the area is off screen, the tab is hidden, something inside has focus, or (with `pauseOnHover`) the pointer is over it.
- With reduced motion every element rests at its seeded spot in its first tone.
