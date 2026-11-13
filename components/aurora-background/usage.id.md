## Blade

```blade
<x-markas.aurora-background color="success" speed="slow" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Kenalan dengan ruang kerja yang lebih tenang</h2>
    <x-markas.button>Mulai sekarang</x-markas.button>
</x-markas.aurora-background>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { AuroraBackground } from "@/components/markas/AuroraBackground";

<AuroraBackground
  color="success"
  speed="slow"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Kenalan dengan ruang kerja yang lebih tenang
  </h2>
  <Button>Mulai sekarang</Button>
</AuroraBackground>;
```

## Vue

```vue
<template>
  <AuroraBackground
    color="success"
    speed="slow"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Kenalan dengan ruang kerja yang lebih tenang
    </h2>
    <Button>Mulai sekarang</Button>
  </AuroraBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import AuroraBackground from "$lib/components/markas/AuroraBackground.svelte";
</script>

<AuroraBackground
  color="success"
  speed="slow"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Kenalan dengan ruang kerja yang lebih tenang
  </h2>
  <Button>Mulai sekarang</Button>
</AuroraBackground>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import AuroraBackground from "@/components/markas/AuroraBackground.astro";
---

<AuroraBackground
  color="success"
  speed="slow"
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 class="text-2xl font-semibold text-ink">
    Kenalan dengan ruang kerja yang lebih tenang
  </h2>
  <Button>Mulai sekarang</Button>
</AuroraBackground>
```

Tanpa JavaScript di browser; markup dirender di server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { AuroraBackground } from "./markas/aurora-background.component";

@Component({
  selector: "app-hero",
  imports: [Button, AuroraBackground],
  template: `
    <div
      markas-aurora-background
      color="success"
      speed="slow"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <h2 class="text-2xl font-semibold text-ink">
        Kenalan dengan ruang kerja yang lebih tenang
      </h2>
      <button markas-button>Mulai sekarang</button>
    </div>
  `,
})
export class Hero {}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- Cahaya mencampur `primary` dengan token `color`, jadi ikut mode terang dan gelap.
- Keyframes ikut di dalam komponen lewat tag `<style>` kecil. Dengan reduced motion cahaya diam.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
