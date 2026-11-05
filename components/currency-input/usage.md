## Blade

```blade
<x-markas.currency-input
    label="Top-up amount"
    name="amount"
    hint="Minimum Rp10.000"
    :min="10000"
    :value="old('amount', 100000)"
    :presets="[50000, 100000, 250000, 500000]"
/>
```

Needs Alpine.js. The form receives `amount=100000`, a plain number without separators.

## React

```tsx
import { CurrencyInput } from "@/components/markas/CurrencyInput";

<CurrencyInput
  label="Top-up amount"
  name="amount"
  hint="Minimum Rp10.000"
  min={10000}
  defaultValue={100000}
  presets={[50000, 100000, 250000, 500000]}
  onValueChange={setAmount}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import CurrencyInput from "@/components/markas/CurrencyInput.vue";

const amount = ref<number | null>(100000);
</script>

<template>
  <CurrencyInput
    v-model="amount"
    label="Top-up amount"
    name="amount"
    hint="Minimum Rp10.000"
    :min="10000"
    :presets="[50000, 100000, 250000, 500000]"
  />
</template>
```

## Notes

- IDR is the default: `Rp` prefix, dot thousands (12.500.000), no decimals. `currency="USD"` switches to `$`, comma thousands, and up to two decimals (1,250.50).
- Separators are added while typing and the caret stays next to the digit you typed. Backspace or Delete beside a separator removes the neighbouring digit.
- The visible field has no `name`. Pass `name` to render a hidden input with the plain number, ready for a regular form post.
- `min` and `max` clamp the amount on blur and when a chip is picked. Validate on the server too.
- Chips count the digits to the new amount in 400ms. With reduced motion the amount changes instantly.
- Attributes and `class` go to the visible field.
