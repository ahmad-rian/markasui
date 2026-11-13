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

## Svelte

```svelte
<script lang="ts">
  import Separator from "$lib/components/markas/Separator.svelte";
</script>

<Separator class="my-4" />
<Separator orientation="vertical" />
<Separator decorative={false} label="Danger zone" />
```

## Astro

```astro
---
import Separator from "@/components/markas/Separator.astro";
---

<Separator class="my-4" />
<Separator orientation="vertical" />
<Separator decorative={false} label="Danger zone" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { Separator } from "./markas/separator.component";

@Component({
  selector: "app-example",
  imports: [Separator],
  template: `
    <div markas-separator class="my-4"></div>
    <div markas-separator orientation="vertical"></div>
    <div markas-separator [decorative]="false" label="Danger zone"></div>
  `,
})
export class Example {}
```

Angular uses an attribute selector on a native `div`.

## Notes

- No JavaScript needed. The Blade version does not need Alpine.js.
- A vertical separator uses `self-stretch`, so place it inside a flex row with a height.
- Add spacing with a class, such as `class="my-4"`.
- The component has no built-in text. Pass `label` in the language of your site.
