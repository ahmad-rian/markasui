## Blade

```blade
<form method="POST" action="/workspace" x-data x-on:complete="$el.submit()">
    @csrf
    @method('DELETE')
    <x-markas.hold-button variant="danger" :duration="2000" hold-label="Tekan dan tahan untuk mengonfirmasi">Tahan untuk menghapus</x-markas.hold-button>
</form>
```

## React

```tsx
import { HoldButton } from "@/components/markas/HoldButton";

<HoldButton
  variant="danger"
  duration={2000}
  holdLabel="Tekan dan tahan untuk mengonfirmasi"
  onComplete={deleteWorkspace}
>
  Tahan untuk menghapus
</HoldButton>;
```

## Vue

```vue
<script setup lang="ts">
import HoldButton from "@/components/markas/HoldButton.vue";
</script>

<template>
  <HoldButton
    variant="danger"
    :duration="2000"
    hold-label="Tekan dan tahan untuk mengonfirmasi"
    @complete="deleteWorkspace"
  >
    Tahan untuk menghapus
  </HoldButton>
</template>
```

## Catatan

- Jalankan aksi di event complete. Klik singkat tidak melakukan apa-apa.
- Pointer up, pointer leave, blur, atau melepas Spasi atau Enter sebelum selesai membatalkan dan isian kembali.
- Tombol tetap data-state="complete" sampai dilepas. Blade mengirim event DOM `complete` yang bubble dan butuh Alpine.js.
