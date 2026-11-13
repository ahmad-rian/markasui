## Blade

```blade
<x-markas.navigation-menu
    :items="[
        ['label' => 'Products', 'featured' => [
            'title' => 'Workflows 2.0',
            'href' => '/workflows',
            'description' => 'Branching, retries, and a visual editor',
        ], 'links' => [
            ['label' => 'Analytics', 'href' => '/analytics', 'description' => 'See where visitors come from', 'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6'],
            ['label' => 'Automation', 'href' => '/automation', 'description' => 'Run workflows on a schedule'],
        ]],
        ['label' => 'Developers', 'links' => [
            ['label' => 'Documentation', 'href' => '/docs', 'description' => 'Guides and API reference'],
            ['label' => 'Changelog', 'href' => '/changelog', 'description' => 'What shipped this month'],
        ]],
        ['label' => 'Pricing', 'href' => '/pricing', 'active' => true],
    ]"
/>
```

Needs Alpine.js. Livewire 3 already ships Alpine, so there is nothing else to install.

## React

```tsx
import { NavigationMenu } from "@/components/markas/NavigationMenu";

<NavigationMenu
  items={[
    {
      label: "Products",
      featured: {
        title: "Workflows 2.0",
        href: "/workflows",
        description: "Branching, retries, and a visual editor",
      },
      links: [
        {
          label: "Analytics",
          href: "/analytics",
          description: "See where visitors come from",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Automation",
          href: "/automation",
          description: "Run workflows on a schedule",
        },
      ],
    },
    {
      label: "Developers",
      links: [
        {
          label: "Documentation",
          href: "/docs",
          description: "Guides and API reference",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "What shipped this month",
        },
      ],
    },
    { label: "Pricing", href: "/pricing", active: true },
  ]}
/>;
```

## Vue

```vue
<script setup lang="ts">
import NavigationMenu from "@/components/markas/NavigationMenu.vue";

const items = [
  {
    label: "Products",
    featured: {
      title: "Workflows 2.0",
      href: "/workflows",
      description: "Branching, retries, and a visual editor",
    },
    links: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See where visitors come from",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
      },
    ],
  },
  {
    label: "Developers",
    links: [
      {
        label: "Documentation",
        href: "/docs",
        description: "Guides and API reference",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "What shipped this month",
      },
    ],
  },
  { label: "Pricing", href: "/pricing", active: true },
];
</script>

<template>
  <NavigationMenu :items="items" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import NavigationMenu from "$lib/components/markas/NavigationMenu.svelte";

  const items = [
    {
      label: "Products",
      featured: {
        title: "Workflows 2.0",
        href: "/workflows",
        description: "Branching, retries, and a visual editor",
      },
      links: [
        {
          label: "Analytics",
          href: "/analytics",
          description: "See where visitors come from",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Automation",
          href: "/automation",
          description: "Run workflows on a schedule",
        },
      ],
    },
    {
      label: "Developers",
      links: [
        {
          label: "Documentation",
          href: "/docs",
          description: "Guides and API reference",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "What shipped this month",
        },
      ],
    },
    { label: "Pricing", href: "/pricing", active: true },
  ];
</script>

<NavigationMenu {items} />
```

## Astro

```astro
---
import NavigationMenu from "@/components/markas/NavigationMenu.astro";

const items = [
  {
    label: "Products",
    featured: {
      title: "Workflows 2.0",
      href: "/workflows",
      description: "Branching, retries, and a visual editor",
    },
    links: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See where visitors come from",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
      },
    ],
  },
  {
    label: "Developers",
    links: [
      {
        label: "Documentation",
        href: "/docs",
        description: "Guides and API reference",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "What shipped this month",
      },
    ],
  },
  { label: "Pricing", href: "/pricing", active: true },
];
---

<NavigationMenu items={items} />
```

A small bundled script powers every menu on the page. It also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import {
  NavigationMenu,
  type NavigationMenuItem,
} from "./markas/navigation-menu.component";

@Component({
  selector: "app-site-nav",
  imports: [NavigationMenu],
  template: `<markas-navigation-menu [items]="items" />`,
})
export class SiteNav {
  protected readonly items: NavigationMenuItem[] = [
    {
      label: "Products",
      featured: {
        title: "Workflows 2.0",
        href: "/workflows",
        description: "Branching, retries, and a visual editor",
      },
      links: [
        {
          label: "Analytics",
          href: "/analytics",
          description: "See where visitors come from",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Automation",
          href: "/automation",
          description: "Run workflows on a schedule",
        },
      ],
    },
    {
      label: "Developers",
      links: [
        {
          label: "Documentation",
          href: "/docs",
          description: "Guides and API reference",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "What shipped this month",
        },
      ],
    },
    { label: "Pricing", href: "/pricing", active: true },
  ];
}
```

## Notes

- An entry with `links` or `featured` becomes a trigger with a panel. Any other entry is a plain link to `href`.
- `icon` is the `d` attribute of a 24x24 stroked SVG path, so the same data works in Blade, React, and Vue. Copy it from an icon set such as Lucide.
- Panels render in the top layer through the Popover API and line up with the left edge of the nav, so switching between triggers swaps content in place. Only one panel is open at a time.
- Mouse hover opens a panel after a short delay and moves straight to the next trigger once one is open. Clicking a trigger that is already open does not close it, so a click right after hover keeps the panel open. Moving the pointer away, clicking outside, or pressing Escape closes it.
- The indicator under the triggers follows the open panel and rests on the entry marked `active`.
- On narrow screens the top level scrolls horizontally. For a full mobile menu, pair it with Navbar or Drawer.
- The nav's accessible name defaults to "Main". Translate it with `navLabel` (`nav-label` in Blade).
