## Blade

```blade
<x-markas.not-found />

<x-markas.not-found
    variant="search"
    :links="[
        ['label' => 'Documentation', 'href' => '/docs'],
        ['label' => 'Pricing', 'href' => '/pricing'],
    ]"
/>

<x-markas.not-found variant="glitch" code="500" title="Something went wrong" />
```

Needs Alpine.js for Go back and the search filter.

## React

```tsx
import { NotFound } from "@/components/markas/NotFound";

<NotFound />
<NotFound
  variant="search"
  links={[
    { label: "Documentation", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ]}
/>
<NotFound variant="glitch" code="500" title="Something went wrong" />
```

## Vue

```vue
<script setup lang="ts">
import NotFound from "@/components/markas/NotFound.vue";

const links = [
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];
</script>

<template>
  <NotFound />
  <NotFound variant="search" :links="links" />
  <NotFound variant="glitch" code="500" title="Something went wrong" />
</template>
```

## Notes

- The block renders an h1, so use it as the main content of the error page.
- Go back is a link to `homeHref`. With browser history it calls `history.back()` instead.
- The split variant shows its illustration beside the text from 36rem wide (container query) and below it on narrow screens.
