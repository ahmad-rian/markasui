## Blade

```blade
<x-markas.switch name="notifikasi" label="Notifikasi email" :checked="$user->wants_email" />
```

Tidak butuh Alpine.js.

## React

```tsx
import { Switch } from "@/components/markas/Switch";

<Switch
  name="notifikasi"
  label="Notifikasi email"
  defaultChecked
  onCheckedChange={(checked) => console.log(checked)}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Switch from "@/components/markas/Switch.vue";

const notifikasi = ref(true);
</script>

<template>
  <Switch v-model="notifikasi" name="notifikasi" label="Notifikasi email" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Switch from "$lib/components/markas/Switch.svelte";

  let notifikasi = $state(true);
</script>

<Switch
  bind:checked={notifikasi}
  name="notifications"
  label="Notifikasi email"
/>
```

## Astro

```astro
---
import Switch from "@/components/markas/Switch.astro";
---

<Switch name="notifications" label="Notifikasi email" checked />
```

Tanpa script klien: switch adalah checkbox native.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Switch } from "./markas/switch.component";

@Component({
  selector: "app-pengaturan",
  imports: [Switch],
  template: `
    <markas-switch
      [(checked)]="notifikasi"
      name="notifications"
      label="Notifikasi email"
    />
  `,
})
export class Pengaturan {
  readonly notifikasi = signal(true);
}
```

## Catatan

- Switch adalah `<input type="checkbox" role="switch">`, jadi nilainya ikut terkirim bersama form seperti checkbox biasa.
- Status aktif dibacakan dari `checked` native, sehingga tidak perlu `aria-checked`. Tampilan memakai `checked:` dan `peer-checked:`, bukan `data-state`.
- Komponen ini tidak punya teks bawaan. Cukup isi `label` dalam Bahasa Indonesia.
