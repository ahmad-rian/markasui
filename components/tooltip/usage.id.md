## Blade

```blade
<x-markas.tooltip content="Salin tautan ke papan klip">
    <x-markas.button variant="secondary">Salin tautan</x-markas.button>
</x-markas.tooltip>
```

Butuh Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Tooltip } from "@/components/markas/Tooltip";

<Tooltip content="Salin tautan ke papan klip">
  <Button variant="secondary">Salin tautan</Button>
</Tooltip>;
```

## Vue

```vue
<template>
  <Tooltip content="Salin tautan ke papan klip">
    <Button variant="secondary">Salin tautan</Button>
  </Tooltip>
</template>
```

## Catatan

- Elemen pertama di dalam Tooltip otomatis diberi `aria-describedby` ke tooltip.
- Pakai `side="bottom"` untuk menampilkan tooltip di bawah pemicu.
- Tooltip tidak punya teks bawaan. Tulis `content` langsung dalam Bahasa Indonesia.
