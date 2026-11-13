## Blade

```blade
<x-markas.gradient-border variant="spin" :glow="true" class="max-w-80">
    <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
        <x-markas.button>Upgrade now</x-markas.button>
    </div>
</x-markas.gradient-border>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { GradientBorder } from "@/components/markas/GradientBorder";

<GradientBorder variant="spin" glow className="max-w-80">
  <div className="grid gap-3 p-6">
    <h3 className="text-lg font-semibold text-ink">Pro workspace</h3>
    <Button>Upgrade now</Button>
  </div>
</GradientBorder>;
```

## Vue

```vue
<template>
  <GradientBorder variant="spin" glow class="max-w-80">
    <div class="grid gap-3 p-6">
      <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
      <Button>Upgrade now</Button>
    </div>
  </GradientBorder>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import GradientBorder from "$lib/components/markas/GradientBorder.svelte";
</script>

<GradientBorder variant="spin" glow class="max-w-80">
  <div class="grid gap-3 p-6">
    <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
    <Button>Upgrade now</Button>
  </div>
</GradientBorder>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import GradientBorder from "@/components/markas/GradientBorder.astro";
---

<GradientBorder variant="spin" glow class="max-w-80">
  <div class="grid gap-3 p-6">
    <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
    <Button>Upgrade now</Button>
  </div>
</GradientBorder>
```

No client-side JavaScript; the markup is rendered on the server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { GradientBorder } from "./markas/gradient-border.component";

@Component({
  selector: "app-hero",
  imports: [Button, GradientBorder],
  template: `
    <div markas-gradient-border variant="spin" glow class="max-w-80">
      <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
        <button markas-button>Upgrade now</button>
      </div>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- The border is 1px. Put padding on the content inside; the inner panel uses `bg-surface`.
- For a pill button use `radius="full"` with `inline-block` on the component and `rounded-full` on the button.
- `spin` uses container query units, supported by every current browser.
- The component has no built-in text, so there are no label props to translate.
