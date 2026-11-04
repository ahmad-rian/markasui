## Blade

```blade
<x-markas.pagination :page="$users->currentPage()" :total="$users->lastPage()" href="?page={page}" />
```

No Alpine.js needed.

## React

```tsx
import { Pagination } from "@/components/markas/Pagination";

<Pagination page={5} total={10} href="?page={page}" />;
```

## Vue

```vue
<template>
  <Pagination :page="5" :total="10" href="?page={page}" />
</template>
```

## Notes

- The number of page buttons stays at `siblings * 2 + 5` (7 by default), for example page 5 of 10: 1 … 4 5 6 … 10.
- `pageRange(page, total, siblings)` is exported from the React and Vue versions if you want to build your own layout.
- The nav is labelled "Pagination" and the links read "Previous" and "Next". Translate them with `navLabel`, `previousLabel`, and `nextLabel` (Blade: `nav-label`, `previous-label`, `next-label`).
