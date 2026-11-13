## Blade

```blade
<x-markas.input name="email" type="email" label="Email" hint="We never share your email." />
<x-markas.input name="password" type="password" label="Password" :error="$errors->first('password')" />
```

## React

```tsx
import { Input } from "@/components/markas/Input";

<Input name="email" type="email" label="Email" hint="We never share your email." />
<Input name="password" type="password" label="Password" error={errors.password} />
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/markas/Input.vue";

const email = ref("");
</script>

<template>
  <Input
    v-model="email"
    name="email"
    type="email"
    label="Email"
    hint="We never share your email."
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Input from "$lib/components/markas/Input.svelte";

  let email = $state("");
</script>

<Input
  bind:value={email}
  name="email"
  type="email"
  label="Email"
  hint="We never share your email."
/>
```

## Astro

```astro
---
import Input from "@/components/markas/Input.astro";
---

<Input name="email" type="email" label="Email" hint="We never share your email." />
<Input name="password" type="password" label="Password" error="Password is too short." />
```

No client script: the field is a native input.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Input } from "./markas/input.component";

@Component({
  selector: "app-sign-in",
  imports: [Input],
  template: `
    <markas-input
      [(value)]="email"
      name="email"
      type="email"
      label="Email"
      hint="We never share your email."
    />
  `,
})
export class SignIn {
  readonly email = signal("");
}
```

## Notes

- Extra attributes (`name`, `placeholder`, `required`, `class`) go to the `<input>` element, not its wrapper.
- Input has no built-in text. All visible text comes from `label`, `hint`, and `error`, so pass them in your site's language.
