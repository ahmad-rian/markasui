## Blade

```blade
<x-markas.shimmer-button size="lg">Get started for free</x-markas.shimmer-button>
<x-markas.shimmer-button variant="secondary" :duration="3200">Book a demo</x-markas.shimmer-button>
```

## React

```tsx
import { ShimmerButton } from "@/components/markas/ShimmerButton";

<ShimmerButton size="lg">Get started for free</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Book a demo</ShimmerButton>
```

## Vue

```vue
<script setup lang="ts">
import ShimmerButton from "@/components/markas/ShimmerButton.vue";
</script>

<template>
  <ShimmerButton size="lg">Get started for free</ShimmerButton>
  <ShimmerButton variant="secondary" :duration="3200"
    >Book a demo</ShimmerButton
  >
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ShimmerButton from "$lib/components/markas/ShimmerButton.svelte";
</script>

<ShimmerButton size="lg">Get started for free</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Book a demo</ShimmerButton>
```

## Astro

```astro
---
import ShimmerButton from "@/components/markas/ShimmerButton.astro";
---

<ShimmerButton size="lg">Get started for free</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Book a demo</ShimmerButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { ShimmerButton } from "./markas/shimmer-button.component";

@Component({
  selector: "app-hero",
  imports: [ShimmerButton],
  template: `
    <button markas-shimmer-button size="lg">Get started for free</button>
    <button markas-shimmer-button variant="secondary" [duration]="3200">
      Book a demo
    </button>
  `,
})
export class Hero {}
```

Angular uses an attribute selector on the native button, so `disabled`, `aria-*`, and `class` stay on the button.

## Notes

- The sheen runs with the Web Animations API, so no extra CSS or keyframes are needed.
- An IntersectionObserver pauses the loop while the button is off screen. With reduced motion it never starts.
- Blade needs Alpine.js.
