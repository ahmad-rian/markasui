## Blade

```blade
<x-markas.alert title="Update available" role="status">Version 2.1 can be installed at any time.</x-markas.alert>
<x-markas.alert variant="danger" title="Could not save">Check your internet connection and try again.</x-markas.alert>
```

## React

```tsx
import { Alert } from "@/components/markas/Alert";

<Alert title="Update available" role="status">
  Version 2.1 can be installed at any time.
</Alert>
<Alert variant="danger" title="Could not save">
  Check your internet connection and try again.
</Alert>
```

## Vue

```vue
<script setup lang="ts">
import Alert from "@/components/markas/Alert.vue";
</script>

<template>
  <Alert title="Update available" role="status">
    Version 2.1 can be installed at any time.
  </Alert>
  <Alert variant="danger" title="Could not save">
    Check your internet connection and try again.
  </Alert>
</template>
```

## Notes

- The default `role="alert"` is announced by screen readers right away. For non-urgent information, set `role="status"`.
- No JavaScript, so the Blade version does not need Alpine.js.
