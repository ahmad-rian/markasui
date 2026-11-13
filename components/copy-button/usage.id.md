## Blade

```blade
<x-markas.copy-button text="pnpm dlx markasui add button" variant="ghost" size="sm" copy-label="Salin perintah" copied-label="Tersalin" />
<x-markas.copy-button text="sk_live_51Hx9aT2" variant="secondary" copied-label="Tersalin">Salin kunci</x-markas.copy-button>
```

## React

```tsx
import { CopyButton } from "@/components/markas/CopyButton";

<CopyButton text="pnpm dlx markasui add button" variant="ghost" size="sm" copyLabel="Salin perintah" copiedLabel="Tersalin" />
<CopyButton text="sk_live_51Hx9aT2" variant="secondary" copiedLabel="Tersalin">Salin kunci</CopyButton>
```

## Vue

```vue
<script setup lang="ts">
import CopyButton from "@/components/markas/CopyButton.vue";
</script>

<template>
  <CopyButton
    text="pnpm dlx markasui add button"
    variant="ghost"
    size="sm"
    copy-label="Salin perintah"
    copied-label="Tersalin"
  />
  <CopyButton
    text="sk_live_51Hx9aT2"
    variant="secondary"
    copied-label="Tersalin"
    >Salin kunci</CopyButton
  >
</template>
```

## Svelte

```svelte
<script lang="ts">
  import CopyButton from "$lib/components/markas/CopyButton.svelte";
</script>

<CopyButton
  text="pnpm dlx markasui add button"
  variant="ghost"
  size="sm"
  copyLabel="Salin perintah"
  copiedLabel="Tersalin"
/>
<CopyButton text="sk_live_51Hx9aT2" variant="secondary" copiedLabel="Tersalin"
  >Salin kunci</CopyButton
>
```

## Astro

```astro
---
import CopyButton from "@/components/markas/CopyButton.astro";
---

<CopyButton text="pnpm dlx markasui add button" variant="ghost" size="sm" copyLabel="Salin perintah" copiedLabel="Tersalin" />
<CopyButton text="sk_live_51Hx9aT2" variant="secondary" copiedLabel="Tersalin">Salin kunci</CopyButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { CopyButton } from "./markas/copy-button.component";

@Component({
  selector: "app-install",
  imports: [CopyButton],
  template: `
    <markas-copy-button
      text="pnpm dlx markasui add button"
      variant="ghost"
      size="sm"
      copyLabel="Salin perintah"
      copiedLabel="Tersalin"
    />
    <markas-copy-button
      text="sk_live_51Hx9aT2"
      variant="secondary"
      copiedLabel="Tersalin"
    >
      Salin kunci
    </markas-copy-button>
  `,
})
export class Install {}
```

Angular memindahkan `id`, `aria-label`, `title`, dan `class` dari `markas-copy-button` ke tombol di dalamnya.

## Catatan

- Memakai `navigator.clipboard.writeText` yang butuh konteks aman (https atau localhost). Jika browser memblokir clipboard, tombol tetap diam.
- Tanda centang tampil 2 detik, lalu tombol kembali diam.
- Tanpa label tombol berbentuk persegi dan namanya dari `copyLabel`. Blade butuh Alpine.js.
