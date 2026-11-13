## Blade

```blade
<x-markas.spotlight-card>
    <div class="p-6">
        <h3 class="font-semibold">Pratinjau instan</h3>
        <p class="text-sm text-muted">Setiap pull request punya tautannya sendiri.</p>
    </div>
</x-markas.spotlight-card>

<x-markas.spotlight-card color="success">...</x-markas.spotlight-card>
```

## React

```tsx
import { SpotlightCard } from "@/components/markas/SpotlightCard";

<SpotlightCard>
  <div className="p-6">
    <h3 className="font-semibold">Pratinjau instan</h3>
    <p className="text-sm text-muted">Setiap pull request punya tautannya sendiri.</p>
  </div>
</SpotlightCard>

<SpotlightCard color="success">...</SpotlightCard>
```

## Vue

```vue
<template>
  <SpotlightCard>
    <div class="p-6">
      <h3 class="font-semibold">Pratinjau instan</h3>
      <p class="text-sm text-muted">
        Setiap pull request punya tautannya sendiri.
      </p>
    </div>
  </SpotlightCard>

  <SpotlightCard color="success">...</SpotlightCard>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import SpotlightCard from "$lib/components/markas/SpotlightCard.svelte";
</script>

<SpotlightCard>
  <div class="p-6">
    <h3 class="font-semibold">Instant previews</h3>
    <p class="text-sm text-muted">Every pull request gets its own link.</p>
  </div>
</SpotlightCard>
```

## Astro

```astro
---
import SpotlightCard from "@/components/markas/SpotlightCard.astro";
---

<SpotlightCard color="success">
  <div class="p-6">
    <h3 class="font-semibold">Instant previews</h3>
    <p class="text-sm text-muted">Every pull request gets its own link.</p>
  </div>
</SpotlightCard>
```

## Angular

```ts
import { Component } from "@angular/core";
import { SpotlightCard } from "./markas/spotlight-card.component";

@Component({
  selector: "app-feature",
  imports: [SpotlightCard],
  template: `
    <div markas-spotlight-card color="success">
      <div class="p-6">
        <h3 class="font-semibold">Instant previews</h3>
        <p class="text-sm text-muted">Every pull request gets its own link.</p>
      </div>
    </div>
  `,
})
export class Feature {}
```

## Catatan

- Posisi kursor disimpan di custom property `--spot-x` dan `--spot-y`; sorotan dan border berupa gradien radial CSS.
- Fokus di dalam kartu menampilkan cahaya di tengah, jadi pengguna keyboard mendapat umpan balik yang sama. Versi Blade butuh Alpine.js.
- Class dan atribut jatuh ke elemen luar. Tambahkan padding di dalam isi kartu.
