## Blade

```blade
<x-markas.breadcrumb :items="[
    ['label' => 'Home', 'href' => '/'],
    ['label' => 'Components', 'href' => '/components'],
    ['label' => 'Breadcrumb'],
]" />
```

No Alpine.js needed.

## React

```tsx
import { Breadcrumb } from "@/components/markas/Breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>;
```

## Vue

```vue
<template>
  <Breadcrumb
    :items="[
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumb' },
    ]"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Breadcrumb from "$lib/components/markas/Breadcrumb.svelte";
</script>

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>
```

## Astro

```astro
---
import Breadcrumb from "@/components/markas/Breadcrumb.astro";
---

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>
```

No JavaScript is shipped.

## Angular

```ts
import { Component } from "@angular/core";
import { Breadcrumb } from "./markas/breadcrumb.component";

@Component({
  selector: "app-page-trail",
  imports: [Breadcrumb],
  template: `<nav markas-breadcrumb [items]="items"></nav>`,
})
export class PageTrail {
  readonly items = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ];
}
```

## Notes

- The last item is always rendered as text with `aria-current="page"`, even when it has an `href`.
- The nav is labelled "Breadcrumb". Translate it with `navLabel` (Blade: `nav-label`).
