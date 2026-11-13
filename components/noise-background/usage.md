## Blade

```blade
<x-markas.noise-background color="warning" class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">Design tools with a little texture</h2>
    <x-markas.button>Download the kit</x-markas.button>
</x-markas.noise-background>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { NoiseBackground } from "@/components/markas/NoiseBackground";

<NoiseBackground
  color="warning"
  className="rounded-xl border border-line bg-surface px-6 py-14"
>
  <h2 className="text-3xl font-semibold text-ink">
    Design tools with a little texture
  </h2>
  <Button>Download the kit</Button>
</NoiseBackground>;
```

## Vue

```vue
<template>
  <NoiseBackground
    color="warning"
    class="rounded-xl border border-line bg-surface px-6 py-14"
  >
    <h2 class="text-3xl font-semibold text-ink">
      Design tools with a little texture
    </h2>
    <Button>Download the kit</Button>
  </NoiseBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import NoiseBackground from "$lib/components/markas/NoiseBackground.svelte";
</script>

<NoiseBackground
  color="warning"
  class="rounded-xl border border-line bg-surface px-6 py-14"
>
  <h2 class="text-3xl font-semibold text-ink">
    Design tools with a little texture
  </h2>
  <Button>Download the kit</Button>
</NoiseBackground>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import NoiseBackground from "@/components/markas/NoiseBackground.astro";
---

<NoiseBackground
  color="warning"
  class="rounded-xl border border-line bg-surface px-6 py-14"
>
  <h2 class="text-3xl font-semibold text-ink">
    Design tools with a little texture
  </h2>
  <Button>Download the kit</Button>
</NoiseBackground>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { NoiseBackground } from "./markas/noise-background.component";

@Component({
  selector: "app-kit",
  imports: [Button, NoiseBackground],
  template: `
    <div
      markas-noise-background
      color="warning"
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <h2 class="text-3xl font-semibold text-ink">
        Design tools with a little texture
      </h2>
      <button markas-button>Download the kit</button>
    </div>
  `,
})
export class Kit {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- The texture is one SVG `feTurbulence` tile inlined as a data URL and used as a CSS mask over the `ink` token, so it follows light and dark mode. The browser renders it once and repeats it.
- Only the gradient under the texture moves, with a slow transform. The grain is static, so there is no per-frame work.
- `variant="film"` adds a vignette that darkens the edges in both themes.
- The component has no built-in text, so there are no label props to translate.
