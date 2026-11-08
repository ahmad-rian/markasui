## Blade

```blade
<x-markas.sidebar :sections="[
    ['items' => [
        ['label' => 'Home', 'href' => '/', 'icon' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z'],
        ['label' => 'Inbox', 'href' => '/inbox', 'icon' => 'M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z', 'badge' => 12],
    ]],
    ['title' => 'Workspace', 'items' => [
        ['label' => 'Projects', 'icon' => 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'children' => [
            ['label' => 'Website redesign', 'href' => '/projects/website', 'active' => true],
            ['label' => 'Mobile app', 'href' => '/projects/mobile'],
        ]],
    ]],
]" class="h-dvh">
    <x-slot:header>MarkasUI</x-slot:header>
    <x-slot:footer>Rina Saputra</x-slot:footer>

    <main class="flex-1 p-6">...</main>
</x-markas.sidebar>
```

Needs Alpine.js. Listen for rail changes with `x-on:markas-collapsed-change="saved = $event.detail"`.

## React

```tsx
import { Sidebar } from "@/components/markas/Sidebar";

const sections = [
  {
    items: [
      {
        label: "Home",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 12,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        children: [
          {
            label: "Website redesign",
            href: "/projects/website",
            active: true,
          },
          { label: "Mobile app", href: "/projects/mobile" },
        ],
      },
    ],
  },
];

const [collapsed, setCollapsed] = useState(false);

<Sidebar
  sections={sections}
  header="MarkasUI"
  footer="Rina Saputra"
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  className="h-dvh"
>
  <main className="flex-1 p-6">...</main>
</Sidebar>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/markas/Sidebar.vue";

const collapsed = ref(false);
// sections: same shape as the React example
</script>

<template>
  <Sidebar v-model:collapsed="collapsed" :sections="sections" class="h-dvh">
    <template #header>MarkasUI</template>
    <template #footer>Rina Saputra</template>
    <main class="flex-1 p-6">...</main>
  </Sidebar>
</template>
```

## Notes

- The component is the whole app shell: put the page content inside it. Its width decides the layout through a container query. From `breakpoint` (default `md`, 42rem) the sidebar sits next to the content; below it a menu button opens the same links in a native `<dialog>` that slides in from the left.
- The round button on the sidebar edge switches to a 64px icon rail. Labels then show as tooltips and badges as a dot. The state is uncontrolled by default. Start in rail mode with `defaultCollapsed` in React, or `:collapsed="true"` without `v-model` in Vue and Blade.
- In rail mode a parent item expands the sidebar and opens its sub-items.
- The highlight slides to the hovered or focused item and back to the active one. It uses CSS anchor positioning, so it needs no JavaScript; browsers without it still mark the active item with bold text. Sub-item groups that hold the active page start open; set `open` to override.
- `header` and `footer` render twice: once in the sidebar and once in the mobile dialog. A workspace switcher (DropdownMenu) or a search trigger (Command) works in both copies; in Blade, ids inside the dialog copy get a `-m` suffix so they stay unique.
- Hide parts of the header or footer in rail mode with `in-data-[state=collapsed]:hidden`, for example an upgrade card.
- Labels default to English: "Sidebar", "Collapse sidebar", "Expand sidebar", "Open sidebar", and "Close sidebar". Translate them with `navLabel`, `collapseLabel`, `expandLabel`, `openLabel`, and `closeLabel` (Blade: `nav-label`, `collapse-label`, and so on).
