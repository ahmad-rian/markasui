## Blade

```blade
<x-markas.meteors variant="rain" :count="20" :angle="35" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Sejuta event per detik</h2>
    <x-markas.button>Lihat benchmark</x-markas.button>
</x-markas.meteors>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Meteors } from "@/components/markas/Meteors";

<Meteors
  variant="rain"
  count={20}
  angle={35}
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">Sejuta event per detik</h2>
  <Button>Lihat benchmark</Button>
</Meteors>;
```

## Vue

```vue
<template>
  <Meteors
    variant="rain"
    :count="20"
    :angle="35"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">Sejuta event per detik</h2>
    <Button>Lihat benchmark</Button>
  </Meteors>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Meteors from "$lib/components/markas/Meteors.svelte";
</script>

<Meteors
  variant="rain"
  count={20}
  angle={35}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
  <Button>View benchmarks</Button>
</Meteors>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Meteors from "@/components/markas/Meteors.astro";
---

<Meteors
  variant="rain"
  count={20}
  angle={35}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
  <Button>View benchmarks</Button>
</Meteors>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Meteors } from "./markas/meteors.component";

@Component({
  selector: "app-launch",
  imports: [Button, Meteors],
  template: `
    <div
      markas-meteors
      variant="rain"
      count="20"
      angle="35"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">A million events a second</h2>
      <button markas-button>View benchmarks</button>
    </div>
  `,
})
export class Launch {}
```

Angular memakai attribute selector pada div native, jadi `class`, `aria-*`, dan atribut lain tetap di elemen akar.

## Catatan

- Posisi, panjang ekor, dan waktu dihitung dari `seed` dengan bilangan bulat, jadi semua framework merender hujan meteor yang sama.
- Setiap meteor adalah satu elemen dengan ekor gradien dari `::before`, digerakkan dengan transform CSS. Tanpa JavaScript.
- Dengan reduced motion meteor berhenti di titik awalnya.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
