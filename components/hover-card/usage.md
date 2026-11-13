## Blade

```blade
<x-markas.hover-card>
    <a href="https://github.com/markasui">@markasui</a>
    <x-slot:content>
        <p class="font-medium text-ink">Markas UI</p>
        <p class="text-muted">UI components for Blade, React, and Vue.</p>
    </x-slot:content>
</x-markas.hover-card>
```

Needs Alpine.js.

## React

```tsx
import { HoverCard } from "@/components/markas/HoverCard";

<HoverCard
  content={
    <>
      <p className="font-medium text-ink">Markas UI</p>
      <p className="text-muted">UI components for Blade, React, and Vue.</p>
    </>
  }
>
  <a href="https://github.com/markasui">@markasui</a>
</HoverCard>;
```

## Vue

```vue
<template>
  <HoverCard>
    <a href="https://github.com/markasui">@markasui</a>
    <template #content>
      <p class="font-medium text-ink">Markas UI</p>
      <p class="text-muted">UI components for Blade, React, and Vue.</p>
    </template>
  </HoverCard>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import HoverCard from "$lib/components/markas/HoverCard.svelte";
</script>

<HoverCard>
  <a href="https://github.com/markasui">@markasui</a>
  {#snippet content()}
    <p class="font-medium text-ink">Markas UI</p>
    <p class="text-muted">UI components for Blade, React, and Vue.</p>
  {/snippet}
</HoverCard>
```

## Astro

```astro
---
import HoverCard from "@/components/markas/HoverCard.astro";
---

<HoverCard>
  <a href="https://github.com/markasui">@markasui</a>
  <Fragment slot="content">
    <p class="font-medium text-ink">Markas UI</p>
    <p class="text-muted">UI components for Blade, React, and Vue.</p>
  </Fragment>
</HoverCard>
```

Each card is wrapped in a small `markas-hover-card` custom element with `display: contents`, so it also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { HoverCard } from "./markas/hover-card.component";

@Component({
  selector: "app-maintainer",
  imports: [HoverCard],
  template: `
    <markas-hover-card>
      <a href="https://github.com/markasui">&#64;markasui</a>
      <ng-container content>
        <p class="font-medium text-ink">Markas UI</p>
        <p class="text-muted">UI components for Blade, React, and Vue.</p>
      </ng-container>
    </markas-hover-card>
  `,
})
export class Maintainer {}
```

## Notes

- The first element inside HoverCard is the trigger and automatically gets `aria-describedby` pointing to the card.
- The card shows below the trigger and flips above it when there is no room.
- Inside a paragraph, keep the card content to inline elements (span, a, strong), because a `div` or `p` would break the paragraph in server rendered HTML.
- Hover Card has no built-in text. Write the content in the language of your site.
