## Blade

```blade
<x-markas.stars-background :count="120" :seed="7" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Deploys that ship while you sleep</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.stars-background>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { StarsBackground } from "@/components/markas/StarsBackground";

<StarsBackground
  count={120}
  seed={7}
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Deploys that ship while you sleep
  </h2>
  <Button>Get started</Button>
</StarsBackground>;
```

## Vue

```vue
<template>
  <StarsBackground
    :count="120"
    :seed="7"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Deploys that ship while you sleep
    </h2>
    <Button>Get started</Button>
  </StarsBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import StarsBackground from "$lib/components/markas/StarsBackground.svelte";
</script>

<StarsBackground
  count={120}
  seed={7}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Deploys that ship while you sleep
  </h2>
  <Button>Get started</Button>
</StarsBackground>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import StarsBackground from "@/components/markas/StarsBackground.astro";
---

<StarsBackground
  count={120}
  seed={7}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Deploys that ship while you sleep
  </h2>
  <Button>Get started</Button>
</StarsBackground>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { StarsBackground } from "./markas/stars-background.component";

@Component({
  selector: "app-launch",
  imports: [Button, StarsBackground],
  template: `
    <div
      markas-stars-background
      count="120"
      seed="7"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Deploys that ship while you sleep
      </h2>
      <button markas-button>Get started</button>
    </div>
  `,
})
export class Launch {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- Star positions come from `seed` with integer math, so all six frameworks render the same sky on the server and client.
- Add the `dark` class to keep a section dark in every theme. With reduced motion the stars stop twinkling.
- The component has no built-in text, so there are no label props to translate.
