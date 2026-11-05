## Blade

```blade
<p class="text-4xl font-semibold">
    <x-markas.number-ticker :value="84200000" prefix="Rp" locale="id-ID" />
</p>
<x-markas.number-ticker :value="99.9" :decimals="1" suffix="%" locale="id-ID" />
<x-markas.number-ticker :value="12" :from="100" />
```

## React

```tsx
import { NumberTicker } from "@/components/markas/NumberTicker";

<p className="text-4xl font-semibold">
  <NumberTicker value={84200000} prefix="Rp" locale="id-ID" />
</p>
<NumberTicker value={99.9} decimals={1} suffix="%" locale="id-ID" />
<NumberTicker value={12} from={100} />
```

## Vue

```vue
<template>
  <p class="text-4xl font-semibold">
    <NumberTicker :value="84200000" prefix="Rp" locale="id-ID" />
  </p>
  <NumberTicker :value="99.9" :decimals="1" suffix="%" locale="id-ID" />
  <NumberTicker :value="12" :from="100" />
</template>
```

## Catatan

- Hitungan dimulai saat angka pertama kali masuk layar dan melambat menjelang akhir.
- Server merender nilai akhir, jadi angka tetap benar tanpa JavaScript dan untuk mesin pencari.
- Format memakai `Intl.NumberFormat` dengan `locale` (bawaan `en-US`). Isi `id-ID` agar pemisah ribuan berupa titik. Versi Blade butuh Alpine.js.
- Dengan reduced motion, nilai akhir langsung tampil.
