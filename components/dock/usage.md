## Blade

```blade
<x-markas.dock
    :magnification="1.6"
    x-on:select="openApp($event.detail)"
    :items="[
        ['label' => 'Files', 'value' => 'files', 'icon' => 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'active' => true],
        ['label' => 'Mail', 'value' => 'mail', 'icon' => 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6'],
        ['separator' => true],
        ['label' => 'Blog', 'href' => '/blog', 'icon' => 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
    ]"
/>
```

## React

```tsx
import { Dock } from "@/components/markas/Dock";

<Dock
  items={[
    { label: "Files", value: "files", icon: folderPath, active: true },
    { label: "Mail", value: "mail", icon: mailPath },
    { separator: true },
    { label: "Blog", href: "/blog", icon: penPath },
  ]}
  onItemSelect={openApp}
/>;
```

## Vue

```vue
<script setup lang="ts">
import Dock from "@/components/markas/Dock.vue";
</script>

<template>
  <Dock :items="items" :magnification="1.6" @select="openApp" />
</template>
```

## Notes

- Items grow with a cosine falloff over 140px around the pointer, and around the focused item when you use the keyboard.
- The dock is a toolbar with roving tabindex: Tab enters it once, arrows move between items.
- Pressing an item plays a short bounce and fires select. Items with href navigate as normal links.
- Reduced motion keeps every item at its base size and skips the bounce.
