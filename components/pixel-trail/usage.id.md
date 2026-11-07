## Blade

```blade
<x-markas.pixel-trail variant="dot" color="success" :cell-size="16" :fade="900" show-grid class="grid h-80 place-items-center rounded-xl bg-surface">
    <h1 class="text-4xl font-semibold">Pembayaran yang terasa instan</h1>
</x-markas.pixel-trail>
```

Butuh Alpine.js.

## React

```tsx
import { PixelTrail } from "@/components/markas/PixelTrail";

<PixelTrail
  variant="dot"
  color="success"
  cellSize={16}
  fade={900}
  showGrid
  className="grid h-80 place-items-center rounded-xl bg-surface"
>
  <h1 className="text-4xl font-semibold">Pembayaran yang terasa instan</h1>
</PixelTrail>;
```

## Vue

```vue
<template>
  <PixelTrail
    variant="dot"
    color="success"
    :cell-size="16"
    :fade="900"
    show-grid
    class="grid h-80 place-items-center rounded-xl bg-surface"
  >
    <h1 class="text-4xl font-semibold">Pembayaran yang terasa instan</h1>
  </PixelTrail>
</template>
```

## Catatan

- Sel digambar di satu canvas di belakang konten, jadi ribuan sel pun tidak menambah node DOM. Canvas hanya menggambar ulang selama masih ada sel yang menyala.
- `variant`: persegi `pixel`, lingkaran `dot`, atau `brush` yang juga menyalakan sel di sekitarnya dengan lebih lembut. Gerakan cepat diisi, sehingga jejak tidak berlubang.
- Saat elemen di dalamnya mendapat fokus keyboard, sel di sekitarnya menyala. `autoplay` menggambar jejak sendiri selama area terlihat dan kursor di tempat lain.
- Warna dibaca dari token tema, sehingga mengikuti mode gelap. Dengan reduced motion tidak ada yang digambar. Atribut dan `class` jatuh ke area.
