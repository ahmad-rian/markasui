## Blade

```blade
<x-markas.stars-background :count="120" :seed="7" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Deploy yang jalan saat kamu tidur</h2>
    <x-markas.button>Mulai sekarang</x-markas.button>
</x-markas.stars-background>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { StarsBackground } from "@/components/markas/StarsBackground";

<StarsBackground
  count={120}
  seed={7}
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Deploy yang jalan saat kamu tidur
  </h2>
  <Button>Mulai sekarang</Button>
</StarsBackground>;
```

## Vue

```vue
<template>
  <StarsBackground
    :count="120"
    :seed="7"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Deploy yang jalan saat kamu tidur
    </h2>
    <Button>Mulai sekarang</Button>
  </StarsBackground>
</template>
```

## Catatan

- Posisi bintang dihitung dari `seed` dengan bilangan bulat, jadi Blade, React, dan Vue merender langit yang sama di server dan klien.
- Tambahkan class `dark` supaya section tetap gelap di semua tema. Dengan reduced motion bintang berhenti berkelip.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
