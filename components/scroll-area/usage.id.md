## Blade

```blade
<x-markas.scroll-area label="Rilis" class="max-h-56 border border-line">
    <div class="p-4">...</div>
</x-markas.scroll-area>
```

## React

```tsx
import { ScrollArea } from "@/components/markas/ScrollArea";

<ScrollArea label="Rilis" className="max-h-56 border border-line">
  <div className="p-4">...</div>
</ScrollArea>;
```

## Vue

```vue
<template>
  <ScrollArea label="Rilis" class="max-h-56 border border-line">
    <div class="p-4">...</div>
  </ScrollArea>
</template>
```

## Catatan

- Atur batas ukuran dengan class seperti `max-h-56` atau `max-w-sm`. Tanpa itu tidak ada yang tergulir.
- Pakai `orientation="horizontal"` untuk deretan kartu dan `orientation="both"` untuk grid yang lebar.
- Label default "Scrollable content". Isi `label` dalam Bahasa Indonesia sesuai isi area.
- Scrollbar tetap native, hanya lebih tipis dan berwarna token, jadi tidak butuh JavaScript.
