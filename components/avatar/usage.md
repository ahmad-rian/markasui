## Blade

```blade
<x-markas.avatar name="John Carter" size="sm" />
<x-markas.avatar name="Sarah Miller" :src="$user->photo_url" />
<x-markas.avatar name="Emma Wilson" src="/img/emma.jpg" size="lg" alt="" />
```

The fallback for an image that fails to load needs Alpine.js. Livewire 3 already ships it. Without `src`, the initials render with no JavaScript.

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

## Notes

- Initials come from the first letter of the first and last word: `John Carter` becomes `JC`, `ann` becomes `A`. The `getInitials` function is exported from the React and Vue versions.
- Extra attributes (`loading`, `width`, `data-*`) land on the `<img>`. The fallback element only receives `class`.
- In Blade, an image that already failed before Alpine starts is still detected through `x-init` (it checks `complete` and `naturalWidth`).
- Avatar has no built-in text. The accessible name comes from `name` or `alt`, so pass them in your site's language.
