## Blade

```blade
<x-markas.separator />

<div class="flex h-5 items-center gap-3">
    <span>Docs</span>
    <x-markas.separator orientation="vertical" />
    <span>Blog</span>
</div>

<x-markas.separator label="or" />
<x-markas.separator :decorative="false" />
```

## React

```tsx
import { Separator } from "@/components/markas/Separator";

<Separator />
<div className="flex h-5 items-center gap-3">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Blog</span>
</div>
<Separator label="or" />
<Separator decorative={false} />
```

## Vue

```vue
<template>
  <Separator />
  <div class="flex h-5 items-center gap-3">
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Blog</span>
  </div>
  <Separator label="or" />
  <Separator :decorative="false" />
</template>
```

## Notes

- No JavaScript needed. The Blade version does not need Alpine.js.
- A vertical separator uses `self-stretch`, so place it inside a flex row with a height.
- Add spacing with a class, such as `class="my-4"`.
- The component has no built-in text. Pass `label` in the language of your site.
