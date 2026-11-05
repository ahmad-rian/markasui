## Blade

```blade
<x-markas.separator />

<div class="flex h-5 items-center gap-3">
    <span>Dokumentasi</span>
    <x-markas.separator orientation="vertical" />
    <span>Blog</span>
</div>

<x-markas.separator label="atau" />
<x-markas.separator :decorative="false" />
```

## React

```tsx
import { Separator } from "@/components/markas/Separator";

<Separator />
<div className="flex h-5 items-center gap-3">
  <span>Dokumentasi</span>
  <Separator orientation="vertical" />
  <span>Blog</span>
</div>
<Separator label="atau" />
<Separator decorative={false} />
```

## Vue

```vue
<template>
  <Separator />
  <div class="flex h-5 items-center gap-3">
    <span>Dokumentasi</span>
    <Separator orientation="vertical" />
    <span>Blog</span>
  </div>
  <Separator label="atau" />
  <Separator :decorative="false" />
</template>
```

## Catatan

- Tanpa JavaScript. Versi Blade tidak butuh Alpine.js.
- Separator vertikal memakai `self-stretch`, jadi letakkan di dalam baris flex yang punya tinggi.
- Atur jarak lewat class, misalnya `class="my-4"`.
- Komponen tidak punya teks bawaan. Isi `label` dalam Bahasa Indonesia, misalnya "atau".
