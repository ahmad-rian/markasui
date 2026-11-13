## Blade

```blade
<h2 class="text-3xl font-semibold">Layanan kami</h2>
<x-markas.elastic-line variant="pluck" color="primary" :stroke-width="3" :reach="16" play-on-view decorative class="w-40" />

<x-markas.elastic-line variant="push" :reach="32" />
```

Butuh Alpine.js.

## React

```tsx
import { ElasticLine } from "@/components/markas/ElasticLine";

<h2 className="text-3xl font-semibold">Layanan kami</h2>
<ElasticLine
  variant="pluck"
  color="primary"
  strokeWidth={3}
  reach={16}
  playOnView
  decorative
  className="w-40"
/>

<ElasticLine variant="push" reach={32} />
```

## Vue

```vue
<template>
  <h2 class="text-3xl font-semibold">Layanan kami</h2>
  <ElasticLine
    variant="pluck"
    color="primary"
    :stroke-width="3"
    :reach="16"
    play-on-view
    decorative
    class="w-40"
  />

  <ElasticLine variant="push" :reach="32" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ElasticLine from "$lib/components/markas/ElasticLine.svelte";
</script>

<h2 class="text-3xl font-semibold">Our services</h2>
<ElasticLine
  variant="pluck"
  color="primary"
  strokeWidth={3}
  reach={16}
  playOnView
  decorative
  class="w-40"
/>
```

## Astro

```astro
---
import ElasticLine from "@/components/markas/ElasticLine.astro";
---

<h2 class="text-3xl font-semibold">Our services</h2>
<ElasticLine
  variant="pluck"
  color="primary"
  strokeWidth={3}
  reach={16}
  playOnView
  decorative
  class="w-40"
/>
```

Setiap garis adalah custom element kecil yang menjalankan pegasnya sendiri, juga setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { ElasticLine } from "./markas/elastic-line.component";

@Component({
  selector: "app-services-heading",
  imports: [ElasticLine],
  template: `
    <h2 class="text-3xl font-semibold">Our services</h2>
    <markas-elastic-line
      variant="pluck"
      color="primary"
      [strokeWidth]="3"
      [reach]="16"
      playOnView
      decorative
      class="w-40"
    />
  `,
})
export class ServicesHeading {}
```

## Catatan

- Tinggi komponen `reach` x 2 (atau lebarnya bila vertikal) dan garis berada di tengahnya. Kursor hanya melengkungkan garis di dalam pita itu.
- `pull` melengkung ke arah kursor, `push` menjauhinya, dan `pluck` mengikuti kursor setelah disentuh sampai lepas lalu bergetar.
- Lengkungan adalah satu path SVG kuadratik. requestAnimationFrame hanya berjalan selama kursor dekat atau garis masih bergerak. `playOnView` membuatnya bergetar sekali saat pertama kali masuk layar.
- Secara bawaan garis adalah `separator`. Pakai `decorative` untuk garis bawah. Dengan reduced motion garis tetap lurus. Atribut dan `class` jatuh ke pembungkus.
