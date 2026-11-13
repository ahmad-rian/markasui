## Blade

```blade
<x-markas.gradient-border variant="spin" :glow="true" class="max-w-80">
    <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
        <x-markas.button>Upgrade sekarang</x-markas.button>
    </div>
</x-markas.gradient-border>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { GradientBorder } from "@/components/markas/GradientBorder";

<GradientBorder variant="spin" glow className="max-w-80">
  <div className="grid gap-3 p-6">
    <h3 className="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
    <Button>Upgrade sekarang</Button>
  </div>
</GradientBorder>;
```

## Vue

```vue
<template>
  <GradientBorder variant="spin" glow class="max-w-80">
    <div class="grid gap-3 p-6">
      <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
      <Button>Upgrade sekarang</Button>
    </div>
  </GradientBorder>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import GradientBorder from "$lib/components/markas/GradientBorder.svelte";
</script>

<GradientBorder variant="spin" glow class="max-w-80">
  <div class="grid gap-3 p-6">
    <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
    <Button>Upgrade sekarang</Button>
  </div>
</GradientBorder>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import GradientBorder from "@/components/markas/GradientBorder.astro";
---

<GradientBorder variant="spin" glow class="max-w-80">
  <div class="grid gap-3 p-6">
    <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
    <Button>Upgrade sekarang</Button>
  </div>
</GradientBorder>
```

Tanpa JavaScript di browser; markup dirender di server.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { GradientBorder } from "./markas/gradient-border.component";

@Component({
  selector: "app-hero",
  imports: [Button, GradientBorder],
  template: `
    <div markas-gradient-border variant="spin" glow class="max-w-80">
      <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
        <button markas-button>Upgrade sekarang</button>
      </div>
    </div>
  `,
})
export class Hero {}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- Border setebal 1px. Beri padding pada konten di dalam; panel dalam memakai `bg-surface`.
- Untuk tombol pil pakai `radius="full"` dengan `inline-block` pada komponen dan `rounded-full` pada tombol.
- `spin` memakai satuan container query yang didukung semua browser terkini.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
