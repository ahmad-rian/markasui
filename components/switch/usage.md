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

## Catatan

- Switch adalah `<input type="checkbox" role="switch">`, jadi nilainya ikut terkirim bersama form seperti checkbox biasa.
- Status aktif dibacakan dari `checked` native, sehingga tidak perlu `aria-checked`. Tampilan memakai `checked:` dan `peer-checked:`, bukan `data-state`.
