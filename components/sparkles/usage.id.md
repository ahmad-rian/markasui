## Blade

```blade
<x-markas.sparkles variant="field" :density="36" color="warning" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Workspace kamu sudah siap</h2>
    <x-markas.button>Buka dasbor</x-markas.button>
</x-markas.sparkles>

<x-markas.sparkles variant="text" size="sm" class="px-6 py-4">
    <h2 class="text-3xl font-semibold text-ink">Kenalan dengan Markas Pro</h2>
</x-markas.sparkles>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Sparkles } from "@/components/markas/Sparkles";

<Sparkles
  variant="burst"
  density={32}
  size="lg"
  className="rounded-xl border border-line bg-surface px-6 py-10"
>
  <h2 className="text-xl font-semibold text-ink">Buka semua template</h2>
  <Button>Upgrade sekarang</Button>
</Sparkles>;
```

## Vue

```vue
<template>
  <Sparkles
    variant="burst"
    :density="32"
    size="lg"
    class="rounded-xl border border-line bg-surface px-6 py-10"
  >
    <h2 class="text-xl font-semibold text-ink">Buka semua template</h2>
    <Button>Upgrade sekarang</Button>
  </Sparkles>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Sparkles from "$lib/components/markas/Sparkles.svelte";
</script>

<Sparkles
  variant="burst"
  density={32}
  size="lg"
  class="rounded-xl border border-line bg-surface px-6 py-10"
>
  <h2 class="text-xl font-semibold text-ink">Unlock every template</h2>
  <Button>Upgrade now</Button>
</Sparkles>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Sparkles from "@/components/markas/Sparkles.astro";
---

<Sparkles
  variant="burst"
  density={32}
  size="lg"
  class="rounded-xl border border-line bg-surface px-6 py-10"
>
  <h2 class="text-xl font-semibold text-ink">Unlock every template</h2>
  <Button>Upgrade now</Button>
</Sparkles>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Sparkles } from "./markas/sparkles.component";

@Component({
  selector: "app-upgrade",
  imports: [Button, Sparkles],
  template: `
    <div
      markas-sparkles
      variant="burst"
      density="32"
      size="lg"
      class="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <h2 class="text-xl font-semibold text-ink">Unlock every template</h2>
      <button markas-button>Upgrade now</button>
    </div>
  `,
})
export class Upgrade {}
```

Angular memakai attribute selector pada div native, jadi `class`, `aria-*`, dan atribut lain tetap di elemen akar.

## Catatan

- Posisi, ukuran, dan waktu dihitung dari `seed` dengan bilangan bulat, jadi semua framework merender kilau yang sama.
- `burst` memakai grup hover dan focus-within CSS pada komponen, jadi tanpa JavaScript dan juga berjalan untuk pengguna keyboard.
- Dengan reduced motion, kilau field dan text diam, dan kilau burst tetap tersembunyi.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
