## Blade

```blade
<x-markas.wavy-background variant="ocean" color="primary" class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32">
    <h2 class="text-2xl font-semibold text-ink">Rilis tenang setiap Jumat</h2>
    <x-markas.button>Coba gratis</x-markas.button>
</x-markas.wavy-background>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { WavyBackground } from "@/components/markas/WavyBackground";

<WavyBackground
  variant="ocean"
  color="primary"
  className="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
>
  <h2 className="text-2xl font-semibold text-ink">Rilis tenang setiap Jumat</h2>
  <Button>Coba gratis</Button>
</WavyBackground>;
```

## Vue

```vue
<template>
  <WavyBackground
    variant="ocean"
    color="primary"
    class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
  >
    <h2 class="text-2xl font-semibold text-ink">Rilis tenang setiap Jumat</h2>
    <Button>Coba gratis</Button>
  </WavyBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import WavyBackground from "$lib/components/markas/WavyBackground.svelte";
</script>

<WavyBackground
  variant="ocean"
  color="primary"
  class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
>
  <h2 class="text-2xl font-semibold text-ink">Calm releases, every Friday</h2>
  <Button>Start free trial</Button>
</WavyBackground>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import WavyBackground from "@/components/markas/WavyBackground.astro";
---

<WavyBackground
  variant="ocean"
  color="primary"
  class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
>
  <h2 class="text-2xl font-semibold text-ink">
    Calm releases, every Friday
  </h2>
  <Button>Start free trial</Button>
</WavyBackground>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { WavyBackground } from "./markas/wavy-background.component";

@Component({
  selector: "app-release",
  imports: [Button, WavyBackground],
  template: `
    <div
      markas-wavy-background
      variant="ocean"
      color="primary"
      class="rounded-xl border border-line bg-surface px-6 pt-12 pb-32"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Calm releases, every Friday
      </h2>
      <button markas-button>Start free trial</button>
    </div>
  `,
})
export class Release {}
```

Angular memakai attribute selector pada div native, jadi `class`, `aria-*`, dan atribut lain tetap di elemen akar.

## Catatan

- Gelombang adalah path SVG biasa yang bergeser ke samping dengan satu keyframe CSS. Tanpa JavaScript, canvas, atau backdrop-filter.
- Blur ringan berupa filter CSS hanya pada lapisan gelombang, jadi konten di atasnya tetap tajam.
- Dengan reduced motion gelombang berhenti di posisi yang sama di semua framework.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
