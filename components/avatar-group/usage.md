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

## Notes

- No JavaScript needed. The Blade version does not need Alpine.js; hover effects are pure CSS.
- People after `max` collapse into a +N chip. Its tooltip lists their names and screen readers hear `moreLabel` ("2 more").
- The ring between avatars uses the canvas color. On a card, set `class="[--avatar-ring:var(--color-surface)]"`.
- Tooltips sit above the group, so leave some space there.
