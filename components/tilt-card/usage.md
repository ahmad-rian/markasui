## Blade

```blade
<x-markas.tilt-card :max-angle="12" class="w-72 border border-line bg-surface p-5">
    <img data-depth="16" src="/img/headphones.png" alt="" class="rounded-lg" />
    <p class="mt-4 font-semibold">Studio headphones</p>
    <x-markas.button>Add to cart</x-markas.button>
</x-markas.tilt-card>
```

Needs Alpine.js.

## React

```tsx
import { TiltCard } from "@/components/markas/TiltCard";

<TiltCard maxAngle={12} className="w-72 border border-line bg-surface p-5">
  <img
    data-depth="16"
    src="/img/headphones.png"
    alt=""
    className="rounded-lg"
  />
  <p className="mt-4 font-semibold">Studio headphones</p>
</TiltCard>;
```

## Vue

```vue
<template>
  <TiltCard :max-angle="12" class="w-72 border border-line bg-surface p-5">
    <img data-depth="16" src="/img/headphones.png" alt="" class="rounded-lg" />
    <p class="mt-4 font-semibold">Studio headphones</p>
  </TiltCard>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import TiltCard from "$lib/components/markas/TiltCard.svelte";
</script>

<TiltCard maxAngle={8} class="border border-line bg-surface p-6">
  <div data-depth="20">Pro plan</div>
</TiltCard>
```

## Astro

```astro
---
import TiltCard from "@/components/markas/TiltCard.astro";
---

<TiltCard maxAngle={8} class="border border-line bg-surface p-6">
  <div data-depth="20">Pro plan</div>
</TiltCard>
```

One small bundled script serves every card on the page.

## Angular

```ts
import { Component } from "@angular/core";
import { TiltCard } from "./markas/tilt-card.component";

@Component({
  selector: "app-plan",
  imports: [TiltCard],
  template: `
    <markas-tilt-card [maxAngle]="8" class="border border-line bg-surface p-6">
      <div data-depth="20">Pro plan</div>
    </markas-tilt-card>
  `,
})
export class Plan {}
```

## Notes

- The card rotates up to `maxAngle` degrees toward the pointer through the `--tilt-x` and `--tilt-y` custom properties, and eases back when the pointer leaves.
- Children with `data-depth="16"` shift up to 16px for parallax. Use it on one or two elements.
- Keyboard focus on a link or button inside lifts the card slightly. With reduced motion the card stays flat.
- `glare={false}` removes the moving light. Attributes and `class` go to the card itself.
