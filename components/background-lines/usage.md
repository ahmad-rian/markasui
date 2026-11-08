## Blade

```blade
<x-markas.background-lines variant="waves" :count="12" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Ideas in motion</h2>
</x-markas.background-lines>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { BackgroundLines } from "@/components/markas/BackgroundLines";

<BackgroundLines
  variant="waves"
  count={12}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">Ideas in motion</h2>
</BackgroundLines>;
```

## Vue

```vue
<template>
  <BackgroundLines
    variant="waves"
    :count="12"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">Ideas in motion</h2>
  </BackgroundLines>
</template>
```

## Notes

- Each line draws in, holds, and fades out, offset from its neighbours so the picture never empties.
- `rays` fans out from the top center: add top padding so the light source sits above the headline.
- The lines scale with the area (the 800x400 drawing covers it like `object-fit: cover`).
- The component has no built-in text, so there are no label props to translate.
