## Blade

```blade
<x-markas.retro-grid :cell-size="48" color="primary" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.retro-grid>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { RetroGrid } from "@/components/markas/RetroGrid";

<RetroGrid
  cellSize={48}
  color="primary"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">Ship the future</h2>
  <Button>Get started</Button>
</RetroGrid>;
```

## Vue

```vue
<template>
  <RetroGrid
    :cell-size="48"
    color="primary"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
    <Button>Get started</Button>
  </RetroGrid>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import RetroGrid from "$lib/components/markas/RetroGrid.svelte";
</script>

<RetroGrid
  cellSize={48}
  color="primary"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
  <Button>Get started</Button>
</RetroGrid>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import RetroGrid from "@/components/markas/RetroGrid.astro";
---

<RetroGrid
  cellSize={48}
  color="primary"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
  <Button>Get started</Button>
</RetroGrid>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { RetroGrid } from "./markas/retro-grid.component";

@Component({
  selector: "app-beta",
  imports: [Button, RetroGrid],
  template: `
    <div
      markas-retro-grid
      cellSize="48"
      color="primary"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
      <button markas-button>Get started</button>
    </div>
  `,
})
export class Beta {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- Give the component some height (at least 240px) so the perspective has room.
- The grid moves one cell per second toward the viewer. With reduced motion it stops.
- The component has no built-in text, so there are no label props to translate.
