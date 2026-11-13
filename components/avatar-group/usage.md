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
    group-label="Project members"
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
  groupLabel="Project members"
/>;
```

## Vue

```vue
<template>
  <AvatarGroup :items="team" :max="3" group-label="Project members" />
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

## Notes

- No JavaScript needed. The Blade version does not need Alpine.js; hover effects are pure CSS.
- People after `max` collapse into a +N chip. Its tooltip lists their names and screen readers hear `moreLabel` ("2 more").
- The ring between avatars uses the canvas color. On a card, set `class="[--avatar-ring:var(--color-surface)]"`.
- Tooltips sit above the group, so leave some space there.
