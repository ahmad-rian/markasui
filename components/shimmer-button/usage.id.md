## Blade

```blade
<x-markas.shimmer-button size="lg">Mulai gratis</x-markas.shimmer-button>
<x-markas.shimmer-button variant="secondary" :duration="3200">Jadwalkan demo</x-markas.shimmer-button>
```

## React

```tsx
import { ShimmerButton } from "@/components/markas/ShimmerButton";

<ShimmerButton size="lg">Mulai gratis</ShimmerButton>
<ShimmerButton variant="secondary" duration={3200}>Jadwalkan demo</ShimmerButton>
```

## Vue

```vue
<script setup lang="ts">
import ShimmerButton from "@/components/markas/ShimmerButton.vue";
</script>

<template>
  <ShimmerButton size="lg">Mulai gratis</ShimmerButton>
  <ShimmerButton variant="secondary" :duration="3200"
    >Jadwalkan demo</ShimmerButton
  >
</template>
```

## Catatan

- Kilau berjalan dengan Web Animations API, jadi tidak perlu CSS atau keyframes tambahan.
- IntersectionObserver menjeda animasi saat tombol di luar layar. Dengan reduced motion animasi tidak pernah mulai.
- Blade butuh Alpine.js.
