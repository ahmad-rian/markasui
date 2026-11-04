## Blade

```blade
<x-markas.input name="email" type="email" label="Email" hint="Kami tidak membagikan email Anda." />
<x-markas.input name="password" type="password" label="Kata sandi" :error="$errors->first('password')" />
```

## React

```tsx
import { Input } from "@/components/markas/Input";

<Input name="email" type="email" label="Email" hint="Kami tidak membagikan email Anda." />
<Input name="password" type="password" label="Kata sandi" error={errors.password} />
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
    hint="Kami tidak membagikan email Anda."
  />
</template>
```

## Catatan

- Atribut tambahan (`name`, `placeholder`, `required`, `class`) diteruskan ke elemen `<input>`, bukan ke pembungkusnya.
