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

## Svelte

```svelte
<script lang="ts">
  import HoldButton from "$lib/components/markas/HoldButton.svelte";
</script>

<HoldButton
  variant="danger"
  duration={2000}
  holdLabel="Tekan dan tahan untuk mengonfirmasi"
  oncomplete={deleteWorkspace}
>
  Tahan untuk menghapus
</HoldButton>
```

## Astro

```astro
---
import HoldButton from "@/components/markas/HoldButton.astro";
---

<HoldButton
  id="hapus-workspace"
  variant="danger"
  duration={2000}
  holdLabel="Tekan dan tahan untuk mengonfirmasi"
>
  Tahan untuk menghapus
</HoldButton>

<script>
  document
    .getElementById("hapus-workspace")
    ?.addEventListener("complete", () => deleteWorkspace());
</script>
```

## Angular

```ts
import { Component } from "@angular/core";
import { HoldButton } from "./markas/hold-button.component";

@Component({
  selector: "app-dangerzone",
  imports: [HoldButton],
  template: `
    <markas-hold-button
      variant="danger"
      [duration]="2000"
      holdLabel="Tekan dan tahan untuk mengonfirmasi"
      (complete)="deleteWorkspace()"
    >
      Tahan untuk menghapus
    </markas-hold-button>
  `,
})
export class DangerZone {
  deleteWorkspace() {}
}
```

Astro mengirim event DOM `complete` yang bubble dari tombol. Angular memindahkan `id`, `aria-label`, `title`, dan `class` dari `markas-hold-button` ke tombol di dalamnya.

## Catatan

- Jalankan aksi di event complete. Klik singkat tidak melakukan apa-apa.
- Pointer up, pointer leave, blur, atau melepas Spasi atau Enter sebelum selesai membatalkan dan isian kembali.
- Tombol tetap data-state="complete" sampai dilepas. Blade mengirim event DOM `complete` yang bubble dan butuh Alpine.js.
