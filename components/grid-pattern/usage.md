## Blade

```blade
<x-markas.grid-pattern :cells="[[2, 1], [10, 3]]" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Plan, build, and ship in one place</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.grid-pattern>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { GridPattern } from "@/components/markas/GridPattern";

<GridPattern
  cells={[
    [2, 1],
    [10, 3],
  ]}
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Plan, build, and ship in one place
  </h2>
  <Button>Get started</Button>
</GridPattern>;
```

## Vue

```vue
<template>
  <GridPattern
    :cells="[
      [2, 1],
      [10, 3],
    ]"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Plan, build, and ship in one place
    </h2>
    <Button>Get started</Button>
  </GridPattern>
</template>
```

## Notes

- `cells` takes `[column, row]` pairs counted from the top left, starting at 0.
- Highlighted cells pulse one after another. With reduced motion they stay still.
- The component has no built-in text, so there are no label props to translate.
