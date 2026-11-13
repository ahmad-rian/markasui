## Blade

```blade
<x-markas.checkbox name="terms" label="I agree to the terms of service" required />
<x-markas.checkbox name="updates" label="Send me product updates" description="At most one email per month." :checked="old('updates')" />
```

## React

```tsx
import { Checkbox } from "@/components/markas/Checkbox";

<Checkbox name="terms" label="I agree to the terms of service" required />
<Checkbox
  name="updates"
  label="Send me product updates"
  description="At most one email per month."
  defaultChecked
/>
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@/components/markas/Checkbox.vue";

const updates = ref(false);
</script>

<template>
  <Checkbox
    v-model="updates"
    name="updates"
    label="Send me product updates"
    description="At most one email per month."
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Checkbox from "$lib/components/markas/Checkbox.svelte";

  let updates = $state(false);
</script>

<Checkbox
  bind:checked={updates}
  name="updates"
  label="Send me product updates"
  description="At most one email per month."
/>
```

## Astro

```astro
---
import Checkbox from "@/components/markas/Checkbox.astro";
---

<Checkbox name="terms" label="I agree to the terms of service" required />
<Checkbox name="updates" label="Send me product updates" description="At most one email per month." checked />
```

No client script: the checkbox is a native input.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Checkbox } from "./markas/checkbox.component";

@Component({
  selector: "app-preferences",
  imports: [Checkbox],
  template: `
    <markas-checkbox
      [(checked)]="updates"
      name="updates"
      label="Send me product updates"
      description="At most one email per month."
    />
  `,
})
export class Preferences {
  readonly updates = signal(false);
}
```

## Notes

- Extra attributes (`name`, `value`, `required`, `class`) go to the `<input>` element.
- The checked look uses CSS `:checked` (the `checked:` and `peer-checked:` variants), not `data-state`, so it stays correct without JavaScript.
- The component has no built-in text. Translate `label` and `description` directly.
