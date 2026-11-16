## Blade

Pasang region sekali di layout, misalnya sebelum `</body>`:

```blade
<x-markas.toast
    :initial="session('toast') ? [session('toast')] : []"
    close-label="Tutup"
    region-label="Notifikasi"
/>
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

Butuh Alpine.js. Livewire 3 dan 4 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

### Livewire

```php
$this->dispatch('markas-toast', title: 'Saved', variant: 'success');
```

Livewire 3 dan 4 memancarkan event browser di `window`, jadi toast bisa langsung dari action komponen. Pasang `<x-markas.toast />` sekali di layout.

## React

```tsx
import { Toaster, toast } from "@/components/markas/Toast";

// Di layout
<Toaster closeLabel="Tutup" regionLabel="Notifikasi" />;

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
  <Toaster close-label="Tutup" region-label="Notifikasi" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Toaster, { toast } from "$lib/components/markas/Toast.svelte";
</script>

<Button onclick={() => toast({ title: "Changes saved", variant: "success" })}>
  Save
</Button>
<Toaster />
```

## Astro

```astro
---
import Toaster from "@/components/markas/Toast.astro";
---

<!-- In the layout -->
<Toaster />

<script>
  // Anywhere in the browser
  window.dispatchEvent(
    new CustomEvent("markas-toast", {
      detail: { title: "Changes saved", variant: "success" },
    }),
  );
</script>
```

Komponen Astro tidak bisa mengekspor fungsi ke halaman, jadi Toaster Astro mendengarkan event `markas-toast` yang sama dengan Blade. Prop `initial` menampilkan toast langsung.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Toaster, toast } from "./markas/toast.component";

@Component({
  selector: "app-root",
  imports: [Button, Toaster],
  template: `
    <button markas-button (click)="save()">Save</button>
    <markas-toaster />
  `,
})
export class App {
  save() {
    toast({ title: "Changes saved", variant: "success" });
  }
}
```

## Catatan

- Detail toast: `title`, `description`, `variant` (`default`, `success`, `danger`), dan `duration` dalam milidetik (default 5000, `0` berarti tetap tampil sampai ditutup).
- Timer berhenti saat toast di-hover atau berisi fokus.
- `toast()` mengembalikan id. Di React dan Vue, panggil `dismissToast(id)` untuk menutup dari kode.
- Antrean toast disimpan di level modul, jadi cukup satu `Toaster` per aplikasi.
- Panggil `toast()` hanya di browser, misalnya di event handler, `useEffect` (React), atau `onMounted` (Vue). Saat render di server (SSR) `toast()` tidak melakukan apa pun dan mengembalikan `0`.
- Label region default dalam bahasa Inggris ("Notifications") dan tombol tutup "Close". Isi `regionLabel` dengan "Notifikasi" dan `closeLabel` dengan "Tutup" (Blade: `region-label`, `close-label`) untuk situs berbahasa Indonesia.
