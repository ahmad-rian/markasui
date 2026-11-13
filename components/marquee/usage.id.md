## Blade

```blade
<x-markas.marquee :duration="25">
    @foreach ($logos as $logo)
        <img src="{{ $logo['src'] }}" alt="{{ $logo['name'] }}" class="h-8" />
    @endforeach
</x-markas.marquee>

<x-markas.marquee vertical reverse class="h-64">...</x-markas.marquee>
```

## React

```tsx
import { Marquee } from "@/components/markas/Marquee";

<Marquee duration={25}>
  {logos.map((logo) => (
    <img key={logo.name} src={logo.src} alt={logo.name} className="h-8" />
  ))}
</Marquee>

<Marquee vertical reverse className="h-64">...</Marquee>
```

## Vue

```vue
<template>
  <Marquee :duration="25">
    <img
      v-for="logo in logos"
      :key="logo.name"
      :src="logo.src"
      :alt="logo.name"
      class="h-8"
    />
  </Marquee>

  <Marquee vertical reverse class="h-64">...</Marquee>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Marquee from "$lib/components/markas/Marquee.svelte";
</script>

<Marquee duration={25}>
  {#each logos as logo (logo.name)}
    <img src={logo.src} alt={logo.name} class="h-8" />
  {/each}
</Marquee>

<Marquee vertical reverse class="h-64">...</Marquee>
```

## Astro

```astro
---
import Marquee from "@/components/markas/Marquee.astro";
---

<Marquee duration={25}>
  {logos.map((logo) => <img src={logo.src} alt={logo.name} class="h-8" />)}
</Marquee>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Marquee } from "./markas/marquee.component";

@Component({
  selector: "app-logos",
  imports: [Marquee],
  template: `
    <div markas-marquee duration="25">
      @for (logo of logos; track logo.name) {
        <img [src]="logo.src" [alt]="logo.name" class="h-8" />
      }
    </div>
  `,
})
export class Logos {
  logos = [{ name: "Laravel", src: "/laravel.svg" }];
}
```

## Catatan

- Isi item untuk satu putaran. Komponen merendernya dua kali; salinannya memakai `aria-hidden` dan `inert`.
- Setiap salinan minimal selebar marquee, jadi daftar pendek tetap berputar tanpa celah.
- Gerakan memakai Web Animations API dan berhenti saat hover, saat fokus di dalam, dan saat di luar layar. Versi Blade butuh Alpine.js.
- Di Angular, `ng-content` hanya diproyeksikan sekali, jadi salinan tersembunyi adalah klon item yang dibuat setelah render pertama. Perubahan item setelah itu tidak ikut tersalin.
- Dengan reduced motion, tidak ada yang bergerak. Jangan taruh informasi yang dibutuhkan pengguna hanya di dalam marquee.
