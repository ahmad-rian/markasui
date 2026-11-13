## Blade

```blade
<x-markas.shooting-stars variant="night" frequency="normal" trail-color="primary" class="dark rounded-xl bg-canvas px-6 py-14">
    <h2 class="text-2xl font-semibold text-ink">Buat permintaan, lalu rilis</h2>
    <x-markas.button>Gabung waitlist</x-markas.button>
</x-markas.shooting-stars>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { ShootingStars } from "@/components/markas/ShootingStars";

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  className="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 className="text-2xl font-semibold text-ink">
    Buat permintaan, lalu rilis
  </h2>
  <Button>Gabung waitlist</Button>
</ShootingStars>;
```

## Vue

```vue
<template>
  <ShootingStars
    variant="night"
    frequency="normal"
    trail-color="primary"
    class="dark rounded-xl bg-canvas px-6 py-14"
  >
    <h2 class="text-2xl font-semibold text-ink">Buat permintaan, lalu rilis</h2>
    <Button>Gabung waitlist</Button>
  </ShootingStars>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import ShootingStars from "$lib/components/markas/ShootingStars.svelte";
</script>

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  class="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
  <Button>Join the waitlist</Button>
</ShootingStars>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import ShootingStars from "@/components/markas/ShootingStars.astro";
---

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  class="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
  <Button>Join the waitlist</Button>
</ShootingStars>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { ShootingStars } from "./markas/shooting-stars.component";

@Component({
  selector: "app-waitlist",
  imports: [Button, ShootingStars],
  template: `
    <div
      markas-shooting-stars
      variant="night"
      frequency="normal"
      trailColor="primary"
      class="dark rounded-xl bg-canvas px-6 py-14"
    >
      <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
      <button markas-button>Join the waitlist</button>
    </div>
  `,
})
export class Waitlist {}
```

Angular memakai attribute selector pada div native, jadi `class`, `aria-*`, dan atribut lain tetap di elemen akar.

## Catatan

- Tiga bintang jatuh berbagi satu putaran CSS, jadi satu melintas setiap sepertiga putaran. Di sisa putaran mereka tidak terlihat.
- Posisi bintang dan lintasan dihitung dari `seed` dengan bilangan bulat, jadi semua framework merender langit yang sama.
- Komponen ini terpisah dari Stars Background dengan keyframe sendiri, jadi keduanya bisa ada di halaman yang sama.
- Dengan reduced motion bintang berhenti berkelip dan lintasan diam.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
