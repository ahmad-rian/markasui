## Blade

```blade
<x-markas.card title="Paket Pro" description="Untuk tim kecil yang sedang tumbuh.">
    Termasuk 10 anggota tim dan penyimpanan 50 GB.

    <x-slot:footer>
        <x-markas.button size="sm">Pilih paket</x-markas.button>
    </x-slot:footer>
</x-markas.card>
```

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Card } from "@/components/markas/Card";

<Card
  title="Paket Pro"
  description="Untuk tim kecil yang sedang tumbuh."
  footer={<Button size="sm">Pilih paket</Button>}
>
  Termasuk 10 anggota tim dan penyimpanan 50 GB.
</Card>;
```

## Vue

```vue
<template>
  <Card title="Paket Pro" description="Untuk tim kecil yang sedang tumbuh.">
    Termasuk 10 anggota tim dan penyimpanan 50 GB.

    <template #footer>
      <Button size="sm">Pilih paket</Button>
    </template>
  </Card>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Card from "$lib/components/markas/Card.svelte";
</script>

<Card title="Pro plan" description="For small teams that are growing.">
  Includes 10 team members and 50 GB of storage.

  {#snippet footer()}
    <Button size="sm">Choose plan</Button>
  {/snippet}
</Card>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Card from "@/components/markas/Card.astro";
---

<Card title="Pro plan" description="For small teams that are growing.">
  Includes 10 team members and 50 GB of storage.

  <Button slot="footer" size="sm">Choose plan</Button>
</Card>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Card } from "./markas/card.component";

@Component({
  selector: "app-example",
  imports: [Button, Card],
  template: `
    <article
      markas-card
      title="Pro plan"
      description="For small teams that are growing."
    >
      Includes 10 team members and 50 GB of storage.
      <button markas-button footer size="sm">Choose plan</button>
    </article>
  `,
})
export class Example {}
```

Angular memakai attribute selector pada `article` native. Elemen dengan atribut `footer` (bisa `ng-container`) mengisi footer.

## Catatan

- Semua bagian opsional. Bagian yang kosong tidak dirender, jadi jarak antar bagian tetap rapi.
- Class tambahan (misalnya `max-w-sm`) digabung di akhir dan jatuh ke elemen `<article>`.
- Card tidak punya teks bawaan. Semua teks berasal dari prop dan slot, jadi langsung bisa dipakai dalam Bahasa Indonesia.
