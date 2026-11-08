## Blade

```blade
<x-markas.background-boxes variant="skewed" :rows="12" :cols="18" class="rounded-xl bg-surface px-6 py-16">
    <h2 class="text-center text-3xl font-bold text-ink">Desain per blok</h2>
</x-markas.background-boxes>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { BackgroundBoxes } from "@/components/markas/BackgroundBoxes";

<BackgroundBoxes
  variant="skewed"
  rows={12}
  cols={18}
  className="rounded-xl bg-surface px-6 py-16"
>
  <h2 className="text-center text-3xl font-bold text-ink">Desain per blok</h2>
</BackgroundBoxes>;
```

## Vue

```vue
<template>
  <BackgroundBoxes
    variant="skewed"
    :rows="12"
    :cols="18"
    class="rounded-xl bg-surface px-6 py-16"
  >
    <h2 class="text-center text-3xl font-bold text-ink">Desain per blok</h2>
  </BackgroundBoxes>
</template>
```

## Catatan

- Kotak menyala dengan CSS `:hover` biasa dan memudar dalam satu detik. Di layar sentuh, beberapa kotak tetap menyala sendiri.
- Pembungkus konten meneruskan pointer ke grid. Tautan, tombol, label, dan kolom form tetap bisa diklik; teks di dalam konten tidak bisa dipilih dengan mouse.
- Jaga rows kali cols tetap kecil: grid berhenti di 600 kotak.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
