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

## Notes

- One component renders one card and its dialog. Arrange several in your own grid or list.
- Opening measures the card, shows the native modal dialog, and animates it from the card's box to the center (FLIP). Closing plays it backwards and the card reappears in place.
- Escape, a backdrop click, and the close button all run the shrink animation. Focus returns to the card.
- The media slot renders twice, once on the card and once in the dialog. Give images `alt=""` when the title already names them.
- Attributes and `class` go to the card button.
