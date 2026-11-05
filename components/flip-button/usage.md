## Blade

```blade
<x-markas.flip-button back-label="It takes 2 minutes">Create account</x-markas.flip-button>

<x-markas.flip-button size="lg">
    Download report
    <x-slot:back>PDF, 2.4 MB</x-slot:back>
</x-markas.flip-button>
```

## React

```tsx
import { FlipButton } from "@/components/markas/FlipButton";

<FlipButton backLabel="It takes 2 minutes">Create account</FlipButton>
<FlipButton size="lg" backLabel={<>PDF, 2.4 MB</>}>Download report</FlipButton>
```

## Vue

```vue
<script setup lang="ts">
import FlipButton from "@/components/markas/FlipButton.vue";
</script>

<template>
  <FlipButton back-label="It takes 2 minutes">Create account</FlipButton>
  <FlipButton size="lg">
    Download report
    <template #back>PDF, 2.4 MB</template>
  </FlipButton>
</template>
```

## Notes

- Pure CSS: no JavaScript and no Alpine.js. The flip runs on hover and on keyboard focus.
- The back face is aria-hidden. Screen readers only read the front label.
- Touch devices have no hover, so never put required information only on the back.
