## Blade

```blade
<x-markas.sparkles variant="field" :density="36" color="warning" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Workspace kamu sudah siap</h2>
    <x-markas.button>Buka dasbor</x-markas.button>
</x-markas.sparkles>

<x-markas.sparkles variant="text" size="sm" class="px-6 py-4">
    <h2 class="text-3xl font-semibold text-ink">Kenalan dengan Markas Pro</h2>
</x-markas.sparkles>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Sparkles } from "@/components/markas/Sparkles";

<Sparkles
  variant="burst"
  density={32}
  size="lg"
  className="rounded-xl border border-line bg-surface px-6 py-10"
>
  <h2 className="text-xl font-semibold text-ink">Buka semua template</h2>
  <Button>Upgrade sekarang</Button>
</Sparkles>;
```

## Vue

```vue
<template>
  <Sparkles
    variant="burst"
    :density="32"
    size="lg"
    class="rounded-xl border border-line bg-surface px-6 py-10"
  >
    <h2 class="text-xl font-semibold text-ink">Buka semua template</h2>
    <Button>Upgrade sekarang</Button>
  </Sparkles>
</template>
```

## Catatan

- Posisi, ukuran, dan waktu dihitung dari `seed` dengan bilangan bulat, jadi Blade, React, dan Vue merender kilau yang sama.
- `burst` memakai grup hover dan focus-within CSS pada komponen, jadi tanpa JavaScript dan juga berjalan untuk pengguna keyboard.
- Dengan reduced motion, kilau field dan text diam, dan kilau burst tetap tersembunyi.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
