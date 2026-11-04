## Blade

```blade
<x-markas.badge>Draf</x-markas.badge>
<x-markas.badge variant="success">Aktif</x-markas.badge>
<x-markas.badge variant="danger">Gagal</x-markas.badge>
```

## React

```tsx
import { Badge } from "@/components/markas/Badge";

<Badge>Draf</Badge>
<Badge variant="success">Aktif</Badge>
<Badge variant="danger">Gagal</Badge>
```

## Vue

```vue
<script setup lang="ts">
import Badge from "@/components/markas/Badge.vue";
</script>

<template>
  <Badge>Draf</Badge>
  <Badge variant="success">Aktif</Badge>
  <Badge variant="danger">Gagal</Badge>
</template>
```

## Catatan

- Teks varian success, warning, dan danger memakai `ink`, warna status dibawa oleh latar, border, dan titik. Warna `success` dan `warning` terang tidak cukup kontras untuk teks kecil.
