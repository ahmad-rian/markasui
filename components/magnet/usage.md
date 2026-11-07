## Blade

```blade
<x-markas.magnet>
    <x-markas.button size="lg">
        Get started <span data-depth="0.5">&rarr;</span>
    </x-markas.button>
</x-markas.magnet>
```

Needs Alpine.js.

## React

```tsx
import { Magnet } from "@/components/markas/Magnet";

<Magnet strength={0.5} radius={32}>
  <a
    href="/contact"
    aria-label="Email"
    className="grid size-10 place-items-center rounded-full border border-line"
  >
    ...
  </a>
</Magnet>;
```

## Vue

```vue
<template>
  <Magnet
    mode="repel"
    :strength="0.6"
    :radius="70"
    class="rounded-lg border-2 border-dashed px-4 py-2"
  >
    Rp 50.000 off
  </Magnet>
</template>
```

## Notes

- Within `radius` px of its edges the content follows the mouse by `strength` (0 to 1) and springs back with a slight overshoot when the mouse moves away.
- `mode="repel"` dodges the pointer instead. Keep it for playful, decorative elements.
- Inner elements with `data-depth="0.5"` travel 50% further, which makes an arrow or icon inside a button feel layered.
- The wrapper is `w-fit`; attributes and `class` go to it. It listens only while on screen, ignores touch, and stays still with reduced motion.
