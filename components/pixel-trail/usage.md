## Blade

```blade
<x-markas.pixel-trail variant="dot" color="success" :cell-size="16" :fade="900" show-grid class="grid h-80 place-items-center rounded-xl bg-surface">
    <h1 class="text-4xl font-semibold">Payments that feel instant</h1>
</x-markas.pixel-trail>
```

Needs Alpine.js.

## React

```tsx
import { PixelTrail } from "@/components/markas/PixelTrail";

<PixelTrail
  variant="dot"
  color="success"
  cellSize={16}
  fade={900}
  showGrid
  className="grid h-80 place-items-center rounded-xl bg-surface"
>
  <h1 className="text-4xl font-semibold">Payments that feel instant</h1>
</PixelTrail>;
```

## Vue

```vue
<template>
  <PixelTrail
    variant="dot"
    color="success"
    :cell-size="16"
    :fade="900"
    show-grid
    class="grid h-80 place-items-center rounded-xl bg-surface"
  >
    <h1 class="text-4xl font-semibold">Payments that feel instant</h1>
  </PixelTrail>
</template>
```

## Notes

- Cells are drawn on one canvas behind the content, so even thousands of cells cost no DOM nodes. The canvas only redraws while some cell is still lit.
- `variant`: `pixel` squares, `dot` circles, or `brush`, which also lights the neighbours more softly. Fast moves are filled in, so the trail has no gaps.
- When an element inside gets keyboard focus, the cells around it light up. `autoplay` draws a trail of its own while the area is on screen and the pointer is elsewhere.
- The color is read from the theme token, so it follows dark mode. With reduced motion nothing is drawn. Attributes and `class` go to the area.
