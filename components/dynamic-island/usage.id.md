## Blade

```blade
<div x-data="{ island: 'compact' }">
    <x-markas.dynamic-island
        state="compact"
        x-model="island"
        island-label="Aktivitas langsung"
        :announcements="['expanded' => 'Timer fokus, sisa 12 menit']"
    >
        <x-slot:leading><svg aria-hidden="true">...</svg></x-slot:leading>
        <x-slot:trailing><span class="tabular-nums">12:48</span></x-slot:trailing>
        <x-slot:expanded>
            <p>Timer fokus</p>
            <button type="button" x-on:click="island = 'idle'">Selesai</button>
        </x-slot:expanded>
    </x-markas.dynamic-island>
    <button type="button" x-on:click="island = 'expanded'">Lihat timer</button>
</div>
```

## React

```tsx
import { DynamicIsland } from "@/components/markas/DynamicIsland";

<DynamicIsland
  state={state}
  islandLabel="Aktivitas langsung"
  leading={<IkonTimer />}
  trailing={<span className="tabular-nums">12:48</span>}
  expanded={<KartuTimer onSelesai={() => setState("idle")} />}
  announcements={{ expanded: "Timer fokus, sisa 12 menit" }}
/>;
```

## Vue

```vue
<script setup lang="ts">
import DynamicIsland from "@/components/markas/DynamicIsland.vue";
</script>

<template>
  <DynamicIsland
    :state="state"
    island-label="Aktivitas langsung"
    :announcements="{ expanded: 'Timer fokus' }"
  >
    <template #leading><IkonTimer /></template>
    <template #trailing><span class="tabular-nums">12:48</span></template>
    <template #expanded><KartuTimer @selesai="state = 'idle'" /></template>
  </DynamicIsland>
</template>
```

## Catatan

- Lebar, tinggi, dan radius sudut bergerak dengan satu transisi CSS yang memantul halus. Konten baru memudar masuk dan menajam sesaat kemudian.
- Isi setiap keadaan tetap di ukuran akhirnya dan terungkap oleh pill yang membesar, jadi teks tidak bergeser selama animasi.
- Island menambahkan class dark ke dirinya, jadi tampil sebagai pill hitam di halaman terang dan pill bercincin di halaman gelap, dan komponen di dalamnya memakai token gelap.
- Ukuran diambil dari --island-idle-width, --island-compact-width, --island-expanded-width, dan --island-expanded-height (default 7.5rem, 15rem, 22rem, 9.5rem).
