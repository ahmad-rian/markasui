## Blade

```blade
<p class="text-6xl">
    <x-markas.variable-weight-text text="Proximity" :radius="100" :min="200" :max="900" />
</p>
<x-markas.variable-weight-text text="markasui" wave class="text-7xl" />
```

## React

```tsx
import { VariableWeightText } from "@/components/markas/VariableWeightText";

<p className="text-6xl">
  <VariableWeightText text="Proximity" radius={100} min={200} max={900} />
</p>
<VariableWeightText text="markasui" wave className="text-7xl" />
```

## Vue

```vue
<template>
  <p class="text-6xl">
    <VariableWeightText text="Proximity" :radius="100" :min="200" :max="900" />
  </p>
  <VariableWeightText text="markasui" wave class="text-7xl" />
</template>
```

## Notes

- Needs a variable font with a `wght` axis, such as Inter, Geist, Recursive, or the system font on macOS and iOS. With a static font, the weight jumps between the weights you load.
- Each letter sets `font-variation-settings: 'wght' n` and `font-weight` as a fallback. The letter under the cursor gets `max`; letters outside `radius` fall back to `min`, which is also the resting weight.
- `wave` runs a breathing weight wave while the cursor is away. It stops when the text is off screen and when the tab is hidden.
- Screen readers hear the text once. With reduced motion, letters stay at `min`. The Blade version needs Alpine.js.
