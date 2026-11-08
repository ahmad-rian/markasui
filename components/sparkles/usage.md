## Blade

```blade
<x-markas.sparkles variant="field" :density="36" color="warning" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Your workspace is ready</h2>
    <x-markas.button>Open dashboard</x-markas.button>
</x-markas.sparkles>

<x-markas.sparkles variant="text" size="sm" class="px-6 py-4">
    <h2 class="text-3xl font-semibold text-ink">Meet Markas Pro</h2>
</x-markas.sparkles>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Sparkles } from "@/components/markas/Sparkles";

<Sparkles
  variant="burst"
  density={32}
  size="lg"
  className="rounded-xl border border-line bg-surface px-6 py-10"
>
  <h2 className="text-xl font-semibold text-ink">Unlock every template</h2>
  <Button>Upgrade now</Button>
</Sparkles>;
```

## Vue

```vue
<template>
  <Sparkles
    variant="burst"
    :density="32"
    size="lg"
    class="rounded-xl border border-line bg-surface px-6 py-10"
  >
    <h2 class="text-xl font-semibold text-ink">Unlock every template</h2>
    <Button>Upgrade now</Button>
  </Sparkles>
</template>
```

## Notes

- Positions, sizes, and timing come from `seed` with integer math, so Blade, React, and Vue render the same sparkles.
- `burst` uses a CSS hover and focus-within group on the component, so it needs no JavaScript and also plays for keyboard users.
- With reduced motion, field and text sparkles stay still and burst sparkles stay hidden.
- The component has no built-in text, so there are no label props to translate.
