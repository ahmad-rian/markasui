## Blade

```blade
<x-markas.hover-card>
    <a href="https://github.com/markasui">@markasui</a>
    <x-slot:content>
        <p class="font-medium text-ink">Markas UI</p>
        <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
    </x-slot:content>
</x-markas.hover-card>
```

Butuh Alpine.js.

## React

```tsx
import { HoverCard } from "@/components/markas/HoverCard";

<HoverCard
  content={
    <>
      <p className="font-medium text-ink">Markas UI</p>
      <p className="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
    </>
  }
>
  <a href="https://github.com/markasui">@markasui</a>
</HoverCard>;
```

## Vue

```vue
<template>
  <HoverCard>
    <a href="https://github.com/markasui">@markasui</a>
    <template #content>
      <p class="font-medium text-ink">Markas UI</p>
      <p class="text-muted">Komponen UI untuk Blade, React, dan Vue.</p>
    </template>
  </HoverCard>
</template>
```

## Catatan

- Elemen pertama di dalam HoverCard adalah pemicu dan otomatis mendapat `aria-describedby` ke kartu.
- Kartu muncul di bawah pemicu dan pindah ke atas bila tidak ada ruang.
- Di dalam paragraf, isi kartu cukup elemen inline (span, a, strong), karena `div` atau `p` akan memecah paragraf pada HTML hasil render server.
- Hover Card tidak punya teks bawaan. Tulis isinya dalam bahasa situs Anda.
