## Blade

```blade
<x-markas.currency-input
    label="Nominal top-up"
    name="amount"
    hint="Minimum Rp10.000"
    presets-label="Nominal cepat"
    :min="10000"
    :value="old('amount', 100000)"
    :presets="[50000, 100000, 250000, 500000]"
/>
```

Butuh Alpine.js. Form menerima `amount=100000`, angka murni tanpa pemisah.

## React

```tsx
import { CurrencyInput } from "@/components/markas/CurrencyInput";

<CurrencyInput
  label="Nominal top-up"
  name="amount"
  hint="Minimum Rp10.000"
  presetsLabel="Nominal cepat"
  min={10000}
  defaultValue={100000}
  presets={[50000, 100000, 250000, 500000]}
  onValueChange={setNominal}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import CurrencyInput from "@/components/markas/CurrencyInput.vue";

const nominal = ref<number | null>(100000);
</script>

<template>
  <CurrencyInput
    v-model="nominal"
    label="Nominal top-up"
    name="amount"
    hint="Minimum Rp10.000"
    presets-label="Nominal cepat"
    :min="10000"
    :presets="[50000, 100000, 250000, 500000]"
  />
</template>
```

## Catatan

- IDR adalah default: prefiks `Rp`, pemisah ribuan titik (12.500.000), tanpa desimal. `currency="USD"` beralih ke `$`, pemisah ribuan koma, dan maksimal dua desimal (1,250.50).
- Pemisah ditambahkan saat mengetik dan kursor tetap di samping angka yang diketik. Backspace atau Delete di samping pemisah menghapus angka di sebelahnya.
- Kolom yang terlihat tidak punya `name`. Isi `name` untuk merender input tersembunyi berisi angka murni, siap untuk form biasa.
- `min` dan `max` membatasi nominal saat blur dan saat chip dipilih. Tetap validasi di server.
- Chip menghitung angka menuju nominal baru dalam 400ms. Saat reduced motion nominal langsung berubah.
- Atribut dan `class` jatuh ke kolom yang terlihat.
