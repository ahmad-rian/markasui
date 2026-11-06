## Blade

```blade
<x-markas.tilt-card :max-angle="12" class="w-72 border border-line bg-surface p-5">
    <img data-depth="16" src="/img/headphones.png" alt="" class="rounded-lg" />
    <p class="mt-4 font-semibold">Studio headphones</p>
    <x-markas.button>Add to cart</x-markas.button>
</x-markas.tilt-card>
```

Needs Alpine.js.

## React

```tsx
import { TiltCard } from "@/components/markas/TiltCard";

<TiltCard maxAngle={12} className="w-72 border border-line bg-surface p-5">
  <img
    data-depth="16"
    src="/img/headphones.png"
    alt=""
    className="rounded-lg"
  />
  <p className="mt-4 font-semibold">Studio headphones</p>
</TiltCard>;
```

## Vue

```vue
<template>
  <TiltCard :max-angle="12" class="w-72 border border-line bg-surface p-5">
    <img data-depth="16" src="/img/headphones.png" alt="" class="rounded-lg" />
    <p class="mt-4 font-semibold">Studio headphones</p>
  </TiltCard>
</template>
```

## Notes

- The card rotates up to `maxAngle` degrees toward the pointer through the `--tilt-x` and `--tilt-y` custom properties, and eases back when the pointer leaves.
- Children with `data-depth="16"` shift up to 16px for parallax. Use it on one or two elements.
- Keyboard focus on a link or button inside lifts the card slightly. With reduced motion the card stays flat.
- `glare={false}` removes the moving light. Attributes and `class` go to the card itself.
