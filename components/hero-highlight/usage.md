## Blade

```blade
<x-markas.hero-highlight class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">Stop guessing. <mark>Start measuring</mark> what users love.</h2>
</x-markas.hero-highlight>
```

Needs Alpine.js for the pointer glow and to start drawing the marks.

## React

```tsx
import { HeroHighlight } from "@/components/markas/HeroHighlight";

<HeroHighlight className="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 className="text-3xl font-semibold text-ink">
    Stop guessing. <mark>Start measuring</mark> what users love.
  </h2>
</HeroHighlight>;
```

## Vue

```vue
<template>
  <HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">
      Stop guessing. <mark>Start measuring</mark> what users love.
    </h2>
  </HeroHighlight>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import HeroHighlight from "$lib/components/markas/HeroHighlight.svelte";
</script>

<HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 class="text-3xl font-semibold text-ink">
    Stop guessing. <mark>Start measuring</mark> what users love.
  </h2>
</HeroHighlight>
```

## Astro

```astro
---
import HeroHighlight from "@/components/markas/HeroHighlight.astro";
---

<HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 class="text-3xl font-semibold text-ink">
    Stop guessing. <mark>Start measuring</mark> what users love.
  </h2>
</HeroHighlight>
```

A small bundled script starts the entrance per instance. It also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { HeroHighlight } from "./markas/hero-highlight.component";

@Component({
  selector: "app-hero",
  imports: [HeroHighlight],
  template: `
    <div
      markas-hero-highlight
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <h2 class="text-3xl font-semibold text-ink">
        Stop guessing. <mark>Start measuring</mark> what users love.
      </h2>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- Any `<mark>` inside the component gets the highlight. There is no separate child component, so the markup is the same in every framework.
- The pointer position is stored in CSS variables; a radial mask reveals the bright grid around it. No canvas and no animation loop.
- Marks draw once, the first time the section scrolls into view. With reduced motion they are fully highlighted right away.
- The component has no built-in text, so there are no label props to translate.
