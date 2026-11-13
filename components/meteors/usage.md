## Blade

```blade
<x-markas.meteors variant="rain" :count="20" :angle="35" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
    <x-markas.button>View benchmarks</x-markas.button>
</x-markas.meteors>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Meteors } from "@/components/markas/Meteors";

<Meteors
  variant="rain"
  count={20}
  angle={35}
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">A million events a second</h2>
  <Button>View benchmarks</Button>
</Meteors>;
```

## Vue

```vue
<template>
  <Meteors
    variant="rain"
    :count="20"
    :angle="35"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
    <Button>View benchmarks</Button>
  </Meteors>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Meteors from "$lib/components/markas/Meteors.svelte";
</script>

<Meteors
  variant="rain"
  count={20}
  angle={35}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
  <Button>View benchmarks</Button>
</Meteors>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Meteors from "@/components/markas/Meteors.astro";
---

<Meteors
  variant="rain"
  count={20}
  angle={35}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
  <Button>View benchmarks</Button>
</Meteors>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Meteors } from "./markas/meteors.component";

@Component({
  selector: "app-launch",
  imports: [Button, Meteors],
  template: `
    <div
      markas-meteors
      variant="rain"
      count="20"
      angle="35"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
      <button markas-button>View benchmarks</button>
    </div>
  `,
})
export class Launch {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- Positions, tail lengths, and timing come from `seed` with integer math, so all six frameworks render the same shower.
- Each meteor is one element with a gradient tail drawn by `::before`, moved with a CSS transform. There is no JavaScript.
- With reduced motion the meteors stop at their starting point.
- The component has no built-in text, so there are no label props to translate.
