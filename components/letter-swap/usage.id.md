## Blade

```blade
<a href="/pricing" class="text-sm font-medium">
    <x-markas.letter-swap text="Pricing" />
</a>
<button type="button" class="h-10 rounded-lg bg-primary px-4 text-on-primary">
    <x-markas.letter-swap text="Coba gratis" mode="pingpong" direction="down" />
</button>
<a href="/careers"><x-markas.letter-swap text="Karier" mode="random" /></a>
```

## React

```tsx
import { LetterSwap } from "@/components/markas/LetterSwap";

<a href="/pricing" className="text-sm font-medium">
  <LetterSwap text="Pricing" />
</a>
<button type="button" className="h-10 rounded-lg bg-primary px-4 text-on-primary">
  <LetterSwap text="Coba gratis" mode="pingpong" direction="down" />
</button>
<a href="/careers"><LetterSwap text="Karier" mode="random" /></a>
```

## Vue

```vue
<template>
  <a href="/pricing" class="text-sm font-medium">
    <LetterSwap text="Pricing" />
  </a>
  <button type="button" class="h-10 rounded-lg bg-primary px-4 text-on-primary">
    <LetterSwap text="Coba gratis" mode="pingpong" direction="down" />
  </button>
  <a href="/careers"><LetterSwap text="Karier" mode="random" /></a>
</template>
```

## Catatan

- Letakkan komponen di dalam link atau tombol. Komponen mendengarkan hover dan fokus pada `a`, `button`, `label`, atau elemen ber-`tabindex` terdekat, sehingga pengguna keyboard melihat pertukaran yang sama.
- `forward` dan `random` berjalan sekali per hover dan mengabaikan hover baru sampai selesai. `pingpong` bertukar saat hover dan kembali saat kursor pergi atau fokus lepas.
- Urutan acak berasal dari hash tetap, sehingga sama di setiap render dan di setiap framework.
- Screen reader membaca teks sekali dari salinan tersembunyi. Dengan reduced motion, huruf diam. Versi Blade butuh Alpine.js.
