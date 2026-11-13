## Blade

```blade
<div class="relative h-dvh overflow-hidden">
    <main class="h-full overflow-y-auto pb-28">...</main>
    <x-markas.bottom-navigation
        shrink-on-scroll
        default-value="beranda"
        nav-label="Navigasi utama"
        action-label="Transfer baru"
        badge-label="{count} baru"
        class="absolute inset-x-4 bottom-4"
        :items="[
            ['value' => 'beranda', 'label' => 'Beranda', 'icon' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z'],
            ['value' => 'aktivitas', 'label' => 'Aktivitas', 'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6', 'badge' => 2],
            ['value' => 'profil', 'label' => 'Profil', 'href' => '/profil', 'icon' => 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'],
        ]"
    >
        <x-slot:action>
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </x-slot:action>
    </x-markas.bottom-navigation>
</div>
```

## React

```tsx
import { BottomNavigation } from "@/components/markas/BottomNavigation";

const [tab, setTab] = useState("beranda");

<BottomNavigation
  items={items}
  value={tab}
  onValueChange={setTab}
  shrinkOnScroll
  navLabel="Navigasi utama"
  badgeLabel="{count} baru"
  action={<PlusIcon className="size-6" />}
  actionLabel="Transfer baru"
  onAction={bukaTransfer}
  className="absolute inset-x-4 bottom-4"
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import BottomNavigation from "@/components/markas/BottomNavigation.vue";

const tab = ref("beranda");
</script>

<template>
  <BottomNavigation
    v-model="tab"
    :items="items"
    shrink-on-scroll
    nav-label="Navigasi utama"
    action-label="Transfer baru"
    badge-label="{count} baru"
    class="absolute inset-x-4 bottom-4"
    @action="bukaTransfer"
  >
    <template #action><PlusIcon class="size-6" /></template>
  </BottomNavigation>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import BottomNavigation from "$lib/components/markas/BottomNavigation.svelte";

  let tab = $state("home");
</script>

<BottomNavigation
  {items}
  bind:value={tab}
  shrinkOnScroll
  actionLabel="New transfer"
  onaction={openTransfer}
  class="absolute inset-x-4 bottom-4"
>
  {#snippet action()}
    <PlusIcon class="size-6" />
  {/snippet}
</BottomNavigation>
```

Tombol aksi hanya dirender kalau snippet `action` diisi.

## Astro

```astro
---
import BottomNavigation from "@/components/markas/BottomNavigation.astro";
---

<BottomNavigation
  items={items}
  defaultValue="home"
  shrinkOnScroll
  actionLabel="New transfer"
  class="absolute inset-x-4 bottom-4"
>
  <PlusIcon slot="action" class="size-6" />
</BottomNavigation>
```

Custom element kecil menggeser pill dan mengecilkan bar. Ia mengirim `markas-change` (value sebagai detail) dan `markas-action`, keduanya menggelembung.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { BottomNavigation } from "./markas/bottom-navigation.component";

@Component({
  selector: "app-wallet-nav",
  imports: [BottomNavigation],
  template: `
    <markas-bottom-navigation
      [items]="items"
      [(value)]="tab"
      shrinkOnScroll
      actionLabel="New transfer"
      (action)="openTransfer()"
      class="absolute inset-x-4 bottom-4"
    >
      <svg action class="size-6" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" />
      </svg>
    </markas-bottom-navigation>
  `,
})
export class WalletNav {
  items = [{ value: "home", label: "Home", icon: "M3 10.5 12 3l9 7.5V20H3z" }];
  tab = signal("home");
  openTransfer() {}
}
```

Elemen dengan atribut `action` mengisi tombol aksi bulat.

## Catatan

- Letakkan bar di dalam elemen yang discroll (atau di sebelahnya, dalam induk yang sama). shrinkOnScroll mendengarkan scroll di dalam elemen induk bar dan di halaman.
- Beri konten yang discroll padding bawah (sekitar pb-28) agar baris terakhir tidak tertutup bar.
- Pill dan label murni CSS berdasarkan indeks terpilih, jadi render pertama di server sudah menampilkan keadaan yang benar.
- Item dengan href tetap link sungguhan. Menekannya tetap memindahkan pill untuk aplikasi satu halaman.
