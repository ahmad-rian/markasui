## Blade

```blade
<x-markas.navbar :links="[
    ['label' => 'Home', 'href' => '/', 'active' => true],
    ['label' => 'Components', 'href' => '/components'],
]">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Sign in</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
```

Needs Alpine.js for the mobile menu.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Navbar } from "@/components/markas/Navbar";

<Navbar
  brand="MarkasUI"
  links={[
    { label: "Home", href: "/", active: true },
    { label: "Components", href: "/components" },
  ]}
  actions={<Button size="sm">Sign in</Button>}
/>;
```

## Vue

```vue
<template>
  <Navbar
    :links="[
      { label: 'Home', href: '/', active: true },
      { label: 'Components', href: '/components' },
    ]"
  >
    <template #brand>MarkasUI</template>
    <template #actions>
      <Button size="sm">Sign in</Button>
    </template>
  </Navbar>
</template>
```

## Notes

- The layout follows the header width through a container query (`@container` and `@3xl:`), not the viewport. The desktop menu shows when the header is 48rem wide or more, below that the menu button appears.
- The menu button is labelled "Menu" and the navs "Main" and "Main mobile". Translate them with `menuLabel`, `navLabel`, and `mobileNavLabel` (Blade: `menu-label`, `nav-label`, `mobile-nav-label`).
