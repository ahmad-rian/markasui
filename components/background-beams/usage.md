## Blade

```blade
<x-markas.background-beams variant="flow" :count="10" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Light up your launch</h2>
</x-markas.background-beams>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { BackgroundBeams } from "@/components/markas/BackgroundBeams";

<BackgroundBeams
  variant="flow"
  count={10}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">
    Light up your launch
  </h2>
</BackgroundBeams>;
```

## Vue

```vue
<template>
  <BackgroundBeams
    variant="flow"
    :count="10"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">
      Light up your launch
    </h2>
  </BackgroundBeams>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import BackgroundBeams from "$lib/components/markas/BackgroundBeams.svelte";
</script>

<BackgroundBeams
  variant="flow"
  count={10}
  class="rounded-xl bg-surface px-6 py-16"
>
  <h2 class="text-center text-3xl font-bold text-ink">Light up your launch</h2>
</BackgroundBeams>
```

## Astro

```astro
---
import BackgroundBeams from "@/components/markas/BackgroundBeams.astro";
---

<BackgroundBeams
  variant="flow"
  count={10}
  class="rounded-xl bg-surface px-6 py-16"
>
  <h2 class="text-center text-3xl font-bold text-ink">
    Light up your launch
  </h2>
</BackgroundBeams>
```

No client-side JavaScript; the markup is rendered on the server.

## Angular

```ts
import { Component } from "@angular/core";
import { BackgroundBeams } from "./markas/background-beams.component";

@Component({
  selector: "app-hero",
  imports: [BackgroundBeams],
  template: `
    <div
      markas-background-beams
      variant="flow"
      [count]="10"
      class="rounded-xl bg-surface px-6 py-16"
    >
      <h2 class="text-center text-3xl font-bold text-ink">
        Light up your launch
      </h2>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- `flow` sends a glint along each curve, `pulse` fades curves in turn, `collide` drops vertical beams that splash at the bottom edge.
- With `collide`, add bottom padding (for example `pb-16`) so the splashes land below your content.
- Beam positions come from a formula, so every framework renders the same picture.
- The component has no built-in text, so there are no label props to translate.
