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

## Notes

- The last item is always rendered as text with `aria-current="page"`, even when it has an `href`.
- The nav is labelled "Breadcrumb". Translate it with `navLabel` (Blade: `nav-label`).
