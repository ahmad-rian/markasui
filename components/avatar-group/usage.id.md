## Blade

```blade
<x-markas.avatar-group
    :items="[
        ['name' => 'Dewi Lestari', 'src' => '/avatars/dewi.jpg'],
        ['name' => 'Budi Santoso'],
        ['name' => 'Siti Aminah'],
        ['name' => 'John Carter'],
        ['name' => 'Maya Putri'],
    ]"
    :max="3"
    group-label="Anggota proyek"
    more-label="{count} lainnya"
/>
```

## React

```tsx
import { AvatarGroup } from "@/components/markas/AvatarGroup";

<AvatarGroup
  items={[
    { name: "Dewi Lestari", src: "/avatars/dewi.jpg" },
    { name: "Budi Santoso" },
    { name: "Siti Aminah" },
    { name: "John Carter" },
    { name: "Maya Putri" },
  ]}
  max={3}
  groupLabel="Anggota proyek"
  moreLabel="{count} lainnya"
/>;
```

## Vue

```vue
<template>
  <AvatarGroup
    :items="team"
    :max="3"
    group-label="Anggota proyek"
    more-label="{count} lainnya"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import AvatarGroup from "$lib/components/markas/AvatarGroup.svelte";

  const team = [
    { name: "Dewi Lestari", src: "/dewi.jpg" },
    { name: "Budi Santoso" },
  ];
</script>

<AvatarGroup items={team} max={3} groupLabel="Project members" />
```

## Astro

```astro
---
import AvatarGroup from "@/components/markas/AvatarGroup.astro";

const team = [{ name: "Dewi Lestari", src: "/dewi.jpg" }, { name: "Budi Santoso" }];
---

<AvatarGroup items={team} max={3} groupLabel="Project members" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { AvatarGroup } from "./markas/avatar-group.component";

@Component({
  selector: "app-members",
  imports: [AvatarGroup],
  template: `
    <div
      markas-avatar-group
      [items]="team"
      [max]="3"
      groupLabel="Project members"
    ></div>
  `,
})
export class Members {
  team = [{ name: "Dewi Lestari", src: "/dewi.jpg" }, { name: "Budi Santoso" }];
}
```

## Catatan

- Tanpa JavaScript. Versi Blade tidak butuh Alpine.js; efek hover murni CSS.
- Orang setelah `max` diringkas menjadi chip +N. Tooltip-nya berisi nama mereka dan screen reader membaca `moreLabel` ("2 lainnya").
- Ring di antara avatar memakai warna canvas. Di atas kartu, isi `class="[--avatar-ring:var(--color-surface)]"`.
- Tooltip muncul di atas grup, jadi sisakan ruang di sana.
