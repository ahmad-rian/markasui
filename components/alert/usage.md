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

## Catatan

- Default `role="alert"` langsung dibacakan pembaca layar. Untuk info yang tidak mendesak, isi `role="status"`.
- Tanpa JavaScript, jadi versi Blade tidak butuh Alpine.js.
