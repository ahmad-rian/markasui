## Blade

```blade
<x-markas.collapsible title="Tampilkan detail pesanan">
    Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
</x-markas.collapsible>
```

Tidak butuh Alpine.js. Pakai slot `title` untuk isi kaya: `<x-slot:title>Tampilkan <strong>3</strong> lagi</x-slot:title>`.

## React

```tsx
import { Collapsible } from "@/components/markas/Collapsible";

<Collapsible title="Tampilkan detail pesanan" open>
  Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
</Collapsible>;
```

## Vue

```vue
<template>
  <Collapsible title="Tampilkan detail pesanan">
    Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
  </Collapsible>
</template>
```

## Catatan

- Dibangun di atas `details` dan `summary`, jadi berfungsi tanpa JavaScript dan browser yang menangani keyboard serta status pembaca layar.
- `open` hanya mengatur keadaan awal. Dengarkan event native `toggle` untuk menanggapi perubahan.
- Untuk beberapa bagian terkait yang hanya boleh terbuka satu, pakai Accordion.
