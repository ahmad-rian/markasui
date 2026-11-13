## Blade

```blade
<x-markas.lamp-effect color="primary" class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
    <h2 class="text-3xl font-semibold text-ink">Berkarya di bawah cahaya</h2>
    <x-markas.button>Mulai gratis</x-markas.button>
</x-markas.lamp-effect>
```

Butuh Alpine.js untuk memulai animasi masuk saat section masuk layar.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { LampEffect } from "@/components/markas/LampEffect";

<LampEffect className="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
  <h2 className="text-3xl font-semibold text-ink">Berkarya di bawah cahaya</h2>
  <Button>Mulai gratis</Button>
</LampEffect>;
```

## Vue

```vue
<template>
  <LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
    <h2 class="text-3xl font-semibold text-ink">Berkarya di bawah cahaya</h2>
    <Button>Mulai gratis</Button>
  </LampEffect>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import LampEffect from "$lib/components/markas/LampEffect.svelte";
</script>

<LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
  <h2 class="text-3xl font-semibold text-ink">Berkarya di bawah cahaya</h2>
  <Button>Mulai gratis</Button>
</LampEffect>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import LampEffect from "@/components/markas/LampEffect.astro";
---

<LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
  <h2 class="text-3xl font-semibold text-ink">Berkarya di bawah cahaya</h2>
  <Button>Mulai gratis</Button>
</LampEffect>
```

Script kecil yang dibundel menjalankan efek per instance. Tetap jalan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { LampEffect } from "./markas/lamp-effect.component";

@Component({
  selector: "app-hero",
  imports: [Button, LampEffect],
  template: `
    <div
      markas-lamp-effect
      class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink"
    >
      <h2 class="text-3xl font-semibold text-ink">Berkarya di bawah cahaya</h2>
      <button markas-button>Mulai gratis</button>
    </div>
  `,
})
export class Hero {}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- Cahaya dibuat dari gradien conic dan radial CSS dengan token `color`. Tanpa canvas dan tanpa filter blur.
- Garis lampu berada 3rem dari atas. Sisakan ruang di atas konten lewat padding atas.
- `variant="stage"` menyorotkan dua lampu dari sudut atas, `variant="halo"` menggambar cincin bercahaya dari tepi atas.
- Animasi masuk diputar sekali saat section pertama kali masuk layar. Dengan reduced motion cahaya langsung tampil penuh.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
