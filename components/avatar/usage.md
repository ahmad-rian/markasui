## Blade

```blade
<x-markas.avatar name="John Carter" size="sm" />
<x-markas.avatar name="Sarah Miller" :src="$user->photo_url" />
<x-markas.avatar name="Emma Wilson" src="/img/emma.jpg" size="lg" alt="" />
```

The fallback for an image that fails to load needs Alpine.js. Livewire 3 and 4 already ship it. Without `src`, the initials render with no JavaScript.

## React

```tsx
import { Avatar } from "@/components/markas/Avatar";

<Avatar name="John Carter" size="sm" />
<Avatar name="Sarah Miller" src={user.photoUrl} />
<Avatar name="Emma Wilson" src="/img/emma.jpg" size="lg" alt="" />
```

## Vue

```vue
<script setup lang="ts">
import Avatar from "@/components/markas/Avatar.vue";
</script>

<template>
  <Avatar name="John Carter" size="sm" />
  <Avatar name="Sarah Miller" :src="user.photoUrl" />
  <Avatar name="Emma Wilson" src="/img/emma.jpg" size="lg" alt="" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Avatar from "$lib/components/markas/Avatar.svelte";
</script>

<Avatar name="Dewi Lestari" src="/avatars/dewi.jpg" size="lg" />
<Avatar name="Budi Santoso" />
```

## Astro

```astro
---
import Avatar from "@/components/markas/Avatar.astro";
---

<Avatar name="Dewi Lestari" src="/avatars/dewi.jpg" size="lg" />
<Avatar name="Budi Santoso" />
```

A small bundled script swaps a broken image for the initials.

## Angular

```ts
import { Component } from "@angular/core";
import { Avatar } from "./markas/avatar.component";

@Component({
  selector: "app-example",
  imports: [Avatar],
  template: `
    <markas-avatar name="Dewi Lestari" src="/avatars/dewi.jpg" size="lg" />
    <markas-avatar name="Budi Santoso" />
  `,
})
export class Example {}
```

## Notes

- Initials come from the first letter of the first and last word: `John Carter` becomes `JC`, `ann` becomes `A`. The `getInitials` function is exported from the React and Vue versions.
- Extra attributes (`loading`, `width`, `data-*`) land on the `<img>`. The fallback element only receives `class`.
- In Blade, an image that already failed before Alpine starts is still detected through `x-init` (it checks `complete` and `naturalWidth`).
- Avatar has no built-in text. The accessible name comes from `name` or `alt`, so pass them in your site's language.
