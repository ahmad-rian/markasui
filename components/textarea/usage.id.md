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

## Catatan

- Atribut tambahan (`name`, `placeholder`, `maxlength`, `class`) diteruskan ke elemen `<textarea>`, bukan ke pembungkusnya.
- Di Blade, isi awal diberikan lewat prop `value` karena textarea tidak punya atribut value.
- Komponen ini tidak punya teks bawaan. Semua teks berasal dari prop, jadi cukup isi `label`, `hint`, dan `error` dalam Bahasa Indonesia.
