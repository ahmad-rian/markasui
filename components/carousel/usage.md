## Blade

```blade
<x-markas.carousel label="Product tour" show-dots>
    <x-slot:plan>
        <div class="h-40 rounded-xl bg-subtle p-5">Plan your week</div>
    </x-slot:plan>
    <x-slot:share>
        <div class="h-40 rounded-xl bg-subtle p-5">Share with your team</div>
    </x-slot:share>
    <x-slot:track>
        <div class="h-40 rounded-xl bg-subtle p-5">Track progress</div>
    </x-slot:track>
</x-markas.carousel>
```

Needs Alpine.js. Every named slot becomes a slide, in the order you write them. For a list, use `<x-slot :name="'slide-'.$index">` inside `@foreach`.

## React

```tsx
import { Carousel } from "@/components/markas/Carousel";

<Carousel label="Product tour" showDots>
  <div className="h-40 rounded-xl bg-subtle p-5">Plan your week</div>
  <div className="h-40 rounded-xl bg-subtle p-5">Share with your team</div>
  <div className="h-40 rounded-xl bg-subtle p-5">Track progress</div>
</Carousel>;
```

## Vue

```vue
<template>
  <Carousel label="Product tour" show-dots>
    <div class="h-40 rounded-xl bg-subtle p-5">Plan your week</div>
    <div class="h-40 rounded-xl bg-subtle p-5">Share with your team</div>
    <div class="h-40 rounded-xl bg-subtle p-5">Track progress</div>
  </Carousel>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Carousel from "$lib/components/markas/Carousel.svelte";

  const slides = ["Plan your week", "Share with your team", "Track progress"];
</script>

<Carousel label="Product tour" showDots items={slides}>
  {#snippet slide(title, index)}
    <div class="h-40 rounded-xl bg-subtle p-5">{index + 1}. {title}</div>
  {/snippet}
</Carousel>
```

Svelte, Astro, and Angular take the slides as `items` and render each one with a snippet, a function child, or an `ng-template`. Svelte reads `{index}` in a plain attribute as an expression, so pass label templates in braces: `slideLabel={"Slide {index} of {total}"}`.

## Astro

```astro
---
import Carousel from "@/components/markas/Carousel.astro";

const slides = ["Plan your week", "Share with your team", "Track progress"];
---

<Carousel label="Product tour" showDots items={slides}>
  {
    (title: string, index: number) => (
      <div class="h-40 rounded-xl bg-subtle p-5">{index + 1}. {title}</div>
    )
  }
</Carousel>
```

Each carousel is a small custom element, so it keeps working after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { Carousel } from "./markas/carousel.component";

@Component({
  selector: "app-example",
  imports: [Carousel],
  template: `
    <markas-carousel label="Product tour" showDots [items]="slides">
      <ng-template let-title let-index="index">
        <div class="h-40 rounded-xl bg-subtle p-5">
          {{ index + 1 }}. {{ title }}
        </div>
      </ng-template>
    </markas-carousel>
  `,
})
export class Example {
  slides = ["Plan your week", "Share with your team", "Track progress"];
}
```

## Notes

- Slides scroll with CSS scroll snap, so touch swipe and trackpad scrolling work without extra code.
- Use `perView` 2 or 3 to show several cards at once. The buttons still move one slide per press.
- `slideLabel` and `dotLabel` accept `{index}` and `{total}` placeholders.
- There is no autoplay on purpose.
