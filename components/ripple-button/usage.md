## Blade

```blade
<x-markas.ripple-button>Add to cart</x-markas.ripple-button>
<x-markas.ripple-button variant="secondary" type="submit">Subscribe</x-markas.ripple-button>
```

## React

```tsx
import { RippleButton } from "@/components/markas/RippleButton";

<RippleButton onClick={addToCart}>Add to cart</RippleButton>
<RippleButton variant="secondary" type="submit">Subscribe</RippleButton>
```

## Vue

```vue
<script setup lang="ts">
import RippleButton from "@/components/markas/RippleButton.vue";
</script>

<template>
  <RippleButton @click="addToCart">Add to cart</RippleButton>
  <RippleButton variant="secondary" type="submit">Subscribe</RippleButton>
</template>
```

## Notes

- A mouse or touch click starts the ripple at the pointer. Enter and Space start it from the center.
- The ripple uses the text color at low opacity, so every variant gets a matching wave.
- Blade needs Alpine.js.
