## Blade

```blade
<x-markas.switch name="notifications" label="Email notifications" :checked="$user->wants_email" />
```

No Alpine.js needed.

## React

```tsx
import { Switch } from "@/components/markas/Switch";

<Switch
  name="notifications"
  label="Email notifications"
  defaultChecked
  onCheckedChange={(checked) => console.log(checked)}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Switch from "@/components/markas/Switch.vue";

const notifications = ref(true);
</script>

<template>
  <Switch
    v-model="notifications"
    name="notifications"
    label="Email notifications"
  />
</template>
```

## Notes

- Switch is an `<input type="checkbox" role="switch">`, so its value is submitted with the form like a regular checkbox.
- The on state is announced from the native `checked`, so no `aria-checked` is needed. The look uses `checked:` and `peer-checked:`, not `data-state`.
- The component has no built-in text. Translate `label` directly.
