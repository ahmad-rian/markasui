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

## Svelte

```svelte
<script lang="ts">
  import RippleButton from "$lib/components/markas/RippleButton.svelte";
</script>

<RippleButton onclick={addToCart}>Tambah ke keranjang</RippleButton>
<RippleButton variant="secondary" type="submit">Berlangganan</RippleButton>
```

## Astro

```astro
---
import RippleButton from "@/components/markas/RippleButton.astro";
---

<RippleButton>Tambah ke keranjang</RippleButton>
<RippleButton variant="secondary" type="submit">Berlangganan</RippleButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { RippleButton } from "./markas/ripple-button.component";

@Component({
  selector: "app-cart",
  imports: [RippleButton],
  template: `
    <button markas-ripple-button (click)="addToCart()">
      Tambah ke keranjang
    </button>
    <button markas-ripple-button variant="secondary" type="submit">
      Berlangganan
    </button>
  `,
})
export class Cart {
  addToCart() {}
}
```

Angular memakai attribute selector pada button native, jadi `disabled`, `aria-*`, dan `class` tetap di button itu.

## Catatan

- Klik mouse atau sentuhan memulai gelombang di titik pointer. Enter dan Spasi memulainya dari tengah.
- Gelombang memakai warna teks dengan opasitas rendah, jadi setiap varian mendapat gelombang yang serasi.
- Blade butuh Alpine.js.
