## Blade

```blade
<x-markas.spotlight-card>
    <div class="p-6">
        <h3 class="font-semibold">Pratinjau instan</h3>
        <p class="text-sm text-muted">Setiap pull request punya tautannya sendiri.</p>
    </div>
</x-markas.spotlight-card>

<x-markas.spotlight-card color="success">...</x-markas.spotlight-card>
```

## React

```tsx
import { SpotlightCard } from "@/components/markas/SpotlightCard";

<SpotlightCard>
  <div className="p-6">
    <h3 className="font-semibold">Pratinjau instan</h3>
    <p className="text-sm text-muted">Setiap pull request punya tautannya sendiri.</p>
  </div>
</SpotlightCard>

<SpotlightCard color="success">...</SpotlightCard>
```

## Vue

```vue
<template>
  <SpotlightCard>
    <div class="p-6">
      <h3 class="font-semibold">Pratinjau instan</h3>
      <p class="text-sm text-muted">
        Setiap pull request punya tautannya sendiri.
      </p>
    </div>
  </SpotlightCard>

  <SpotlightCard color="success">...</SpotlightCard>
</template>
```

## Catatan

- Posisi kursor disimpan di custom property `--spot-x` dan `--spot-y`; sorotan dan border berupa gradien radial CSS.
- Fokus di dalam kartu menampilkan cahaya di tengah, jadi pengguna keyboard mendapat umpan balik yang sama. Versi Blade butuh Alpine.js.
- Class dan atribut jatuh ke elemen luar. Tambahkan padding di dalam isi kartu.
