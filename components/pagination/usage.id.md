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

## Svelte

```svelte
<script lang="ts">
  import Pagination from "$lib/components/markas/Pagination.svelte";
</script>

<Pagination
  page={5}
  total={10}
  href={"?page={page}"}
  navLabel="Navigasi halaman"
  previousLabel="Sebelumnya"
  nextLabel="Berikutnya"
/>
```

Tulis pola di dalam `{"..."}`, karena `{page}` di atribut Svelte yang dikutip dianggap ekspresi.

## Astro

```astro
---
import Pagination from "@/components/markas/Pagination.astro";
---

<Pagination
  page={5}
  total={10}
  href="?page={page}"
  navLabel="Navigasi halaman"
  previousLabel="Sebelumnya"
  nextLabel="Berikutnya"
/>
```

Tanpa script klien: semua link berupa anchor biasa.

## Angular

```ts
import { Component } from "@angular/core";
import { Pagination } from "./markas/pagination.component";

@Component({
  selector: "app-hasil",
  imports: [Pagination],
  template: `
    <nav
      markas-pagination
      [page]="page"
      total="10"
      [href]="href"
      navLabel="Navigasi halaman"
      previousLabel="Sebelumnya"
      nextLabel="Berikutnya"
    ></nav>
  `,
})
export class Hasil {
  readonly page = 5;
  readonly href = "?page={page}";
}
```

Angular memakai attribute selector pada nav native, jadi `id`, `class`, dan atribut lain tetap di nav. Isi `href` lewat properti karena `{page}` bentrok dengan sintaks template.

## Catatan

- Jumlah tombol angka tetap `siblings * 2 + 5` (7 untuk default), contoh halaman 5 dari 10: 1 … 4 5 6 … 10.
- Fungsi `pageRange(page, total, siblings)` diekspor dari versi React, Vue, Svelte (module script), dan Angular bila ingin membuat tampilan sendiri.
- Teks bawaan dalam bahasa Inggris ("Pagination", "Previous", "Next"). Isi `navLabel`, `previousLabel`, dan `nextLabel` (Blade: `nav-label`, `previous-label`, `next-label`) untuk situs berbahasa Indonesia.
