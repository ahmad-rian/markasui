## Blade

```blade
<x-markas.magnet>
    <x-markas.button size="lg">
        Mulai sekarang <span data-depth="0.5">&rarr;</span>
    </x-markas.button>
</x-markas.magnet>
```

Butuh Alpine.js.

## React

```tsx
import { Magnet } from "@/components/markas/Magnet";

<Magnet strength={0.5} radius={32}>
  <a
    href="/kontak"
    aria-label="Email"
    className="grid size-10 place-items-center rounded-full border border-line"
  >
    ...
  </a>
</Magnet>;
```

## Vue

```vue
<template>
  <Magnet
    mode="repel"
    :strength="0.6"
    :radius="70"
    class="rounded-lg border-2 border-dashed px-4 py-2"
  >
    Potongan Rp 50.000
  </Magnet>
</template>
```

## Catatan

- Dalam jarak `radius` px dari tepinya, isi mengikuti mouse sebesar `strength` (0 sampai 1) dan kembali memegas dengan sedikit lewat saat mouse menjauh.
- `mode="repel"` justru menghindari kursor. Pakai hanya untuk elemen dekoratif yang jenaka.
- Elemen di dalam dengan `data-depth="0.5"` bergerak 50% lebih jauh, sehingga panah atau ikon di dalam tombol terasa berlapis.
- Pembungkusnya `w-fit`; atribut dan `class` jatuh ke sana. Ia hanya mendengarkan saat terlihat di layar, mengabaikan sentuhan, dan diam dengan reduced motion.
