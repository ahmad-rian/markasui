## Blade

```blade
<x-markas.background-boxes variant="skewed" :rows="12" :cols="18" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Design in blocks</h2>
</x-markas.background-boxes>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { BackgroundBoxes } from "@/components/markas/BackgroundBoxes";

<BackgroundBoxes
  variant="skewed"
  rows={12}
  cols={18}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">Design in blocks</h2>
</BackgroundBoxes>;
```

## Vue

```vue
<template>
  <BackgroundBoxes
    variant="skewed"
    :rows="12"
    :cols="18"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">Design in blocks</h2>
  </BackgroundBoxes>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import BackgroundBoxes from "$lib/components/markas/BackgroundBoxes.svelte";
</script>

<BackgroundBoxes
  variant="skewed"
  rows={12}
  cols={18}
  class="rounded-xl bg-surface px-6 py-16"
>
  <h2 class="text-center text-3xl font-bold text-ink">Design in blocks</h2>
</BackgroundBoxes>
```

## Astro

```astro
---
import BackgroundBoxes from "@/components/markas/BackgroundBoxes.astro";
---

<BackgroundBoxes
  variant="skewed"
  rows={12}
  cols={18}
  class="rounded-xl bg-surface px-6 py-16"
>
  <h2 class="text-center text-3xl font-bold text-ink">Design in blocks</h2>
</BackgroundBoxes>
```

No client-side JavaScript; the markup is rendered on the server.

## Angular

```ts
import { Component } from "@angular/core";
import { BackgroundBoxes } from "./markas/background-boxes.component";

@Component({
  selector: "app-hero",
  imports: [BackgroundBoxes],
  template: `
    <div
      markas-background-boxes
      variant="skewed"
      [rows]="12"
      [cols]="18"
      class="rounded-xl bg-surface px-6 py-16"
    >
      <h2 class="text-center text-3xl font-bold text-ink">Design in blocks</h2>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- Tiles light up with plain CSS `:hover` and fade back over one second. Touch screens see the few tiles that glow on their own.
- The content wrapper lets the pointer through to the grid. Links, buttons, labels, and form fields stay clickable; text inside the content cannot be selected with the mouse.
- Keep rows times cols small: the grid stops at 600 tiles.
- The component has no built-in text, so there are no label props to translate.
