## Blade

```blade
<x-markas.toggle aria-label="Bold" pressed>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" /></svg>
</x-markas.toggle>
<x-markas.toggle variant="outline">Bookmark</x-markas.toggle>
```

Needs Alpine.js.

## React

```tsx
import { Toggle } from "@/components/markas/Toggle";

<Toggle aria-label="Bold" defaultPressed onPressedChange={setBold}>
  <BoldIcon aria-hidden="true" />
</Toggle>;
<Toggle variant="outline">Bookmark</Toggle>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Toggle from "@/components/markas/Toggle.vue";

const bold = ref(true);
</script>

<template>
  <Toggle v-model="bold" aria-label="Bold">
    <BoldIcon aria-hidden="true" />
  </Toggle>
  <Toggle variant="outline">Bookmark</Toggle>
</template>
```

## Notes

- Toggle is a `<button aria-pressed>`. The look follows `data-state="on"` or `"off"`.
- Icons inside get `size-4` automatically. An icon-only toggle must have `aria-label`.
- The component has no built-in text. Translate the content and `aria-label` directly.
