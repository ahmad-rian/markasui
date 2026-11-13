## Blade

```blade
<x-markas.card title="Pro plan" description="For small teams that are growing.">
    Includes 10 team members and 50 GB of storage.

    <x-slot:footer>
        <x-markas.button size="sm">Choose plan</x-markas.button>
    </x-slot:footer>
</x-markas.card>
```

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Card } from "@/components/markas/Card";

<Card
  title="Pro plan"
  description="For small teams that are growing."
  footer={<Button size="sm">Choose plan</Button>}
>
  Includes 10 team members and 50 GB of storage.
</Card>;
```

## Vue

```vue
<template>
  <Card title="Pro plan" description="For small teams that are growing.">
    Includes 10 team members and 50 GB of storage.

    <template #footer>
      <Button size="sm">Choose plan</Button>
    </template>
  </Card>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Card from "$lib/components/markas/Card.svelte";
</script>

<Card title="Pro plan" description="For small teams that are growing.">
  Includes 10 team members and 50 GB of storage.

  {#snippet footer()}
    <Button size="sm">Choose plan</Button>
  {/snippet}
</Card>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Card from "@/components/markas/Card.astro";
---

<Card title="Pro plan" description="For small teams that are growing.">
  Includes 10 team members and 50 GB of storage.

  <Button slot="footer" size="sm">Choose plan</Button>
</Card>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Card } from "./markas/card.component";

@Component({
  selector: "app-example",
  imports: [Button, Card],
  template: `
    <article
      markas-card
      title="Pro plan"
      description="For small teams that are growing."
    >
      Includes 10 team members and 50 GB of storage.
      <button markas-button footer size="sm">Choose plan</button>
    </article>
  `,
})
export class Example {}
```

Angular uses an attribute selector on a native `article`. Elements with the `footer` attribute (an `ng-container` works) fill the footer.

## Notes

- Every part is optional. Empty parts are not rendered, so the spacing stays even.
- Extra classes (such as `max-w-sm`) are merged last and land on the `<article>` element.
- Card has no built-in text. All text comes from your props and slots, so it works in any language as is.
