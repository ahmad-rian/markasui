## Blade

```blade
<x-markas.pagination
    :page="$users->currentPage()"
    :total="$users->lastPage()"
    href="?page={page}"
    nav-label="Navigasi halaman"
    previous-label="Sebelumnya"
    next-label="Berikutnya"
/>
```

Tidak butuh Alpine.js.

## React

```tsx
import { Pagination } from "@/components/markas/Pagination";

<Pagination
  page={5}
  total={10}
  href="?page={page}"
  navLabel="Navigasi halaman"
  previousLabel="Sebelumnya"
  nextLabel="Berikutnya"
/>;
```

## Vue

```vue
<template>
  <Pagination
    :page="5"
    :total="10"
    href="?page={page}"
    nav-label="Navigasi halaman"
    previous-label="Sebelumnya"
    next-label="Berikutnya"
  />
</template>
```

## Catatan

- Jumlah tombol angka tetap `siblings * 2 + 5` (7 untuk default), contoh halaman 5 dari 10: 1 … 4 5 6 … 10.
- Fungsi `pageRange(page, total, siblings)` diekspor dari versi React dan Vue bila ingin membuat tampilan sendiri.
- Teks bawaan dalam bahasa Inggris ("Pagination", "Previous", "Next"). Isi `navLabel`, `previousLabel`, dan `nextLabel` (Blade: `nav-label`, `previous-label`, `next-label`) untuk situs berbahasa Indonesia.
