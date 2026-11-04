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

## Notes

- Extra attributes (`name`, `placeholder`, `required`, `class`) go to the `<input>` element, not its wrapper.
- Input has no built-in text. All visible text comes from `label`, `hint`, and `error`, so pass them in your site's language.
