## Blade

```blade
<x-markas.textarea name="bio" label="Short bio" hint="Up to 200 characters." />
<x-markas.textarea name="address" label="Address" :rows="2" :value="old('address')" :error="$errors->first('address')" />
```

## React

```tsx
import { Textarea } from "@/components/markas/Textarea";

<Textarea name="bio" label="Short bio" hint="Up to 200 characters." />
<Textarea name="address" label="Address" rows={2} error={errors.address} />
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Textarea from "@/components/markas/Textarea.vue";

const bio = ref("");
</script>

<template>
  <Textarea
    v-model="bio"
    name="bio"
    label="Short bio"
    hint="Up to 200 characters."
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Textarea from "$lib/components/markas/Textarea.svelte";

  let bio = $state("");
</script>

<Textarea
  bind:value={bio}
  name="bio"
  label="Short bio"
  hint="Up to 200 characters."
/>
```

## Astro

```astro
---
import Textarea from "@/components/markas/Textarea.astro";
---

<Textarea name="bio" label="Short bio" hint="Up to 200 characters." />
<Textarea name="address" label="Address" rows={2} value="12 Main Street" error="Address is incomplete." />
```

No client script. Pass the initial content through `value`, as in Blade.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Textarea } from "./markas/textarea.component";

@Component({
  selector: "app-profile",
  imports: [Textarea],
  template: `
    <markas-textarea
      [(value)]="bio"
      name="bio"
      label="Short bio"
      hint="Up to 200 characters."
    />
  `,
})
export class Profile {
  readonly bio = signal("");
}
```

## Notes

- Extra attributes (`name`, `placeholder`, `maxlength`, `class`) go to the `<textarea>` element, not its wrapper.
- In Blade, pass the initial content through the `value` prop because textarea has no value attribute.
- The component has no built-in text. Every visible string comes from your props, so translate `label`, `hint`, and `error` directly.
