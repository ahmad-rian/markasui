## Blade

```blade
{{-- Reading progress for the whole page --}}
<x-markas.scroll-progress />

{{-- Inside a scrolling container --}}
<div role="region" aria-label="Release notes" tabindex="0" class="relative h-64 overflow-y-auto">
    <x-markas.scroll-progress target="parent" color="success" size="md" />
    ...
</div>
```

## React

```tsx
import { ScrollProgress } from "@/components/markas/ScrollProgress";

<ScrollProgress />

<div role="region" aria-label="Release notes" tabIndex={0} className="relative h-64 overflow-y-auto">
  <ScrollProgress target="parent" color="success" size="md" />
  ...
</div>
```

## Vue

```vue
<template>
  <ScrollProgress />

  <div
    role="region"
    aria-label="Release notes"
    tabindex="0"
    class="relative h-64 overflow-y-auto"
  >
    <ScrollProgress target="parent" color="success" size="md" />
    ...
  </div>
</template>
```

## Notes

- `target="page"` is fixed to the top of the window. `target="parent"` is sticky inside its parent and must be its first child.
- Updates are batched with `requestAnimationFrame` and only run while scrolling. The Blade version needs Alpine.js.
- The bar is decorative (`aria-hidden`). Make the scrolling container focusable and named so keyboard users can scroll it.
