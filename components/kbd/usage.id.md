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

## Svelte

```svelte
<script lang="ts">
  import Kbd from "$lib/components/markas/Kbd.svelte";
</script>

<Kbd>Esc</Kbd>
<Kbd keys={["Ctrl", "K"]} />
<Kbd size="sm" keys={["G", "N"]} separator="then" />
```

## Astro

```astro
---
import Kbd from "@/components/markas/Kbd.astro";
---

<Kbd>Esc</Kbd>
<Kbd keys={["Ctrl", "K"]} />
<Kbd size="sm" keys={["G", "N"]} separator="then" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { Kbd } from "./markas/kbd.component";

@Component({
  selector: "app-example",
  imports: [Kbd],
  template: `
    <kbd markas-kbd>Esc</kbd>
    <kbd markas-kbd [keys]="['Ctrl', 'K']"></kbd>
    <kbd markas-kbd size="sm" [keys]="['G', 'N']" separator="then"></kbd>
  `,
})
export class Example {}
```

Angular memakai attribute selector pada `kbd` native, jadi `class` dan `aria-hidden` tetap di elemen itu.

## Catatan

- Tanpa JavaScript. Versi Blade tidak butuh Alpine.js.
- `keys` merender `<kbd><kbd>Ctrl</kbd><span>+</span><kbd>K</kbd></kbd>`. Tanpa `keys`, slot atau children mengisi satu keycap.
- Di dalam tombol yang sudah punya nama, tambahkan `aria-hidden="true"` agar shortcut tidak dibaca dua kali.
- Pemisah default "+". Ganti lewat `separator`, misalnya "lalu" untuk urutan tombol dalam Bahasa Indonesia.
