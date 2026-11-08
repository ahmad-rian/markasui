## Blade

```blade
<x-markas.background-beams variant="flow" :count="10" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Light up your launch</h2>
</x-markas.background-beams>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { BackgroundBeams } from "@/components/markas/BackgroundBeams";

<BackgroundBeams
  variant="flow"
  count={10}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">
    Light up your launch
  </h2>
</BackgroundBeams>;
```

## Vue

```vue
<template>
  <BackgroundBeams
    variant="flow"
    :count="10"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">
      Light up your launch
    </h2>
  </BackgroundBeams>
</template>
```

## Notes

- `flow` sends a glint along each curve, `pulse` fades curves in turn, `collide` drops vertical beams that splash at the bottom edge.
- With `collide`, add bottom padding (for example `pb-16`) so the splashes land below your content.
- Beam positions come from a formula, so Blade, React, and Vue render the same picture.
- The component has no built-in text, so there are no label props to translate.
