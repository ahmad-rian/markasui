## Blade

```blade
<x-markas.lamp-effect color="primary" class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
    <h2 class="text-3xl font-semibold text-ink">Build in the light</h2>
    <x-markas.button>Start for free</x-markas.button>
</x-markas.lamp-effect>
```

Needs Alpine.js to start the entrance when the section scrolls into view.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { LampEffect } from "@/components/markas/LampEffect";

<LampEffect className="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
  <h2 className="text-3xl font-semibold text-ink">Build in the light</h2>
  <Button>Start for free</Button>
</LampEffect>;
```

## Vue

```vue
<template>
  <LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
    <h2 class="text-3xl font-semibold text-ink">Build in the light</h2>
    <Button>Start for free</Button>
  </LampEffect>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import LampEffect from "$lib/components/markas/LampEffect.svelte";
</script>

<LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
  <h2 class="text-3xl font-semibold text-ink">Build in the light</h2>
  <Button>Start for free</Button>
</LampEffect>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import LampEffect from "@/components/markas/LampEffect.astro";
---

<LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
  <h2 class="text-3xl font-semibold text-ink">Build in the light</h2>
  <Button>Start for free</Button>
</LampEffect>
```

A small bundled script starts the entrance per instance. It also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { LampEffect } from "./markas/lamp-effect.component";

@Component({
  selector: "app-hero",
  imports: [Button, LampEffect],
  template: `
    <div
      markas-lamp-effect
      class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink"
    >
      <h2 class="text-3xl font-semibold text-ink">Build in the light</h2>
      <button markas-button>Start for free</button>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- The light is made from CSS conic and radial gradients in the `color` token. No canvas and no blur filters.
- The lamp line sits 3rem from the top. Leave room above your content with top padding.
- `variant="stage"` shines two lamps in from the top corners, `variant="halo"` draws a glowing ring from the top edge.
- The entrance plays once when the section first scrolls into view. With reduced motion the light is shown at full width right away.
- The component has no built-in text, so there are no label props to translate.
