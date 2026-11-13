## Blade

```blade
<x-markas.spotlight-card>
    <div class="p-6">
        <h3 class="font-semibold">Instant previews</h3>
        <p class="text-sm text-muted">Every pull request gets its own link.</p>
    </div>
</x-markas.spotlight-card>

<x-markas.spotlight-card color="success">...</x-markas.spotlight-card>
```

## React

```tsx
import { SpotlightCard } from "@/components/markas/SpotlightCard";

<SpotlightCard>
  <div className="p-6">
    <h3 className="font-semibold">Instant previews</h3>
    <p className="text-sm text-muted">Every pull request gets its own link.</p>
  </div>
</SpotlightCard>

<SpotlightCard color="success">...</SpotlightCard>
```

## Vue

```vue
<template>
  <SpotlightCard>
    <div class="p-6">
      <h3 class="font-semibold">Instant previews</h3>
      <p class="text-sm text-muted">Every pull request gets its own link.</p>
    </div>
  </SpotlightCard>

  <SpotlightCard color="success">...</SpotlightCard>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import SpotlightCard from "$lib/components/markas/SpotlightCard.svelte";
</script>

<SpotlightCard>
  <div class="p-6">
    <h3 class="font-semibold">Instant previews</h3>
    <p class="text-sm text-muted">Every pull request gets its own link.</p>
  </div>
</SpotlightCard>
```

## Astro

```astro
---
import SpotlightCard from "@/components/markas/SpotlightCard.astro";
---

<SpotlightCard color="success">
  <div class="p-6">
    <h3 class="font-semibold">Instant previews</h3>
    <p class="text-sm text-muted">Every pull request gets its own link.</p>
  </div>
</SpotlightCard>
```

## Angular

```ts
import { Component } from "@angular/core";
import { SpotlightCard } from "./markas/spotlight-card.component";

@Component({
  selector: "app-feature",
  imports: [SpotlightCard],
  template: `
    <div markas-spotlight-card color="success">
      <div class="p-6">
        <h3 class="font-semibold">Instant previews</h3>
        <p class="text-sm text-muted">Every pull request gets its own link.</p>
      </div>
    </div>
  `,
})
export class Feature {}
```

## Notes

- The pointer position is stored in the `--spot-x` and `--spot-y` custom properties; the light and border are CSS radial gradients.
- Focus inside the card shows the glow at the center, so keyboard users get the same feedback. The Blade version needs Alpine.js.
- Class and attributes go to the outer element. Add padding inside the content.
