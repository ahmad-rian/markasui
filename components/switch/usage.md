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

## Svelte

```svelte
<script lang="ts">
  import Switch from "$lib/components/markas/Switch.svelte";

  let notifications = $state(true);
</script>

<Switch
  bind:checked={notifications}
  name="notifications"
  label="Email notifications"
/>
```

## Astro

```astro
---
import Switch from "@/components/markas/Switch.astro";
---

<Switch name="notifications" label="Email notifications" checked />
```

No client script: the switch is a native checkbox.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Switch } from "./markas/switch.component";

@Component({
  selector: "app-settings",
  imports: [Switch],
  template: `
    <markas-switch
      [(checked)]="notifications"
      name="notifications"
      label="Email notifications"
    />
  `,
})
export class Settings {
  readonly notifications = signal(true);
}
```

## Notes

- Switch is an `<input type="checkbox" role="switch">`, so its value is submitted with the form like a regular checkbox.
- The on state is announced from the native `checked`, so no `aria-checked` is needed. The look uses `checked:` and `peer-checked:`, not `data-state`.
- The component has no built-in text. Translate `label` directly.
