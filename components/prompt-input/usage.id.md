## Blade

```blade
<x-markas.prompt-input
    :models="['Markas Pro', 'Markas Mini']"
    model="Markas Pro"
    :max-length="2000"
    placeholder-label="Tanya apa saja"
    input-label="Pesan"
    send-label="Kirim"
    stop-label="Hentikan"
    attach-label="Lampirkan berkas"
    remove-label="Hapus {name}"
    x-on:send="tanya($event.detail.text, $event.detail.files); loading = true"
    x-on:stop="batal(); loading = false"
/>
```

## React

```tsx
import { PromptInput } from "@/components/markas/PromptInput";

<PromptInput
  models={["Markas Pro", "Markas Mini"]}
  maxLength={2000}
  loading={loading}
  placeholderLabel="Tanya apa saja"
  inputLabel="Pesan"
  sendLabel="Kirim"
  stopLabel="Hentikan"
  attachLabel="Lampirkan berkas"
  removeLabel="Hapus {name}"
  onSend={({ text, files }) => tanya(text, files)}
  onStop={batal}
/>;
```

## Vue

```vue
<script setup lang="ts">
import PromptInput from "@/components/markas/PromptInput.vue";
</script>

<template>
  <PromptInput
    :models="['Markas Pro', 'Markas Mini']"
    :max-length="2000"
    :loading="loading"
    placeholder-label="Tanya apa saja"
    input-label="Pesan"
    send-label="Kirim"
    stop-label="Hentikan"
    attach-label="Lampirkan berkas"
    remove-label="Hapus {name}"
    @send="({ text, files }) => tanya(text, files)"
    @stop="batal"
  />
</template>
```

## Catatan

- Kolom tumbuh mengikuti isi sampai maxHeight, lalu bisa digulir. Memakai CSS field-sizing dan mengukur manual di browser lama.
- Enter mengirim, Shift+Enter menambah baris. Teks dan berkas terlampir dikosongkan setelah mengirim.
- Tombol kirim hanya aktif saat ada teks. Saat loading tombol berubah menjadi stop dan memicu stop.
- Di Blade handler x-on berjalan di dalam komponen, jadi `loading = true` di x-on:send langsung mengganti tombol menjadi stop.
