## Blade

```blade
<x-markas.copy-button text="pnpm dlx markasui add button" variant="ghost" size="sm" copy-label="Copy command" />
<x-markas.copy-button text="sk_live_51Hx9aT2" variant="secondary">Copy key</x-markas.copy-button>
```

## React

```tsx
import { CopyButton } from "@/components/markas/CopyButton";

<CopyButton text="pnpm dlx markasui add button" variant="ghost" size="sm" copyLabel="Copy command" />
<CopyButton text="sk_live_51Hx9aT2" variant="secondary">Copy key</CopyButton>
```

## Vue

```vue
<script setup lang="ts">
import CopyButton from "@/components/markas/CopyButton.vue";
</script>

<template>
  <CopyButton
    text="pnpm dlx markasui add button"
    variant="ghost"
    size="sm"
    copy-label="Copy command"
  />
  <CopyButton text="sk_live_51Hx9aT2" variant="secondary">Copy key</CopyButton>
</template>
```

## Notes

- Uses `navigator.clipboard.writeText`, which needs a secure context (https or localhost). If the browser blocks the clipboard, the button stays idle.
- The check mark shows for 2 seconds, then the button returns to idle.
- Without a label the button is square and named by `copyLabel`. Blade needs Alpine.js.
