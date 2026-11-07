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

## Notes

- Pure CSS, no JavaScript. The line appears on hover, on keyboard focus, and stays visible with `active`, which also sets `aria-current="page"`.
- The line and the scribble use `currentColor`, so they follow the text color of the link.
- The link is `inline-block` so the line sits under the whole label; keep labels on one line.
- With reduced motion, the line appears without a transition.
