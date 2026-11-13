## Blade

```blade
<x-markas.shimmer-button size="lg">Mulai gratis</x-markas.shimmer-button>
<x-markas.shimmer-button variant="secondary" :duration="3200">Jadwalkan demo</x-markas.shimmer-button>
```

## React

```tsx
import { ShimmerButton } from "@/components/markas/ShimmerButton";

<ShimmerButton size="lg">Mulai gratis</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Jadwalkan demo</ShimmerButton>
```

## Vue

```vue
<script setup lang="ts">
import ShimmerButton from "@/components/markas/ShimmerButton.vue";
</script>

<template>
  <ShimmerButton size="lg">Mulai gratis</ShimmerButton>
  <ShimmerButton variant="secondary" :duration="3200"
    >Jadwalkan demo</ShimmerButton
  >
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ShimmerButton from "$lib/components/markas/ShimmerButton.svelte";
</script>

<ShimmerButton size="lg">Mulai gratis</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Jadwalkan demo</ShimmerButton
>
```

## Astro

```astro
---
import ShimmerButton from "@/components/markas/ShimmerButton.astro";
---

<ShimmerButton size="lg">Mulai gratis</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Jadwalkan demo</ShimmerButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { ShimmerButton } from "./markas/shimmer-button.component";

@Component({
  selector: "app-hero",
  imports: [ShimmerButton],
  template: `
    <button markas-shimmer-button size="lg">Mulai gratis</button>
    <button markas-shimmer-button variant="secondary" [duration]="3200">
      Jadwalkan demo
    </button>
  `,
})
export class Hero {}
```

Angular memakai attribute selector pada button native, jadi `disabled`, `aria-*`, dan `class` tetap di button itu.

## Catatan

- Kilau berjalan dengan Web Animations API, jadi tidak perlu CSS atau keyframes tambahan.
- IntersectionObserver menjeda animasi saat tombol di luar layar. Dengan reduced motion animasi tidak pernah mulai.
- Blade butuh Alpine.js.
