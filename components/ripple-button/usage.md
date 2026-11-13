## Blade

```blade
<x-markas.ripple-button>Add to cart</x-markas.ripple-button>
<x-markas.ripple-button variant="secondary" type="submit">Subscribe</x-markas.ripple-button>
```

## React

```tsx
import { RippleButton } from "@/components/markas/RippleButton";

<RippleButton onClick={addToCart}>Add to cart</RippleButton>
<RippleButton variant="secondary" type="submit">Subscribe</RippleButton>
```

## Vue

```vue
<script setup lang="ts">
import RippleButton from "@/components/markas/RippleButton.vue";
</script>

<template>
  <RippleButton @click="addToCart">Add to cart</RippleButton>
  <RippleButton variant="secondary" type="submit">Subscribe</RippleButton>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import RippleButton from "$lib/components/markas/RippleButton.svelte";
</script>

<RippleButton onclick={addToCart}>Add to cart</RippleButton>
<RippleButton variant="secondary" type="submit">Subscribe</RippleButton>
```

## Astro

```astro
---
import RippleButton from "@/components/markas/RippleButton.astro";
---

<RippleButton>Add to cart</RippleButton>
<RippleButton variant="secondary" type="submit">Subscribe</RippleButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { RippleButton } from "./markas/ripple-button.component";

@Component({
  selector: "app-cart",
  imports: [RippleButton],
  template: `
    <button markas-ripple-button (click)="addToCart()">Add to cart</button>
    <button markas-ripple-button variant="secondary" type="submit">
      Subscribe
    </button>
  `,
})
export class Cart {
  addToCart() {}
}
```

Angular uses an attribute selector on the native button, so `disabled`, `aria-*`, and `class` stay on the button.

## Notes

- A mouse or touch click starts the ripple at the pointer. Enter and Space start it from the center.
- The ripple uses the text color at low opacity, so every variant gets a matching wave.
- Blade needs Alpine.js.
