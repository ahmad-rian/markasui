## Blade

```blade
<div class="grid grid-cols-2 gap-3">
    @foreach ($products as $product)
        <x-markas.expandable-card :title="$product->name" :description="$product->summary">
            <x-slot:media>
                <img src="{{ $product->image }}" alt="" class="size-full object-cover" />
            </x-slot:media>
            <p class="text-base font-semibold">{{ $product->price }}</p>
            <x-slot:footer>
                <x-markas.button>Add to cart</x-markas.button>
            </x-slot:footer>
        </x-markas.expandable-card>
    @endforeach
</div>
```

Needs Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { ExpandableCard } from "@/components/markas/ExpandableCard";

<div className="grid grid-cols-2 gap-3">
  {products.map((product) => (
    <ExpandableCard
      key={product.id}
      title={product.name}
      description={product.summary}
      media={
        <img src={product.image} alt="" className="size-full object-cover" />
      }
      footer={<Button>Add to cart</Button>}
    >
      <p className="text-base font-semibold">{product.price}</p>
    </ExpandableCard>
  ))}
</div>;
```

## Vue

```vue
<template>
  <div class="grid grid-cols-2 gap-3">
    <ExpandableCard
      v-for="product in products"
      :key="product.id"
      :title="product.name"
      :description="product.summary"
    >
      <template #media>
        <img :src="product.image" alt="" class="size-full object-cover" />
      </template>
      <p class="text-base font-semibold">{{ product.price }}</p>
      <template #footer>
        <Button>Add to cart</Button>
      </template>
    </ExpandableCard>
  </div>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import ExpandableCard from "$lib/components/markas/ExpandableCard.svelte";
</script>

<div class="grid grid-cols-2 gap-3">
  {#each products as product (product.id)}
    <ExpandableCard title={product.name} description={product.summary}>
      {#snippet media()}
        <img src={product.image} alt="" class="size-full object-cover" />
      {/snippet}
      {#snippet footer()}
        <Button>Add to cart</Button>
      {/snippet}
      <p class="text-base font-semibold">{product.price}</p>
    </ExpandableCard>
  {/each}
</div>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import ExpandableCard from "@/components/markas/ExpandableCard.astro";
---

<div class="grid grid-cols-2 gap-3">
  {
    products.map((product) => (
      <ExpandableCard title={product.name} description={product.summary}>
        <img slot="media" src={product.image} alt="" class="size-full object-cover" />
        <Button slot="footer">Add to cart</Button>
        <p class="text-base font-semibold">{product.price}</p>
      </ExpandableCard>
    ))
  }
</div>
```

The media slot is rendered once and shown on both the card and the open view. A small custom element opens the dialog and plays the grow and shrink.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import {
  ExpandableCard,
  ExpandableCardMedia,
} from "./markas/expandable-card.component";

@Component({
  selector: "app-products",
  imports: [Button, ExpandableCard, ExpandableCardMedia],
  template: `
    @for (product of products; track product.id) {
      <markas-expandable-card
        [title]="product.name"
        [description]="product.summary"
      >
        <ng-template markasCardMedia>
          <img [src]="product.image" alt="" class="size-full object-cover" />
        </ng-template>
        <button markas-button footer>Add to cart</button>
        <p class="text-base font-semibold">{{ product.price }}</p>
      </markas-expandable-card>
    }
  `,
})
export class Products {
  products = [
    {
      id: 1,
      name: "Desk lamp",
      summary: "Warm light.",
      image: "/lamp.jpg",
      price: "$48",
    },
  ];
}
```

Media sits in an `ng-template markasCardMedia` because it is shown twice. An element with the `footer` attribute fills the action row.

## Notes

- One component renders one card and its dialog. Arrange several in your own grid or list.
- Opening measures the card, shows the native modal dialog, and animates it from the card's box to the center (FLIP). Closing plays it backwards and the card reappears in place.
- Escape, a backdrop click, and the close button all run the shrink animation. Focus returns to the card.
- The media slot renders twice, once on the card and once in the dialog. Give images `alt=""` when the title already names them.
- Attributes and `class` go to the card button.
