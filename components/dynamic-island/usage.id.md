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

## Svelte

```svelte
<script lang="ts">
  import DynamicIsland, {
    type DynamicIslandState,
  } from "$lib/components/markas/DynamicIsland.svelte";

  let state = $state<DynamicIslandState>("compact");
</script>

<DynamicIsland
  {state}
  announcements={{ expanded: "Focus timer, 12 minutes left" }}
>
  {#snippet leading()}<TimerIcon />{/snippet}
  {#snippet trailing()}<span class="tabular-nums">12:48</span>{/snippet}
  {#snippet expanded()}
    <TimerCard onEnd={() => (state = "idle")} />
  {/snippet}
</DynamicIsland>
```

## Astro

```astro
---
import DynamicIsland from "@/components/markas/DynamicIsland.astro";
---

<DynamicIsland
  state="compact"
  announcements={{ expanded: "Focus timer, 12 minutes left" }}
>
  <TimerIcon slot="leading" />
  <span slot="trailing" class="tabular-nums">12:48</span>
  <TimerCard slot="expanded" />
</DynamicIsland>

<script>
  document
    .querySelector("markas-dynamic-island")
    ?.setAttribute("state", "expanded");
</script>
```

Island merender state pertama di server. Ubah setelahnya dengan mengatur atribut `state` di `markas-dynamic-island`; panel, inert, dan pengumuman ikut berubah.

## Angular

```ts
import { Component, signal } from "@angular/core";
import {
  DynamicIsland,
  type DynamicIslandState,
} from "./markas/dynamic-island.component";

@Component({
  selector: "app-timer-island",
  imports: [DynamicIsland],
  template: `
    <markas-dynamic-island [state]="state()" [announcements]="announcements">
      <span leading class="size-2 rounded-full bg-warning"></span>
      <span trailing class="tabular-nums">12:48</span>
      <div expanded>
        <button type="button" (click)="state.set('idle')">End</button>
      </div>
    </markas-dynamic-island>
  `,
})
export class TimerIsland {
  state = signal<DynamicIslandState>("compact");
  announcements = { expanded: "Focus timer, 12 minutes left" };
}
```

Elemen dengan atribut `idle`, `leading`, `trailing`, atau `expanded` mengisi slot yang sesuai. `ng-container` juga bisa.

## Catatan

- Lebar, tinggi, dan radius sudut bergerak dengan satu transisi CSS yang memantul halus. Konten baru memudar masuk dan menajam sesaat kemudian.
- Isi setiap keadaan tetap di ukuran akhirnya dan terungkap oleh pill yang membesar, jadi teks tidak bergeser selama animasi.
- Island menambahkan class dark ke dirinya, jadi tampil sebagai pill hitam di halaman terang dan pill bercincin di halaman gelap, dan komponen di dalamnya memakai token gelap.
- Ukuran diambil dari --island-idle-width, --island-compact-width, --island-expanded-width, dan --island-expanded-height (default 7.5rem, 15rem, 22rem, 9.5rem).
