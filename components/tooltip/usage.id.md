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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Tooltip from "$lib/components/markas/Tooltip.svelte";
</script>

<Tooltip content="Salin tautan ke papan klip">
  <Button variant="secondary">Salin tautan</Button>
</Tooltip>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Tooltip from "@/components/markas/Tooltip.astro";
---

<Tooltip content="Salin tautan ke papan klip">
  <Button variant="secondary">Salin tautan</Button>
</Tooltip>
```

Setiap tooltip dibungkus custom element `markas-tooltip` dengan `display: contents`, jadi tetap jalan untuk markup yang ditambahkan belakangan dan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Tooltip } from "./markas/tooltip.component";

@Component({
  selector: "app-share",
  imports: [Button, Tooltip],
  template: `
    <markas-tooltip content="Salin tautan ke papan klip">
      <button markas-button variant="secondary">Salin tautan</button>
    </markas-tooltip>
  `,
})
export class Bagikan {}
```

## Catatan

- Elemen pertama di dalam Tooltip otomatis diberi `aria-describedby` ke tooltip.
- Pakai `side="bottom"` untuk menampilkan tooltip di bawah pemicu.
- Tooltip tidak punya teks bawaan. Tulis `content` langsung dalam Bahasa Indonesia.
