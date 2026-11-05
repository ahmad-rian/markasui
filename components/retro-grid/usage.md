## Blade

```blade
<x-markas.retro-grid :cell-size="48" color="primary" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.retro-grid>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { RetroGrid } from "@/components/markas/RetroGrid";

<RetroGrid
  cellSize={48}
  color="primary"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">Ship the future</h2>
  <Button>Get started</Button>
</RetroGrid>;
```

## Vue

```vue
<template>
  <RetroGrid
    :cell-size="48"
    color="primary"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">Ship the future</h2>
    <Button>Get started</Button>
  </RetroGrid>
</template>
```

## Notes

- Give the component some height (at least 240px) so the perspective has room.
- The grid moves one cell per second toward the viewer. With reduced motion it stops.
- The component has no built-in text, so there are no label props to translate.
