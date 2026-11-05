## Blade

```blade
<x-markas.carousel
    label="Tur produk"
    show-dots
    previous-label="Slide sebelumnya"
    next-label="Slide berikutnya"
    slide-label="{index} dari {total}"
    dot-label="Ke slide {index}"
>
    <x-slot:rencana>
        <div class="h-40 rounded-xl bg-subtle p-5">Rencanakan minggu Anda</div>
    </x-slot:rencana>
    <x-slot:bagikan>
        <div class="h-40 rounded-xl bg-subtle p-5">Bagikan ke tim</div>
    </x-slot:bagikan>
</x-markas.carousel>
```

Butuh Alpine.js. Setiap named slot menjadi satu slide sesuai urutan penulisan. Untuk daftar, pakai `<x-slot :name="'slide-'.$index">` di dalam `@foreach`.

## React

```tsx
import { Carousel } from "@/components/markas/Carousel";

<Carousel
  label="Tur produk"
  showDots
  previousLabel="Slide sebelumnya"
  nextLabel="Slide berikutnya"
  slideLabel="{index} dari {total}"
  dotLabel="Ke slide {index}"
>
  <div className="h-40 rounded-xl bg-subtle p-5">Rencanakan minggu Anda</div>
  <div className="h-40 rounded-xl bg-subtle p-5">Bagikan ke tim</div>
</Carousel>;
```

## Vue

```vue
<template>
  <Carousel
    label="Tur produk"
    show-dots
    previous-label="Slide sebelumnya"
    next-label="Slide berikutnya"
    slide-label="{index} dari {total}"
    dot-label="Ke slide {index}"
  >
    <div class="h-40 rounded-xl bg-subtle p-5">Rencanakan minggu Anda</div>
    <div class="h-40 rounded-xl bg-subtle p-5">Bagikan ke tim</div>
  </Carousel>
</template>
```

## Catatan

- Slide digulir dengan CSS scroll snap, jadi swipe sentuh dan trackpad langsung berfungsi.
- Pakai `perView` 2 atau 3 untuk menampilkan beberapa kartu sekaligus. Tombol tetap bergeser satu slide per tekan.
- `slideLabel` dan `dotLabel` menerima placeholder `{index}` dan `{total}`.
- Sengaja tanpa autoplay.
