## Blade

```blade
<div class="flex items-center gap-4" role="status">
    <span class="sr-only">Loading profile</span>
    <x-markas.skeleton shape="circle" class="size-12 shrink-0" />
    <div class="grid flex-1 gap-2">
        <x-markas.skeleton class="h-4 w-2/3" />
        <x-markas.skeleton class="h-4 w-1/2" />
    </div>
</div>
```

## React

```tsx
import { Skeleton } from "@/components/markas/Skeleton";

<div className="flex items-center gap-4" role="status">
  <span className="sr-only">Loading profile</span>
  <Skeleton shape="circle" className="size-12 shrink-0" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
  </div>
</div>;
```

## Vue

```vue
<script setup lang="ts">
import Skeleton from "@/components/markas/Skeleton.vue";
</script>

<template>
  <div class="flex items-center gap-4" role="status">
    <span class="sr-only">Loading profile</span>
    <Skeleton shape="circle" class="size-12 shrink-0" />
    <div class="grid flex-1 gap-2">
      <Skeleton class="h-4 w-2/3" />
      <Skeleton class="h-4 w-1/2" />
    </div>
  </div>
</template>
```

## Notes

- Set the size with classes (`h-4 w-1/2`, `size-12`). For a circle use `shape="circle"`, not the `rounded-full` class, because without `tailwind-merge` conflicting radius classes depend on CSS order.
