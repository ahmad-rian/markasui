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

## Svelte

```svelte
<script lang="ts">
  import CurrencyInput from "$lib/components/markas/CurrencyInput.svelte";

  let amount = $state<number | null>(100000);
</script>

<CurrencyInput
  label="Top-up amount"
  name="amount"
  hint="Minimum Rp10.000"
  min={10000}
  bind:value={amount}
  presets={[50000, 100000, 250000, 500000]}
/>
```

## Astro

```astro
---
import CurrencyInput from "@/components/markas/CurrencyInput.astro";
---

<CurrencyInput
  label="Top-up amount"
  name="amount"
  hint="Minimum Rp10.000"
  min={10000}
  defaultValue={100000}
  presets={[50000, 100000, 250000, 500000]}
/>
```

Custom element kecil memformat saat mengetik dan mengisi input tersembunyi. Ia mengirim event `markas-change` yang menggelembung dengan nominal (atau null) sebagai detail.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { CurrencyInput } from "./markas/currency-input.component";

@Component({
  selector: "app-top-up",
  imports: [CurrencyInput],
  template: `
    <markas-currency-input
      label="Top-up amount"
      name="amount"
      hint="Minimum Rp10.000"
      [min]="10000"
      [(value)]="amount"
      [presets]="presets"
    />
  `,
})
export class TopUp {
  amount = signal<number | null>(100000);
  presets = [50000, 100000, 250000, 500000];
}
```

`id`, `name`, `placeholder`, `aria-label`, dan `class` jatuh ke field yang terlihat.

## Catatan

- IDR adalah default: prefiks `Rp`, pemisah ribuan titik (12.500.000), tanpa desimal. `currency="USD"` beralih ke `$`, pemisah ribuan koma, dan maksimal dua desimal (1,250.50).
- Pemisah ditambahkan saat mengetik dan kursor tetap di samping angka yang diketik. Backspace atau Delete di samping pemisah menghapus angka di sebelahnya.
- Kolom yang terlihat tidak punya `name`. Isi `name` untuk merender input tersembunyi berisi angka murni, siap untuk form biasa.
- `min` dan `max` membatasi nominal saat blur dan saat chip dipilih. Tetap validasi di server.
- Chip menghitung angka menuju nominal baru dalam 400ms. Saat reduced motion nominal langsung berubah.
- Atribut dan `class` jatuh ke kolom yang terlihat.
