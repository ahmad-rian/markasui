## Blade

```blade
<x-markas.grid-pattern :cells="[[2, 1], [10, 3]]" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Plan, build, and ship in one place</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.grid-pattern>
```

No JavaScript or Alpine.js needed.

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
    Plan, build, and ship in one place
  </h2>
  <Button>Get started</Button>
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
      Plan, build, and ship in one place
    </h2>
    <Button>Get started</Button>
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
    Plan, build, and ship in one place
  </h2>
  <Button>Get started</Button>
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
    Plan, build, and ship in one place
  </h2>
  <Button>Get started</Button>
</GridPattern>
```

No client-side JavaScript; the markup is rendered on the server.

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
        Plan, build, and ship in one place
      </h2>
      <button markas-button>Get started</button>
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

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- `cells` takes `[column, row]` pairs counted from the top left, starting at 0.
- Highlighted cells pulse one after another. With reduced motion they stay still.
- The component has no built-in text, so there are no label props to translate.
