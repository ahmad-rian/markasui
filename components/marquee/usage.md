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

## Notes

- Pass the items of one loop. The component renders them twice; the copy is `aria-hidden` and `inert`.
- Each copy is at least as wide as the marquee, so short lists still loop without a gap.
- Motion uses the Web Animations API and pauses on hover, on focus inside, and off screen. The Blade version needs Alpine.js.
- In Angular, `ng-content` projects once, so the hidden copy is a clone of the items made after the first render. Changes to the items after that are not copied.
- With reduced motion, nothing moves. Do not put information users need only inside a marquee.
