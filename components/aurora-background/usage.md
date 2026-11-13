## Blade

```blade
<x-markas.aurora-background color="success" speed="slow" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Meet your calmer workspace</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.aurora-background>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { AuroraBackground } from "@/components/markas/AuroraBackground";

<AuroraBackground
  color="success"
  speed="slow"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Meet your calmer workspace
  </h2>
  <Button>Get started</Button>
</AuroraBackground>;
```

## Vue

```vue
<template>
  <AuroraBackground
    color="success"
    speed="slow"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">Meet your calmer workspace</h2>
    <Button>Get started</Button>
  </AuroraBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import AuroraBackground from "$lib/components/markas/AuroraBackground.svelte";
</script>

<AuroraBackground
  color="success"
  speed="slow"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">Meet your calmer workspace</h2>
  <Button>Get started</Button>
</AuroraBackground>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import AuroraBackground from "@/components/markas/AuroraBackground.astro";
---

<AuroraBackground
  color="success"
  speed="slow"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Meet your calmer workspace
  </h2>
  <Button>Get started</Button>
</AuroraBackground>
```

No client-side JavaScript; the markup is rendered on the server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { AuroraBackground } from "./markas/aurora-background.component";

@Component({
  selector: "app-hero",
  imports: [Button, AuroraBackground],
  template: `
    <div
      markas-aurora-background
      color="success"
      speed="slow"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Meet your calmer workspace
      </h2>
      <button markas-button>Get started</button>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- The glow mixes `primary` with the `color` token, so it follows light and dark mode.
- Keyframes ship inside the component in a small `<style>` tag. With reduced motion the glow stays still.
- The component has no built-in text, so there are no label props to translate.
