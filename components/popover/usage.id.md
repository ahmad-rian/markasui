## Blade

```blade
<x-markas.popover label="Bagikan">
    <div class="grid gap-3">
        <p class="text-muted">Siapa pun yang punya link bisa melihat proyek ini.</p>
        <x-markas.button size="sm">Salin link</x-markas.button>
    </div>
</x-markas.popover>
```

Butuh Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Popover } from "@/components/markas/Popover";

<Popover label="Bagikan" align="end">
  <div className="grid gap-3">
    <p className="text-muted">
      Siapa pun yang punya link bisa melihat proyek ini.
    </p>
    <Button size="sm">Salin link</Button>
  </div>
</Popover>;
```

## Vue

```vue
<template>
  <Popover label="Bagikan" side="top">
    <div class="grid gap-3">
      <p class="text-muted">
        Siapa pun yang punya link bisa melihat proyek ini.
      </p>
      <Button size="sm">Salin link</Button>
    </div>
  </Popover>
</template>
```

## Catatan

- Panel muncul di bawah pemicu, rata dengan tepi awalnya. Ubah lewat `side` (`top`, `bottom`) dan `align` (`start`, `center`, `end`).
- Pakai slot `trigger` untuk pemicu ikon dan sertakan teks sr-only, misalnya `<span class="sr-only">Pengaturan notifikasi</span>`.
- Teks pemicu default dalam bahasa Inggris ("Open"). Isi `label` dalam bahasa situs Anda, misalnya "Buka" atau "Bagikan".
