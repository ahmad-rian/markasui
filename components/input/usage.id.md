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
  hint="Email kamu tidak akan dibagikan."
/>
```

## Astro

```astro
---
import Input from "@/components/markas/Input.astro";
---

<Input name="email" type="email" label="Email" hint="Email kamu tidak akan dibagikan." />
<Input name="password" type="password" label="Kata sandi" error="Kata sandi terlalu pendek." />
```

Tanpa script klien: kolomnya input native.

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
      hint="Email kamu tidak akan dibagikan."
    />
  `,
})
export class SignIn {
  readonly email = signal("");
}
```

## Catatan

- Atribut tambahan (`name`, `placeholder`, `required`, `class`) diteruskan ke elemen `<input>`, bukan ke pembungkusnya.
- Input tidak punya teks bawaan. Semua teks berasal dari `label`, `hint`, dan `error`, jadi isi langsung dalam Bahasa Indonesia.
