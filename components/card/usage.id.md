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

## Catatan

- Semua bagian opsional. Bagian yang kosong tidak dirender, jadi jarak antar bagian tetap rapi.
- Class tambahan (misalnya `max-w-sm`) digabung di akhir dan jatuh ke elemen `<article>`.
- Card tidak punya teks bawaan. Semua teks berasal dari prop dan slot, jadi langsung bisa dipakai dalam Bahasa Indonesia.
