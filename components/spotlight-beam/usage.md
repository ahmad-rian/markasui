## Blade

```blade
<x-markas.spotlight-beam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
    <h2 class="text-3xl font-semibold text-ink">Your roadmap, in the spotlight</h2>
    <x-markas.button>Create a roadmap</x-markas.button>
</x-markas.spotlight-beam>
```

Needs Alpine.js for the entrance and for `follow`.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { SpotlightBeam } from "@/components/markas/SpotlightBeam";

<SpotlightBeam follow className="dark rounded-xl bg-canvas px-6 py-16 text-ink">
  <h2 className="text-3xl font-semibold text-ink">
    Your roadmap, in the spotlight
  </h2>
  <Button>Create a roadmap</Button>
</SpotlightBeam>;
```

## Vue

```vue
<template>
  <SpotlightBeam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
    <h2 class="text-3xl font-semibold text-ink">
      Your roadmap, in the spotlight
    </h2>
    <Button>Create a roadmap</Button>
  </SpotlightBeam>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import SpotlightBeam from "$lib/components/markas/SpotlightBeam.svelte";
</script>

<SpotlightBeam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
  <h2 class="text-3xl font-semibold text-ink">
    Your roadmap, in the spotlight
  </h2>
  <Button>Create a roadmap</Button>
</SpotlightBeam>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import SpotlightBeam from "@/components/markas/SpotlightBeam.astro";
---

<SpotlightBeam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
  <h2 class="text-3xl font-semibold text-ink">
    Your roadmap, in the spotlight
  </h2>
  <Button>Create a roadmap</Button>
</SpotlightBeam>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { SpotlightBeam } from "./markas/spotlight-beam.component";

@Component({
  selector: "app-roadmap",
  imports: [Button, SpotlightBeam],
  template: `
    <div
      markas-spotlight-beam
      follow
      class="dark rounded-xl bg-canvas px-6 py-16 text-ink"
    >
      <h2 class="text-3xl font-semibold text-ink">
        Your roadmap, in the spotlight
      </h2>
      <button markas-button>Create a roadmap</button>
    </div>
  `,
})
export class Roadmap {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- The beam is three stretched radial gradients, rotated from the light source. No SVG filters or blur, so it stays cheap to paint.
- `variant="top-right"` mirrors the beam, `variant="center"` shines straight down.
- `follow` stores the pointer position in CSS variables on the root; the light shifts by at most 4% and eases back into place.
- The entrance plays once when the section first scrolls into view. With reduced motion the beam is shown right away and `follow` is off.
- The component has no built-in text, so there are no label props to translate.
