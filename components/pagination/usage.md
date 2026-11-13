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

## Svelte

```svelte
<script lang="ts">
  import Pagination from "$lib/components/markas/Pagination.svelte";
</script>

<Pagination page={5} total={10} href={"?page={page}"} />
```

Wrap the pattern in `{"..."}`, because `{page}` inside a quoted Svelte attribute is an expression.

## Astro

```astro
---
import Pagination from "@/components/markas/Pagination.astro";
---

<Pagination page={5} total={10} href="?page={page}" />
```

No client script: the links are plain anchors.

## Angular

```ts
import { Component } from "@angular/core";
import { Pagination } from "./markas/pagination.component";

@Component({
  selector: "app-results",
  imports: [Pagination],
  template: `<nav
    markas-pagination
    [page]="page"
    total="10"
    [href]="href"
  ></nav>`,
})
export class Results {
  readonly page = 5;
  readonly href = "?page={page}";
}
```

Angular uses an attribute selector on the native nav, so `id`, `class`, and other attributes stay on the nav. Bind `href` from a property, because `{page}` clashes with template syntax.

## Notes

- The number of page buttons stays at `siblings * 2 + 5` (7 by default), for example page 5 of 10: 1 … 4 5 6 … 10.
- `pageRange(page, total, siblings)` is exported from the React, Vue, Svelte (module script), and Angular versions if you want to build your own layout.
- The nav is labelled "Pagination" and the links read "Previous" and "Next". Translate them with `navLabel`, `previousLabel`, and `nextLabel` (Blade: `nav-label`, `previous-label`, `next-label`).
