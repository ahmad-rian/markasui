## Blade

```blade
<x-markas.ripple-button>Tambah ke keranjang</x-markas.ripple-button>
<x-markas.ripple-button variant="secondary" type="submit">Berlangganan</x-markas.ripple-button>
```

## React

```tsx
import { RippleButton } from "@/components/markas/RippleButton";

<RippleButton onClick={addToCart}>Tambah ke keranjang</RippleButton>
<RippleButton variant="secondary" type="submit">Berlangganan</RippleButton>
```

## Vue

```vue
<script setup lang="ts">
import RippleButton from "@/components/markas/RippleButton.vue";
</script>

<template>
  <RippleButton @click="addToCart">Tambah ke keranjang</RippleButton>
  <RippleButton variant="secondary" type="submit">Berlangganan</RippleButton>
</template>
```

## Catatan

- Klik mouse atau sentuhan memulai gelombang di titik pointer. Enter dan Spasi memulainya dari tengah.
- Gelombang memakai warna teks dengan opasitas rendah, jadi setiap varian mendapat gelombang yang serasi.
- Blade butuh Alpine.js.
