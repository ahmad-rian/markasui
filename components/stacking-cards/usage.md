## Blade

```blade
<div class="pb-64">
    <x-markas.stacking-cards variant="fan" :top="96" :offset="12" class="gap-6">
        <article class="h-64 rounded-xl border border-line bg-surface p-6">Plan your week</article>
        <article class="h-64 rounded-xl border border-line bg-surface p-6">Share with your team</article>
        <article class="h-64 rounded-xl border border-line bg-surface p-6">Get paid on time</article>
    </x-markas.stacking-cards>
</div>
```

Needs Alpine.js.

## React

```tsx
import { StackingCards } from "@/components/markas/StackingCards";

<div className="pb-64">
  <StackingCards variant="fan" top={96} offset={12} className="gap-6">
    <article className="h-64 rounded-xl border border-line bg-surface p-6">
      Plan your week
    </article>
    <article className="h-64 rounded-xl border border-line bg-surface p-6">
      Share with your team
    </article>
    <article className="h-64 rounded-xl border border-line bg-surface p-6">
      Get paid on time
    </article>
  </StackingCards>
</div>;
```

## Vue

```vue
<template>
  <div class="pb-64">
    <StackingCards variant="fan" :top="96" :offset="12" class="gap-6">
      <article class="h-64 rounded-xl border border-line bg-surface p-6">
        Plan your week
      </article>
      <article class="h-64 rounded-xl border border-line bg-surface p-6">
        Share with your team
      </article>
      <article class="h-64 rounded-xl border border-line bg-surface p-6">
        Get paid on time
      </article>
    </StackingCards>
  </div>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import StackingCards from "$lib/components/markas/StackingCards.svelte";
</script>

<StackingCards variant="fan" class="gap-4">
  <article class="h-48 rounded-xl border border-line bg-surface p-5">
    One
  </article>
  <article class="h-48 rounded-xl border border-line bg-surface p-5">
    Two
  </article>
</StackingCards>
```

## Astro

```astro
---
import StackingCards from "@/components/markas/StackingCards.astro";
---

<StackingCards variant="fan" class="gap-4">
  <article class="h-48 rounded-xl border border-line bg-surface p-5">One</article>
  <article class="h-48 rounded-xl border border-line bg-surface p-5">Two</article>
</StackingCards>
```

A small bundled script measures each stack through the `markas-stacking-cards` element.

## Angular

```ts
import { Component } from "@angular/core";
import { StackingCards } from "./markas/stacking-cards.component";

@Component({
  selector: "app-features",
  imports: [StackingCards],
  template: `
    <markas-stacking-cards variant="fan" class="gap-4">
      <article class="h-48 rounded-xl border border-line bg-surface p-5">
        One
      </article>
      <article class="h-48 rounded-xl border border-line bg-surface p-5">
        Two
      </article>
    </markas-stacking-cards>
  `,
})
export class Features {}
```

## Notes

- Every direct child is a card. Cards stick at `top` plus `offset` per card, so earlier cards peek out above the later ones.
- `--stack-depth` on each card says how much the later cards already cover it. `scale` shrinks and dims, `fan` tilts left and right, `blur` blurs and dims.
- The scroll listener is passive, batched into one requestAnimationFrame, and only attached while the stack is on screen. It works in the page and inside any scrolling container.
- A card holding keyboard focus jumps to the front at full size. With reduced motion the cards still stick but never change. Attributes and `class` go to the stack.
