## Blade

```blade
<h2 class="text-3xl font-semibold">Our services</h2>
<x-markas.elastic-line variant="pluck" color="primary" :stroke-width="3" :reach="16" play-on-view decorative class="w-40" />

<x-markas.elastic-line variant="push" :reach="32" />
```

Needs Alpine.js.

## React

```tsx
import { ElasticLine } from "@/components/markas/ElasticLine";

<h2 className="text-3xl font-semibold">Our services</h2>
<ElasticLine
  variant="pluck"
  color="primary"
  strokeWidth={3}
  reach={16}
  playOnView
  decorative
  className="w-40"
/>

<ElasticLine variant="push" reach={32} />
```

## Vue

```vue
<template>
  <h2 class="text-3xl font-semibold">Our services</h2>
  <ElasticLine
    variant="pluck"
    color="primary"
    :stroke-width="3"
    :reach="16"
    play-on-view
    decorative
    class="w-40"
  />

  <ElasticLine variant="push" :reach="32" />
</template>
```

## Notes

- The component is `reach` x 2 tall (or wide when vertical) and the line runs through its middle. The pointer bends it only inside that band.
- `pull` bends toward the pointer, `push` away from it, and `pluck` follows the pointer once touched until it slips free and vibrates.
- The curve is one quadratic SVG path. requestAnimationFrame only runs while the pointer is close or the line still moves. `playOnView` twangs it once when it first scrolls into view.
- By default it is a `separator`. Use `decorative` for underlines. With reduced motion the line stays straight. Attributes and `class` go to the wrapper.
