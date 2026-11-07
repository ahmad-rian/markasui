## Blade

```blade
<x-markas.image-trail variant="scale" :threshold="48" class="grid h-72 place-items-center rounded-xl bg-subtle">
    <x-slot:items>
        <img src="/img/sepatu-1.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/sepatu-2.webp" alt="" class="w-20 rounded-lg" />
        <img src="/img/sepatu-3.webp" alt="" class="w-20 rounded-lg" />
    </x-slot:items>
    <h2 class="text-2xl font-semibold">Sneakers musim baru</h2>
</x-markas.image-trail>
```

Butuh Alpine.js.

## React

```tsx
import { ImageTrail } from "@/components/markas/ImageTrail";

<ImageTrail
  variant="scale"
  threshold={48}
  className="grid h-72 place-items-center rounded-xl bg-subtle"
  items={
    <>
      <img src="/img/sepatu-1.webp" alt="" className="w-20 rounded-lg" />
      <img src="/img/sepatu-2.webp" alt="" className="w-20 rounded-lg" />
      <img src="/img/sepatu-3.webp" alt="" className="w-20 rounded-lg" />
    </>
  }
>
  <h2 className="text-2xl font-semibold">Sneakers musim baru</h2>
</ImageTrail>;
```

## Vue

```vue
<template>
  <ImageTrail
    variant="scale"
    :threshold="48"
    class="grid h-72 place-items-center rounded-xl bg-subtle"
  >
    <template #items>
      <img src="/img/sepatu-1.webp" alt="" class="w-20 rounded-lg" />
      <img src="/img/sepatu-2.webp" alt="" class="w-20 rounded-lg" />
      <img src="/img/sepatu-3.webp" alt="" class="w-20 rounded-lg" />
    </template>
    <h2 class="text-2xl font-semibold">Sneakers musim baru</h2>
  </ImageTrail>
</template>
```

## Catatan

- Elemen digandakan bergantian ke posisi kursor setiap `threshold` px. Paling banyak `max` salinan hidup sekaligus dan yang selesai dihapus, sehingga DOM tetap kecil.
- `variant`: `fade`, `scale`, `rotate` (sudutnya mengikuti pola tetap, jadi setiap putaran terlihat sama), atau `stack`, tempat elemen menumpuk sampai kursor keluar.
- `autoplay` menggambar jejak angka delapan selama area terlihat dan kursor di tempat lain. Berhenti saat area tergulir keluar atau tab disembunyikan.
- Jejak berada di belakang konten dan bersifat aria-hidden. Dengan reduced motion tidak ada yang digambar. Atribut dan `class` jatuh ke area itu sendiri.
