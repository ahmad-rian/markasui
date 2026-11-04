## Blade

```blade
<x-markas.button>Save</x-markas.button>
<x-markas.button variant="secondary" size="sm">Cancel</x-markas.button>
<x-markas.button variant="danger" type="submit">Delete account</x-markas.button>
```

## React

```tsx
import { Button } from "@/components/markas/Button";

<Button>Save</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="danger" type="submit">Delete account</Button>
```

## Vue

```vue
<script setup lang="ts">
import Button from "@/components/markas/Button.vue";
</script>

<template>
  <Button>Save</Button>
  <Button variant="secondary" size="sm">Cancel</Button>
  <Button variant="danger" type="submit">Delete account</Button>
</template>
```

## Notes

- `type` defaults to `button`. Set `type="submit"` for a form submit button.
- Extra classes are appended last. There is no `tailwind-merge`, so conflicting classes (two background colors, for example) depend on Tailwind's CSS order. Prefer the `variant` and `size` props.
