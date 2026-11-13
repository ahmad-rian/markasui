## Blade

```blade
<x-markas.dot-pattern mask="radial" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Build interfaces that feel at home</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.dot-pattern>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { DotPattern } from "@/components/markas/DotPattern";

<DotPattern
  mask="radial"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Build interfaces that feel at home
  </h2>
  <Button>Get started</Button>
</DotPattern>;
```

## Vue

```vue
<template>
  <DotPattern
    mask="radial"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Build interfaces that feel at home
    </h2>
    <Button>Get started</Button>
  </DotPattern>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import DotPattern from "$lib/components/markas/DotPattern.svelte";
</script>

<DotPattern
  mask="radial"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Build interfaces that feel at home
  </h2>
  <Button>Get started</Button>
</DotPattern>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import DotPattern from "@/components/markas/DotPattern.astro";
---

<DotPattern
  mask="radial"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Build interfaces that feel at home
  </h2>
  <Button>Get started</Button>
</DotPattern>
```

No client-side JavaScript; the markup is rendered on the server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { DotPattern } from "./markas/dot-pattern.component";

@Component({
  selector: "app-hero",
  imports: [Button, DotPattern],
  template: `
    <div
      markas-dot-pattern
      mask="radial"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Build interfaces that feel at home
      </h2>
      <button markas-button>Get started</button>
    </div>
  `,
})
export class Hero {}
```

The component is an attribute on a div, so class, style, and other attributes stay on the root element.

## Notes

- `spacing` and `dotSize` are in pixels. Use `color` for a token tint and `mask` to fade the edges.
- Pure CSS: no JavaScript and nothing to animate, so it costs nothing at runtime.
- The component has no built-in text, so there are no label props to translate.
