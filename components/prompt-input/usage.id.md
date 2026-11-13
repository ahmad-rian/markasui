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

## Svelte

```svelte
<script lang="ts">
  import PromptInput from "$lib/components/markas/PromptInput.svelte";

  let text = $state("");
  let loading = $state(false);
</script>

<PromptInput
  bind:value={text}
  {loading}
  models={["Markas Pro", "Markas Mini"]}
  model="Markas Pro"
  onSend={({ text, files }) => (loading = true)}
  onStop={() => (loading = false)}
/>
```

## Astro

```astro
---
import PromptInput from "@/components/markas/PromptInput.astro";
---

<PromptInput models={["Markas Pro", "Markas Mini"]} model="Markas Pro" />

<script>
  const input = document.querySelector("markas-prompt-input");
  input?.addEventListener("send", () => input.toggleAttribute("loading", true));
  input?.addEventListener("stop", () => input.toggleAttribute("loading", false));
</script>
```

Script yang dibundel memancarkan `send` dengan `{ text, files }` dan `stop` di `markas-prompt-input`; pasang atau hapus atribut `loading`-nya untuk mengganti tombol.

## Angular

```ts
import { Component, signal } from "@angular/core";
import {
  PromptInput,
  type PromptInputValue,
} from "./markas/prompt-input.component";

@Component({
  selector: "app-chat",
  imports: [PromptInput],
  template: `
    <markas-prompt-input
      [(value)]="text"
      [loading]="loading()"
      [models]="['Markas Pro', 'Markas Mini']"
      model="Markas Pro"
      (send)="onSend($event)"
      (stop)="loading.set(false)"
    />
  `,
})
export class Chat {
  readonly text = signal("");
  readonly loading = signal(false);
  onSend(value: PromptInputValue) {
    this.loading.set(true);
  }
}
```

## Catatan

- Kolom tumbuh mengikuti isi sampai maxHeight, lalu bisa digulir. Memakai CSS field-sizing dan mengukur manual di browser lama.
- Enter mengirim, Shift+Enter menambah baris. Teks dan berkas terlampir dikosongkan setelah mengirim.
- Tombol kirim hanya aktif saat ada teks. Saat loading tombol berubah menjadi stop dan memicu stop.
- Di Blade handler x-on berjalan di dalam komponen, jadi `loading = true` di x-on:send langsung mengganti tombol menjadi stop.
