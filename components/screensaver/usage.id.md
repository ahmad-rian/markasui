## Blade

```blade
<x-markas.screensaver class="h-44 rounded-lg bg-subtle" aria-hidden="true">
    <span class="flex items-center gap-2 text-3xl font-bold">
        <svg class="size-8" aria-hidden="true">...</svg>404
    </span>
</x-markas.screensaver>
```

Butuh Alpine.js.

## React

```tsx
import { Screensaver } from "@/components/markas/Screensaver";

<Screensaver
  effect="squash"
  speed={50}
  className="h-32 w-36 rounded-lg bg-subtle"
  aria-hidden="true"
>
  <span className="grid size-12 place-items-center rounded-xl bg-surface">
    ...
  </span>
</Screensaver>;
```

## Vue

```vue
<template>
  <Screensaver
    :speed="60"
    :tones="['success', 'warning']"
    class="h-52 rounded-lg bg-canvas"
  >
    <span class="flex items-center gap-2 rounded-full bg-surface px-3 py-1">
      <span class="size-2.5 rounded-full bg-current"></span>
      <span class="text-ink">Rania Putri</span>
    </span>
  </Screensaver>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Screensaver from "$lib/components/markas/Screensaver.svelte";
</script>

<Screensaver class="h-56 rounded-xl border border-line" aria-hidden="true">
  <span class="text-3xl font-bold">Markas</span>
</Screensaver>
```

## Astro

```astro
---
import Screensaver from "@/components/markas/Screensaver.astro";
---

<Screensaver class="h-56 rounded-xl border border-line" aria-hidden="true">
  <span class="text-3xl font-bold">Markas</span>
</Screensaver>
```

Satu script kecil yang dibundel menjalankan setiap area lewat elemen `markas-screensaver`.

## Angular

```ts
import { Component } from "@angular/core";
import { Screensaver } from "./markas/screensaver.component";

@Component({
  selector: "app-idle",
  imports: [Screensaver],
  template: `
    <markas-screensaver
      effect="squash"
      class="h-56 rounded-xl border border-line"
      aria-hidden="true"
    >
      <span class="text-3xl font-bold">Markas</span>
    </markas-screensaver>
  `,
})
export class Idle {}
```

## Catatan

- Setiap anak langsung mulai di posisi seed dan memantul di dinding dengan kecepatan `speed` px per detik. Beri area tinggi.
- `effect="tone"` memindahkan setiap elemen ke token berikutnya di `tones` pada setiap benturan; warnai bagian yang ikut berubah dengan `currentColor` (misalnya `bg-current` atau stroke SVG). `effect="squash"` membuatnya memipih dan memanjang, `"none"` hanya memantul.
- Gerakan berhenti saat area di luar layar, tab tersembunyi, ada yang difokus di dalamnya, atau (dengan `pauseOnHover`) kursor berada di atasnya.
- Dengan reduced motion setiap elemen diam di posisi seed dengan tone pertamanya.
