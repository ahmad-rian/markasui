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

## Catatan

- Memakai `navigator.clipboard.writeText` yang butuh konteks aman (https atau localhost). Jika browser memblokir clipboard, tombol tetap diam.
- Tanda centang tampil 2 detik, lalu tombol kembali diam.
- Tanpa label tombol berbentuk persegi dan namanya dari `copyLabel`. Blade butuh Alpine.js.
