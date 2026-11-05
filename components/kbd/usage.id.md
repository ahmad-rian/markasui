## Blade

```blade
<x-markas.kbd>Esc</x-markas.kbd>
<x-markas.kbd :keys="['Ctrl', 'K']" />
<x-markas.kbd size="sm" :keys="['G', 'N']" separator="lalu" />
```

## React

```tsx
import { Kbd } from "@/components/markas/Kbd";

<Kbd>Esc</Kbd>
<Kbd keys={["Ctrl", "K"]} />
<Kbd size="sm" keys={["G", "N"]} separator="lalu" />
```

## Vue

```vue
<template>
  <Kbd>Esc</Kbd>
  <Kbd :keys="['Ctrl', 'K']" />
  <Kbd size="sm" :keys="['G', 'N']" separator="lalu" />
</template>
```

## Catatan

- Tanpa JavaScript. Versi Blade tidak butuh Alpine.js.
- `keys` merender `<kbd><kbd>Ctrl</kbd><span>+</span><kbd>K</kbd></kbd>`. Tanpa `keys`, slot atau children mengisi satu keycap.
- Di dalam tombol yang sudah punya nama, tambahkan `aria-hidden="true"` agar shortcut tidak dibaca dua kali.
- Pemisah default "+". Ganti lewat `separator`, misalnya "lalu" untuk urutan tombol dalam Bahasa Indonesia.
