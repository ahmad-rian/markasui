## Blade

```blade
<x-markas.label for="full_name" required required-label="wajib">Nama lengkap</x-markas.label>
<input id="full_name" name="full_name" required />

<x-markas.label for="company" optional optional-label="Opsional">Perusahaan</x-markas.label>
<input id="company" name="company" />
```

## React

```tsx
import { Label } from "@/components/markas/Label";

<Label htmlFor="full_name" required requiredLabel="wajib">Nama lengkap</Label>
<input id="full_name" name="full_name" required />

<Label htmlFor="company" optional optionalLabel="Opsional">Perusahaan</Label>
<input id="company" name="company" />
```

## Vue

```vue
<script setup lang="ts">
import Label from "@/components/markas/Label.vue";
</script>

<template>
  <Label for="full_name" required required-label="wajib">Nama lengkap</Label>
  <input id="full_name" name="full_name" required />

  <Label for="company" optional optional-label="Opsional">Perusahaan</Label>
  <input id="company" name="company" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Label from "$lib/components/markas/Label.svelte";
</script>

<Label for="full_name" required requiredLabel="wajib">Nama lengkap</Label>
<input id="full_name" name="full_name" required />

<Label for="company" optional optionalLabel="Opsional">Perusahaan</Label>
<input id="company" name="company" />
```

## Astro

```astro
---
import Label from "@/components/markas/Label.astro";
---

<Label for="full_name" required requiredLabel="wajib">Nama lengkap</Label>
<input id="full_name" name="full_name" required />

<Label for="company" optional optionalLabel="Opsional">Perusahaan</Label>
<input id="company" name="company" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { Label } from "./markas/label.component";

@Component({
  selector: "app-profile-form",
  imports: [Label],
  template: `
    <label markas-label for="full_name" required requiredLabel="wajib"
      >Nama lengkap</label
    >
    <input id="full_name" name="full_name" required />

    <label markas-label for="company" optional optionalLabel="Opsional"
      >Perusahaan</label
    >
    <input id="company" name="company" />
  `,
})
export class ProfileForm {}
```

Di Angular, Label adalah atribut pada `<label>` native, jadi `for`, `id`, dan `class` tetap di elemen itu.

## Catatan

- Label tidak butuh JavaScript. Atribut tambahan dan `class` jatuh ke elemen `<label>`, dan class Anda ditaruh paling akhir.
- Checkbox atau radio juga bisa dibungkus langsung di dalam label tanpa `for`: `<Label class="flex items-center gap-2"><input type="checkbox" />Ingat saya</Label>`.
- Tanda bintang disembunyikan dari screen reader. Screen reader membacakan "Nama lengkap wajib" dari `requiredLabel`. Kalau `required` dan `optional` sama-sama aktif, `required` yang dipakai.
- Teks bawaan berbahasa Inggris: `requiredLabel` (default "required") dan `optionalLabel` (default "Optional"). Isi keduanya untuk situs berbahasa Indonesia.
