## Blade

```blade
<x-markas.badge>Draft</x-markas.badge>
<x-markas.badge variant="success">Active</x-markas.badge>
<x-markas.badge variant="danger">Failed</x-markas.badge>
```

## React

```tsx
import { Badge } from "@/components/markas/Badge";

<Badge>Draft</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Failed</Badge>
```

## Vue

```vue
<script setup lang="ts">
import Badge from "@/components/markas/Badge.vue";
</script>

<template>
  <Badge>Draft</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="danger">Failed</Badge>
</template>
```

## Notes

- Success, warning, and danger text uses `ink`. The status color comes from the background, border, and dot, because light `success` and `warning` lack enough contrast for small text.
