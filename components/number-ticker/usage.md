## Blade

```blade
<p class="text-4xl font-semibold">
    <x-markas.number-ticker :value="84200" prefix="$" />
</p>
<x-markas.number-ticker :value="99.9" :decimals="1" suffix="%" />
<x-markas.number-ticker :value="12" :from="100" />
```

## React

```tsx
import { NumberTicker } from "@/components/markas/NumberTicker";

<p className="text-4xl font-semibold">
  <NumberTicker value={84200} prefix="$" />
</p>
<NumberTicker value={99.9} decimals={1} suffix="%" />
<NumberTicker value={12} from={100} />
```

## Vue

```vue
<template>
  <p class="text-4xl font-semibold">
    <NumberTicker :value="84200" prefix="$" />
  </p>
  <NumberTicker :value="99.9" :decimals="1" suffix="%" />
  <NumberTicker :value="12" :from="100" />
</template>
```

## Notes

- The count starts the first time the number scrolls into view and eases out toward the end.
- The server renders the final value, so the number is correct without JavaScript and for search engines.
- Formatting uses `Intl.NumberFormat` with `locale` (default `en-US`). The Blade version needs Alpine.js.
- With reduced motion, the final value is shown immediately.
