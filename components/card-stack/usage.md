## Blade

```blade
<x-markas.card-stack label="Customer testimonials">
    <x-slot:maya>
        <figure class="grid gap-6 p-5">
            <blockquote>Onboarding a new hire now takes an afternoon.</blockquote>
            <figcaption class="text-sm text-muted">Maya Putri, Kopiloka</figcaption>
        </figure>
    </x-slot:maya>
    <x-slot:daniel>
        <figure class="grid gap-6 p-5">
            <blockquote>The keyboard shortcuts alone save us hours.</blockquote>
            <figcaption class="text-sm text-muted">Daniel Reyes, Northwind</figcaption>
        </figure>
    </x-slot:daniel>
</x-markas.card-stack>
```

Needs Alpine.js. Every named slot becomes a card, in the order you write them. For a list, use `<x-slot :name="'card-'.$index">` inside `@foreach`.

## React

```tsx
import { CardStack } from "@/components/markas/CardStack";

<CardStack label="Customer testimonials">
  {testimonials.map((item) => (
    <figure key={item.name} className="grid gap-6 p-5">
      <blockquote>{item.quote}</blockquote>
      <figcaption className="text-sm text-muted">{item.name}</figcaption>
    </figure>
  ))}
</CardStack>;
```

## Vue

```vue
<template>
  <CardStack label="Customer testimonials">
    <figure
      v-for="item in testimonials"
      :key="item.name"
      class="grid gap-6 p-5"
    >
      <blockquote>{{ item.quote }}</blockquote>
      <figcaption class="text-sm text-muted">{{ item.name }}</figcaption>
    </figure>
  </CardStack>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import CardStack from "$lib/components/markas/CardStack.svelte";
</script>

<CardStack label="Customer testimonials" items={testimonials}>
  {#snippet card(item)}
    <figure class="grid gap-6 p-5">
      <blockquote>{item.quote}</blockquote>
      <figcaption class="text-sm text-muted">{item.name}</figcaption>
    </figure>
  {/snippet}
</CardStack>
```

Svelte, Astro, and Angular take the cards as `items` and draw each one with a snippet, a function child, or an `ng-template`. Svelte reads `{index}` in a plain attribute as an expression, so pass label templates in braces: `cardLabel={"Tip {index} of {total}"}`.

## Astro

```astro
---
import CardStack from "@/components/markas/CardStack.astro";
---

<CardStack label="Customer testimonials" items={testimonials}>
  {
    (item: Testimonial) => (
      <figure class="grid gap-6 p-5">
        <blockquote>{item.quote}</blockquote>
        <figcaption class="text-sm text-muted">{item.name}</figcaption>
      </figure>
    )
  }
</CardStack>
```

Each stack is a small custom element, so it keeps working after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { CardStack } from "./markas/card-stack.component";

@Component({
  selector: "app-testimonials",
  imports: [CardStack],
  template: `
    <markas-card-stack label="Customer testimonials" [items]="testimonials">
      <ng-template let-item let-index="index">
        <figure class="grid gap-6 p-5">
          <blockquote>{{ item.quote }}</blockquote>
          <figcaption class="text-sm text-muted">{{ item.name }}</figcaption>
        </figure>
      </ng-template>
    </markas-card-stack>
  `,
})
export class Testimonials {
  testimonials = [{ quote: "Setup took ten minutes.", name: "Sari Wijaya" }];
}
```

Bind `cardLabel` with a property when it holds `{index}`: `[cardLabel]="tipLabel"`.

## Notes

- The stack provides the card surface (border, background, radius). Add only padding and content inside each card.
- Next, the Right arrow key, or dragging the top card past a quarter of the width throws it away; it settles at the back. Previous brings the last card back from the left. The stack loops.
- A short drag springs back. Presses that move less than 4px stay clicks, so links inside the top card keep working.
- `cardLabel` accepts `{index}` and `{total}`, for example `Tip {index} of {total}`.
- With reduced motion the cards swap instantly.
