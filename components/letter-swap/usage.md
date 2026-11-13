## Blade

```blade
<a href="/pricing" class="text-sm font-medium">
    <x-markas.letter-swap text="Pricing" />
</a>
<button type="button" class="h-10 rounded-lg bg-primary px-4 text-on-primary">
    <x-markas.letter-swap text="Start free trial" mode="pingpong" direction="down" />
</button>
<a href="/careers"><x-markas.letter-swap text="Careers" mode="random" /></a>
```

## React

```tsx
import { LetterSwap } from "@/components/markas/LetterSwap";

<a href="/pricing" className="text-sm font-medium">
  <LetterSwap text="Pricing" />
</a>
<button type="button" className="h-10 rounded-lg bg-primary px-4 text-on-primary">
  <LetterSwap text="Start free trial" mode="pingpong" direction="down" />
</button>
<a href="/careers"><LetterSwap text="Careers" mode="random" /></a>
```

## Vue

```vue
<template>
  <a href="/pricing" class="text-sm font-medium">
    <LetterSwap text="Pricing" />
  </a>
  <button type="button" class="h-10 rounded-lg bg-primary px-4 text-on-primary">
    <LetterSwap text="Start free trial" mode="pingpong" direction="down" />
  </button>
  <a href="/careers"><LetterSwap text="Careers" mode="random" /></a>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import LetterSwap from "$lib/components/markas/LetterSwap.svelte";
</script>

<a href="/pricing" class="text-sm font-medium">
  <LetterSwap text="Pricing" />
</a>
<button type="button" class="h-10 rounded-lg bg-primary px-4 text-on-primary">
  <LetterSwap text="Start free trial" mode="pingpong" direction="down" />
</button>
```

## Astro

```astro
---
import LetterSwap from "@/components/markas/LetterSwap.astro";
---

<a href="/pricing" class="text-sm font-medium">
  <LetterSwap text="Pricing" />
</a>
<a href="/careers"><LetterSwap text="Careers" mode="random" /></a>
```

## Angular

```ts
import { Component } from "@angular/core";
import { LetterSwap } from "./markas/letter-swap.component";

@Component({
  selector: "app-nav-link",
  imports: [LetterSwap],
  template: `
    <a href="/pricing" class="text-sm font-medium">
      <span markas-letter-swap text="Pricing"></span>
    </a>
    <button
      type="button"
      class="h-10 rounded-lg bg-primary px-4 text-on-primary"
    >
      <span markas-letter-swap text="Start free trial" mode="pingpong"></span>
    </button>
  `,
})
export class NavLink {}
```

## Notes

- Put the component inside a link or button. It listens to hover and focus on the closest `a`, `button`, `label`, or element with `tabindex`, so keyboard users see the same swap.
- `forward` and `random` run once per hover and ignore a new hover until they finish. `pingpong` swaps in on hover and back on leave or blur.
- The random order comes from a fixed hash, so it is the same on every render and in every framework.
- Screen readers hear the text once from a visually hidden copy. With reduced motion, the letters stay still. The Blade version needs Alpine.js.
