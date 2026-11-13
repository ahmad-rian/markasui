## Blade

```blade
<x-markas.shooting-stars variant="night" frequency="normal" trail-color="primary" class="dark rounded-xl bg-canvas px-6 py-14">
    <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
    <x-markas.button>Join the waitlist</x-markas.button>
</x-markas.shooting-stars>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { ShootingStars } from "@/components/markas/ShootingStars";

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  className="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 className="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
  <Button>Join the waitlist</Button>
</ShootingStars>;
```

## Vue

```vue
<template>
  <ShootingStars
    variant="night"
    frequency="normal"
    trail-color="primary"
    class="dark rounded-xl bg-canvas px-6 py-14"
  >
    <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
    <Button>Join the waitlist</Button>
  </ShootingStars>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import ShootingStars from "$lib/components/markas/ShootingStars.svelte";
</script>

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  class="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
  <Button>Join the waitlist</Button>
</ShootingStars>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import ShootingStars from "@/components/markas/ShootingStars.astro";
---

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  class="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
  <Button>Join the waitlist</Button>
</ShootingStars>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { ShootingStars } from "./markas/shooting-stars.component";

@Component({
  selector: "app-waitlist",
  imports: [Button, ShootingStars],
  template: `
    <div
      markas-shooting-stars
      variant="night"
      frequency="normal"
      trailColor="primary"
      class="dark rounded-xl bg-canvas px-6 py-14"
    >
      <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
      <button markas-button>Join the waitlist</button>
    </div>
  `,
})
export class Waitlist {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- Three shooting stars share one CSS cycle, so one crosses the sky every third of it. They are invisible for the rest of the cycle.
- Star and streak positions come from `seed` with integer math, so all six frameworks render the same sky.
- This is a separate component from Stars Background, with its own keyframes, so both can sit on the same page.
- With reduced motion the stars stop twinkling and the streaks stay still.
- The component has no built-in text, so there are no label props to translate.
