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

## Catatan

- Tanpa JavaScript. Versi Blade tidak butuh Alpine.js; efek hover murni CSS.
- Orang setelah `max` diringkas menjadi chip +N. Tooltip-nya berisi nama mereka dan screen reader membaca `moreLabel` ("2 lainnya").
- Ring di antara avatar memakai warna canvas. Di atas kartu, isi `class="[--avatar-ring:var(--color-surface)]"`.
- Tooltip muncul di atas grup, jadi sisakan ruang di sana.
