## Blade

```blade
<x-markas.dock
    dock-label="Dok aplikasi"
    :magnification="1.6"
    x-on:select="bukaAplikasi($event.detail)"
    :items="[
        ['label' => 'Berkas', 'value' => 'files', 'icon' => 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'active' => true],
        ['label' => 'Surel', 'value' => 'mail', 'icon' => 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6'],
        ['separator' => true],
        ['label' => 'Blog', 'href' => '/blog', 'icon' => 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
    ]"
/>
```

## React

```tsx
import { Dock } from "@/components/markas/Dock";

<Dock
  dockLabel="Dok aplikasi"
  items={[
    { label: "Berkas", value: "files", icon: folderPath, active: true },
    { label: "Surel", value: "mail", icon: mailPath },
    { separator: true },
    { label: "Blog", href: "/blog", icon: penPath },
  ]}
  onItemSelect={bukaAplikasi}
/>;
```

## Vue

```vue
<script setup lang="ts">
import Dock from "@/components/markas/Dock.vue";
</script>

<template>
  <Dock
    :items="items"
    dock-label="Dok aplikasi"
    :magnification="1.6"
    @select="bukaAplikasi"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Dock, { type DockItem } from "$lib/components/markas/Dock.svelte";

  const items: DockItem[] = [
    { label: "Files", value: "files", icon: folderPath, active: true },
    { label: "Mail", value: "mail", icon: mailPath },
    { separator: true },
    { label: "Blog", href: "/blog", icon: penPath },
  ];
</script>

<Dock {items} onItemSelect={openApp} />
```

## Astro

```astro
---
import Dock, { type DockItem } from "@/components/markas/Dock.astro";

const items: DockItem[] = [
  { label: "Files", value: "files", icon: folderPath, active: true },
  { separator: true },
  { label: "Blog", href: "/blog", icon: penPath },
];
---

<Dock items={items} />
```

Custom element kecil memperbesar item dan memindahkan tab stop. Menekan item mengirim event `markas-select` yang menggelembung dengan value-nya sebagai detail.

## Angular

```ts
import { Component } from "@angular/core";
import { Dock, type DockItem } from "./markas/dock.component";

@Component({
  selector: "app-dock",
  imports: [Dock],
  template: `<markas-dock [items]="items" (itemSelect)="openApp($event)" />`,
})
export class AppDock {
  items: DockItem[] = [
    { label: "Files", value: "files", icon: "M3 7h18v12H3z", active: true },
    { separator: true },
    { label: "Blog", href: "/blog", icon: "M12 20h9" },
  ];
  openApp(value: string) {}
}
```

## Catatan

- Item membesar dengan kurva kosinus dalam jarak 140px di sekitar kursor, dan di sekitar item yang difokus saat memakai keyboard.
- Dock adalah toolbar dengan roving tabindex: Tab masuk sekali, panah berpindah antar item.
- Menekan item memutar pantulan singkat dan memicu select. Item dengan href berpindah halaman seperti link biasa.
- Reduced motion menjaga setiap item di ukuran dasar dan melewati pantulan.
