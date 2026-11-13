## Blade

```blade
<x-markas.collapsible title="Show order details">
    Shipped from Jakarta on 4 November. Tracking number JKT-2210-884.
</x-markas.collapsible>
```

No Alpine.js needed. Use the `title` slot for rich content: `<x-slot:title>Show <strong>3</strong> more</x-slot:title>`.

## React

```tsx
import { Collapsible } from "@/components/markas/Collapsible";

<Collapsible title="Show order details" open>
  Shipped from Jakarta on 4 November. Tracking number JKT-2210-884.
</Collapsible>;
```

## Vue

```vue
<template>
  <Collapsible title="Show order details">
    Shipped from Jakarta on 4 November. Tracking number JKT-2210-884.
  </Collapsible>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Collapsible from "$lib/components/markas/Collapsible.svelte";

  let open = $state(false);
</script>

<Collapsible title="Show order details" bind:open>
  Shipped from Jakarta on 4 November. Tracking number JKT-2210-884.
</Collapsible>
```

For rich content pass a snippet instead of a string: `{#snippet title()}Show <strong>3</strong> more{/snippet}`.

## Astro

```astro
---
import Collapsible from "@/components/markas/Collapsible.astro";
---

<Collapsible title="Show order details">
  Shipped from Jakarta on 4 November. Tracking number JKT-2210-884.
</Collapsible>
```

No JavaScript is shipped. Use the `title` slot for rich content: `<Fragment slot="title">Show <strong>3</strong> more</Fragment>`.

## Angular

```ts
import { Component } from "@angular/core";
import { Collapsible } from "./markas/collapsible.component";

@Component({
  selector: "app-order",
  imports: [Collapsible],
  template: `
    <details markas-collapsible title="Show order details">
      Shipped from Jakarta on 4 November. Tracking number JKT-2210-884.
    </details>
  `,
})
export class Order {}
```

The component sits on the native `details`, so `open`, `class`, and `(toggle)` work directly. For rich content add `<ng-container title>Show <strong>3</strong> more</ng-container>`.

## Notes

- Built on `details` and `summary`, so it works without JavaScript and the browser handles keyboard and screen reader state.
- `open` only sets the starting state. Listen to the native `toggle` event to react to changes.
- For several related sections where only one should be open, use Accordion instead.
