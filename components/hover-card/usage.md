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

## Notes

- The first element inside HoverCard is the trigger and automatically gets `aria-describedby` pointing to the card.
- The card shows below the trigger and flips above it when there is no room.
- Inside a paragraph, keep the card content to inline elements (span, a, strong), because a `div` or `p` would break the paragraph in server rendered HTML.
- Hover Card has no built-in text. Write the content in the language of your site.
