## Blade

```blade
<x-markas.scroll-area label="Releases" class="max-h-56 border border-line">
    <div class="p-4">...</div>
</x-markas.scroll-area>
```

## React

```tsx
import { ScrollArea } from "@/components/markas/ScrollArea";

<ScrollArea label="Releases" className="max-h-56 border border-line">
  <div className="p-4">...</div>
</ScrollArea>;
```

## Vue

```vue
<template>
  <ScrollArea label="Releases" class="max-h-56 border border-line">
    <div class="p-4">...</div>
  </ScrollArea>
</template>
```

## Notes

- Set the size limit with a class such as `max-h-56` or `max-w-sm`. Without it nothing scrolls.
- Use `orientation="horizontal"` for a row of cards and `orientation="both"` for wide grids.
- The scrollbar is native, only thinner and in token colors, so no JavaScript is needed.
