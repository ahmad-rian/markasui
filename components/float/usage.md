## Blade

```blade
<div class="relative grid h-80 place-items-center overflow-hidden rounded-xl bg-canvas">
    <x-markas.float :parallax="14" aria-hidden="true" class="absolute inset-0">
        <span class="absolute top-[12%] left-[10%] rounded-xl bg-surface p-3">...</span>
        <span class="absolute right-[12%] bottom-[16%] rounded-xl bg-surface p-3">...</span>
    </x-markas.float>
    <h1 class="relative text-2xl font-semibold">Ship the idea this week</h1>
</div>
```

Needs Alpine.js.

## React

```tsx
import { Float } from "@/components/markas/Float";

<Float
  motion="bob"
  amplitude={6}
  duration={3}
  className="absolute -top-3 right-5"
>
  <span className="rounded-full bg-primary px-3 py-1 text-xs text-on-primary">
    Save 20%
  </span>
</Float>;
```

## Vue

```vue
<template>
  <Float
    motion="orbit"
    :amplitude="8"
    entrance
    aria-hidden="true"
    class="absolute inset-0"
  >
    <span
      class="absolute top-[14%] left-[18%] size-12 rounded-full bg-primary-soft"
      >RP</span
    >
    <span
      class="absolute right-[14%] bottom-[18%] size-14 rounded-full bg-primary"
      >DP</span
    >
  </Float>
</template>
```

## Notes

- Every direct child floats on its own loop. `motion` picks the path: `drift` (figure eight with a slight sway), `bob` (rise and fall), `orbit` (small circle), or `breathe` (gentle swell).
- Timing, size, and direction vary per child from `seed`, so the same seed looks the same in Blade, React, and Vue.
- `parallax` shifts children toward the pointer. Set `data-depth="0.2"` to `"1"` on a child to control how far it moves.
- `entrance` pops the children in one after another the first time the group scrolls into view.
- A child stops while it is hovered or focused, and all loops pause off screen. The loop animates `transform` on each child; wrap a child that needs its own transform utilities.
