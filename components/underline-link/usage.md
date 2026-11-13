## Blade

```blade
<nav class="flex gap-5 text-sm font-medium">
    <x-markas.underline-link href="/" active>Home</x-markas.underline-link>
    <x-markas.underline-link href="/docs" variant="comes-in-goes-out">Docs</x-markas.underline-link>
</nav>
<x-markas.underline-link href="/guide" variant="scribble">Migration guide</x-markas.underline-link>
```

## React

```tsx
import { UnderlineLink } from "@/components/markas/UnderlineLink";

<nav className="flex gap-5 text-sm font-medium">
  <UnderlineLink href="/" active>Home</UnderlineLink>
  <UnderlineLink href="/docs" variant="comes-in-goes-out">Docs</UnderlineLink>
</nav>
<UnderlineLink href="/guide" variant="scribble">Migration guide</UnderlineLink>
```

## Vue

```vue
<template>
  <nav class="flex gap-5 text-sm font-medium">
    <UnderlineLink href="/" active>Home</UnderlineLink>
    <UnderlineLink href="/docs" variant="comes-in-goes-out">Docs</UnderlineLink>
  </nav>
  <UnderlineLink href="/guide" variant="scribble"
    >Migration guide</UnderlineLink
  >
</template>
```

## Svelte

```svelte
<script lang="ts">
  import UnderlineLink from "$lib/components/markas/UnderlineLink.svelte";
</script>

<nav class="flex gap-5 text-sm font-medium">
  <UnderlineLink href="/" active>Home</UnderlineLink>
  <UnderlineLink href="/docs" variant="comes-in-goes-out">Docs</UnderlineLink>
</nav>
<UnderlineLink href="/guide" variant="scribble">Migration guide</UnderlineLink>
```

## Astro

```astro
---
import UnderlineLink from "@/components/markas/UnderlineLink.astro";
---

<nav class="flex gap-5 text-sm font-medium">
  <UnderlineLink href="/" active>Home</UnderlineLink>
  <UnderlineLink href="/docs" variant="comes-in-goes-out">Docs</UnderlineLink>
</nav>
<UnderlineLink href="/guide" variant="scribble">Migration guide</UnderlineLink>
```

## Angular

```ts
import { Component } from "@angular/core";
import { UnderlineLink } from "./markas/underline-link.component";

@Component({
  selector: "app-site-nav",
  imports: [UnderlineLink],
  template: `
    <nav class="flex gap-5 text-sm font-medium">
      <a markas-underline-link href="/" active>Home</a>
      <a markas-underline-link href="/docs" variant="comes-in-goes-out">Docs</a>
    </nav>
    <a markas-underline-link href="/guide" variant="scribble"
      >Migration guide</a
    >
  `,
})
export class SiteNav {}
```

Angular uses an attribute selector on the native link, so `target`, `rel`, `aria-*`, and `class` stay on it. No script in Astro: the line is pure CSS.

## Notes

- Pure CSS, no JavaScript. The line appears on hover, on keyboard focus, and stays visible with `active`, which also sets `aria-current="page"`.
- The line and the scribble use `currentColor`, so they follow the text color of the link.
- The link is `inline-block` so the line sits under the whole label; keep labels on one line.
- With reduced motion, the line appears without a transition.
