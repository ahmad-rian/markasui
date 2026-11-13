## Blade

```blade
<x-markas.alert title="Pembaruan tersedia" role="status">Versi 2.1 bisa dipasang kapan saja.</x-markas.alert>
<x-markas.alert variant="danger" title="Gagal menyimpan">Periksa koneksi internet lalu coba lagi.</x-markas.alert>
```

## React

```tsx
import { Alert } from "@/components/markas/Alert";

<Alert title="Pembaruan tersedia" role="status">
  Versi 2.1 bisa dipasang kapan saja.
</Alert>
<Alert variant="danger" title="Gagal menyimpan">
  Periksa koneksi internet lalu coba lagi.
</Alert>
```

## Vue

```vue
<script setup lang="ts">
import Alert from "@/components/markas/Alert.vue";
</script>

<template>
  <Alert title="Pembaruan tersedia" role="status">
    Versi 2.1 bisa dipasang kapan saja.
  </Alert>
  <Alert variant="danger" title="Gagal menyimpan">
    Periksa koneksi internet lalu coba lagi.
  </Alert>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Alert from "$lib/components/markas/Alert.svelte";
</script>

<Alert title="Update available" role="status">
  Version 2.1 can be installed at any time.
</Alert>
<Alert variant="danger" title="Could not save">
  Check your internet connection and try again.
</Alert>
```

## Astro

```astro
---
import Alert from "@/components/markas/Alert.astro";
---

<Alert title="Update available" role="status">
  Version 2.1 can be installed at any time.
</Alert>
<Alert variant="danger" title="Could not save">
  Check your internet connection and try again.
</Alert>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Alert } from "./markas/alert.component";

@Component({
  selector: "app-status",
  imports: [Alert],
  template: `
    <markas-alert title="Update available" role="status">
      Version 2.1 can be installed at any time.
    </markas-alert>
    <markas-alert variant="danger" title="Could not save">
      Check your internet connection and try again.
    </markas-alert>
  `,
})
export class Status {}
```

## Catatan

- Default `role="alert"` langsung dibacakan pembaca layar. Untuk info yang tidak mendesak, isi `role="status"`.
- Tanpa JavaScript, jadi versi Blade tidak butuh Alpine.js.
