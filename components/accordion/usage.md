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

## Notes

- `type="single"` (the default) gives every `details` the same `name` attribute, so the browser closes the other sections natively. Use `type="multiple"` to let several sections stay open.
- Older browsers without `details[name]` support still open sections, they are just not exclusive.
- The component has no built-in text. Titles and content come from your own data, so write them in any language.
