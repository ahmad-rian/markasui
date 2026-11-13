## Blade

```blade
<x-markas.textarea name="bio" label="Bio singkat" hint="Maksimal 200 karakter." />
<x-markas.textarea name="alamat" label="Alamat" :rows="2" :value="old('alamat')" :error="$errors->first('alamat')" />
```

## React

```tsx
import { Textarea } from "@/components/markas/Textarea";

<Textarea name="bio" label="Bio singkat" hint="Maksimal 200 karakter." />
<Textarea name="alamat" label="Alamat" rows={2} error={errors.alamat} />
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
    label="Bio singkat"
    hint="Maksimal 200 karakter."
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
  label="Bio singkat"
  hint="Maksimal 200 karakter."
/>
```

## Astro

```astro
---
import Textarea from "@/components/markas/Textarea.astro";
---

<Textarea name="bio" label="Bio singkat" hint="Maksimal 200 karakter." />
<Textarea name="address" label="Alamat" rows={2} value="Jl. Merdeka 12" error="Alamat belum lengkap." />
```

Tanpa script klien. Isi awal dikirim lewat `value`, sama seperti Blade.

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
      label="Bio singkat"
      hint="Maksimal 200 karakter."
    />
  `,
})
export class Profile {
  readonly bio = signal("");
}
```

## Catatan

- Atribut tambahan (`name`, `placeholder`, `maxlength`, `class`) diteruskan ke elemen `<textarea>`, bukan ke pembungkusnya.
- Di Blade, isi awal diberikan lewat prop `value` karena textarea tidak punya atribut value.
- Komponen ini tidak punya teks bawaan. Semua teks berasal dari prop, jadi cukup isi `label`, `hint`, dan `error` dalam Bahasa Indonesia.
