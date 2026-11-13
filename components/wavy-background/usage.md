## Blade

```blade
<x-markas.wavy-background variant="ocean" color="primary" class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32">
    <h2 class="text-2xl font-semibold text-ink">Calm releases, every Friday</h2>
    <x-markas.button>Start free trial</x-markas.button>
</x-markas.wavy-background>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { WavyBackground } from "@/components/markas/WavyBackground";

<WavyBackground
  variant="ocean"
  color="primary"
  className="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
>
  <h2 className="text-2xl font-semibold text-ink">
    Calm releases, every Friday
  </h2>
  <Button>Start free trial</Button>
</WavyBackground>;
```

## Vue

```vue
<template>
  <WavyBackground
    variant="ocean"
    color="primary"
    class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
  >
    <h2 class="text-2xl font-semibold text-ink">Calm releases, every Friday</h2>
    <Button>Start free trial</Button>
  </WavyBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import WavyBackground from "$lib/components/markas/WavyBackground.svelte";
</script>

<WavyBackground
  variant="ocean"
  color="primary"
  class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
>
  <h2 class="text-2xl font-semibold text-ink">Calm releases, every Friday</h2>
  <Button>Start free trial</Button>
</WavyBackground>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import WavyBackground from "@/components/markas/WavyBackground.astro";
---

<WavyBackground
  variant="ocean"
  color="primary"
  class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
>
  <h2 class="text-2xl font-semibold text-ink">
    Calm releases, every Friday
  </h2>
  <Button>Start free trial</Button>
</WavyBackground>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { WavyBackground } from "./markas/wavy-background.component";

@Component({
  selector: "app-release",
  imports: [Button, WavyBackground],
  template: `
    <div
      markas-wavy-background
      variant="ocean"
      color="primary"
      class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Calm releases, every Friday
      </h2>
      <button markas-button>Start free trial</button>
    </div>
  `,
})
export class Release {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- Waves are plain SVG paths that slide sideways with one CSS keyframe. There is no JavaScript, canvas, or backdrop-filter.
- The light blur is a CSS filter on the wave layer only, so content on top stays sharp.
- With reduced motion the waves stop and stay in the same place in all six frameworks.
- The component has no built-in text, so there are no label props to translate.
