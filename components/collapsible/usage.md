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

## Notes

- Built on `details` and `summary`, so it works without JavaScript and the browser handles keyboard and screen reader state.
- `open` only sets the starting state. Listen to the native `toggle` event to react to changes.
- For several related sections where only one should be open, use Accordion instead.
