## Blade

```blade
<x-markas.navbar variant="blur" :sticky="true" :links="[
    ['label' => 'Home', 'href' => '/', 'active' => true],
    ['label' => 'Products', 'children' => [
        [
            'label' => 'Analytics',
            'href' => '/analytics',
            'description' => 'Track usage in real time',
            'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6',
        ],
        ['label' => 'Automation', 'href' => '/automation'],
    ]],
    ['label' => 'Pricing', 'href' => '/pricing'],
]">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Sign in</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
```

Needs Alpine.js for the dropdowns and the mobile menu.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Navbar } from "@/components/markas/Navbar";

<Navbar
  variant="blur"
  sticky
  brand="MarkasUI"
  links={[
    { label: "Home", href: "/", active: true },
    {
      label: "Products",
      children: [
        {
          label: "Analytics",
          href: "/analytics",
          description: "Track usage in real time",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        { label: "Automation", href: "/automation" },
      ],
    },
    { label: "Pricing", href: "/pricing" },
  ]}
  actions={<Button size="sm">Sign in</Button>}
/>;
```

## Vue

```vue
<script setup lang="ts">
const links = [
  { label: "Home", href: "/", active: true },
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage in real time",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      { label: "Automation", href: "/automation" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];
</script>

<template>
  <Navbar variant="blur" sticky :links="links">
    <template #brand>MarkasUI</template>
    <template #actions>
      <Button size="sm">Sign in</Button>
    </template>
  </Navbar>
</template>
```

## Notes

- Plain links from earlier versions keep working. Add `children` to an item to turn it into a dropdown; its own `href` is then ignored.
- Dropdown panels use the native Popover API, so they sit in the top layer above other content and close on outside click or Escape. A panel with more than three links flows into a second column.
- `variant`: `default` draws a hairline bottom border, `floating` is a rounded bar with a border and soft shadow, `blur` is translucent with a backdrop blur. Pair `blur` with `sticky` over content that scrolls under the header.
- The layout follows the header width through a container query (`@container` and `@2xl:`), not the viewport. The desktop menu shows when the header is 42rem wide or more, below that the menu button appears and dropdowns become collapsible groups.
- The menu button is labelled "Menu" and the navs "Main" and "Main mobile". Translate them with `menuLabel`, `navLabel`, and `mobileNavLabel` (Blade: `menu-label`, `nav-label`, `mobile-nav-label`).
