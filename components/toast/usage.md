## Blade

Pasang region sekali di layout, misalnya sebelum `</body>`:

```blade
<x-markas.toast :initial="session('toast') ? [session('toast')] : []" />
```

Picu toast dari Alpine atau JavaScript biasa:

```blade
<x-markas.button x-data x-on:click="$dispatch('markas-toast', { title: 'Perubahan disimpan', variant: 'success' })">Simpan</x-markas.button>
```

```js
window.dispatchEvent(
  new CustomEvent("markas-toast", {
    detail: { title: "Gagal mengirim", variant: "danger", duration: 0 },
  }),
);
```

Butuh Alpine.js. Livewire 3 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

## React

```tsx
import { Toaster, toast } from "@/components/markas/Toast";

// Di layout
<Toaster />;

// Di mana saja
toast({
  title: "Perubahan disimpan",
  description: "Profil Anda sudah diperbarui.",
  variant: "success",
});
```

## Vue

```vue
<script setup lang="ts">
import Toaster, { toast } from "@/components/markas/Toast.vue";
</script>

<template>
  <Button @click="toast({ title: 'Perubahan disimpan', variant: 'success' })">
    Simpan
  </Button>
  <Toaster />
</template>
```

## Catatan

- Detail toast: `title`, `description`, `variant` (`default`, `success`, `danger`), dan `duration` dalam milidetik (default 5000, `0` berarti tetap tampil sampai ditutup).
- Timer berhenti saat toast di-hover atau berisi fokus.
- `toast()` mengembalikan id. Di React dan Vue, panggil `dismissToast(id)` untuk menutup dari kode.
- Antrean toast disimpan di level modul, jadi cukup satu `Toaster` per aplikasi.
- Panggil `toast()` hanya di browser, misalnya di event handler, `useEffect` (React), atau `onMounted` (Vue). Saat render di server (SSR) `toast()` tidak melakukan apa pun dan mengembalikan `0`.
