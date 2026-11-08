## Blade

```blade
<x-markas.background-lines variant="waves" :count="12" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Ide yang bergerak</h2>
</x-markas.background-lines>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { BackgroundLines } from "@/components/markas/BackgroundLines";

<BackgroundLines
  variant="waves"
  count={12}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">Ide yang bergerak</h2>
</BackgroundLines>;
```

## Vue

```vue
<template>
  <BackgroundLines
    variant="waves"
    :count="12"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">Ide yang bergerak</h2>
  </BackgroundLines>
</template>
```

## Catatan

- Setiap garis tergambar, bertahan, lalu memudar, bergeser dari garis tetangganya supaya gambar tidak pernah kosong.
- `rays` memancar dari tengah atas: beri padding atas supaya sumber cahaya berada di atas judul.
- Garis mengikuti ukuran area (gambar 800x400 menutupinya seperti `object-fit: cover`).
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
