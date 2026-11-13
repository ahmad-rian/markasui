## Blade

```blade
<x-markas.accordion :items="['shipping' => 'How long does shipping take?', 'returns' => 'How do I return an item?']" default-value="shipping">
    <x-slot:shipping>Orders arrive in 2 to 4 business days.</x-slot:shipping>
    <x-slot:returns>Request a return within 7 days from the order page.</x-slot:returns>
</x-markas.accordion>
```

No Alpine.js needed.

## React

```tsx
import { Accordion } from "@/components/markas/Accordion";

<Accordion
  defaultValue="shipping"
  items={[
    {
      value: "shipping",
      title: "How long does shipping take?",
      content: "Orders arrive in 2 to 4 business days.",
    },
    {
      value: "returns",
      title: "How do I return an item?",
      content: "Request a return within 7 days from the order page.",
    },
  ]}
/>;
```

## Vue

```vue
<template>
  <Accordion
    default-value="shipping"
    :items="[
      { value: 'shipping', title: 'How long does shipping take?' },
      { value: 'returns', title: 'How do I return an item?' },
    ]"
  >
    <template #shipping>Orders arrive in 2 to 4 business days.</template>
    <template #returns
      >Request a return within 7 days from the order page.</template
    >
  </Accordion>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Accordion from "$lib/components/markas/Accordion.svelte";

  const items = [
    {
      value: "shipping",
      title: "How long does shipping take?",
      content: "Orders arrive in 2 to 4 business days.",
    },
    { value: "returns", title: "How do I return an item?", content: returns },
  ];
</script>

{#snippet returns()}
  Request a return within 7 days from the <a href="/orders">order page</a>.
{/snippet}

<Accordion {items} defaultValue="shipping" />
```

`content` takes plain text or a snippet for rich content.

## Astro

```astro
---
import Accordion from "@/components/markas/Accordion.astro";

const items = [
  {
    value: "shipping",
    title: "How long does shipping take?",
    content: "Orders arrive in 2 to 4 business days.",
  },
  { value: "returns", title: "How do I return an item?" },
];
---

<Accordion items={items} defaultValue="shipping">
  <p slot="returns">Request a return within 7 days from the order page.</p>
</Accordion>
```

An item without `content` renders the slot named after its `value`. No JavaScript is shipped.

## Angular

```ts
import { Component } from "@angular/core";
import { Accordion } from "./markas/accordion.component";

@Component({
  selector: "app-faq",
  imports: [Accordion],
  template: `
    <ng-template #returns>
      Request a return within 7 days from the <a href="/orders">order page</a>.
    </ng-template>
    <markas-accordion
      [items]="[
        {
          value: 'shipping',
          title: 'How long does shipping take?',
          content: 'Orders arrive in 2 to 4 business days.',
        },
        {
          value: 'returns',
          title: 'How do I return an item?',
          content: returns,
        },
      ]"
      defaultValue="shipping"
    />
  `,
})
export class Faq {}
```

`content` takes plain text or an `ng-template` reference for rich content.

## Notes

- `type="single"` (the default) gives every `details` the same `name` attribute, so the browser closes the other sections natively. Use `type="multiple"` to let several sections stay open.
- Older browsers without `details[name]` support still open sections, they are just not exclusive.
- The component has no built-in text. Titles and content come from your own data, so write them in any language.
