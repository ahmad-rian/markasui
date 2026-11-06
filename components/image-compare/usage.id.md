## Blade

```blade
<x-markas.image-compare aria-label="Renovasi ruang tamu" :position="40" before-label="Sebelum" after-label="Sesudah" slider-label="Posisi perbandingan">
    <x-slot:before>
        <img src="/img/before.jpg" alt="Ruang tamu sebelum renovasi" class="aspect-video size-full object-cover" />
    </x-slot:before>
    <x-slot:after>
        <img src="/img/after.jpg" alt="Ruang tamu sesudah renovasi" class="aspect-video size-full object-cover" />
    </x-slot:after>
</x-markas.image-compare>
```

Butuh Alpine.js. Komponen mengirim event `position-change` berisi persen baru.

## React

```tsx
import { ImageCompare } from "@/components/markas/ImageCompare";

<ImageCompare
  aria-label="Renovasi ruang tamu"
  defaultPosition={40}
  beforeLabel="Sebelum"
  afterLabel="Sesudah"
  sliderLabel="Posisi perbandingan"
  before={<img src="/img/before.jpg" alt="Ruang tamu sebelum renovasi" />}
  after={<img src="/img/after.jpg" alt="Ruang tamu sesudah renovasi" />}
/>;
```

## Vue

```vue
<template>
  <ImageCompare
    v-model:position="posisi"
    aria-label="Renovasi ruang tamu"
    before-label="Sebelum"
    after-label="Sesudah"
    slider-label="Posisi perbandingan"
  >
    <template #before
      ><img src="/img/before.jpg" alt="Ruang tamu sebelum renovasi"
    /></template>
    <template #after
      ><img src="/img/after.jpg" alt="Ruang tamu sesudah renovasi"
    /></template>
  </ImageCompare>
</template>
```

## Catatan

- Before di kiri (atau atas dengan `orientation="vertical"`), after di kanan (atau bawah). Beri ukuran yang sama.
- Geser di mana saja, klik satu titik, atau fokus pegangan lalu pakai tombol panah, Page Up/Down, Home, dan End.
- Isi apa pun bisa: img, picture, svg, atau markup biasa seperti UI lama dan baru.
- Atribut dan `class` jatuh ke elemen luar.
