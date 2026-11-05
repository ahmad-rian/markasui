## Blade

```blade
<x-markas.context-menu
    :items="[
        ['label' => 'Open', 'value' => 'open'],
        ['label' => 'Rename', 'value' => 'rename'],
        ['separator' => true],
        ['label' => 'Delete', 'value' => 'delete', 'danger' => true],
    ]"
    x-on:markas-select="console.log($event.detail)"
>
    <div class="rounded-lg border border-dashed border-line p-8 text-sm text-muted">Right-click here</div>
</x-markas.context-menu>
```

Needs Alpine.js. Selecting an item dispatches a `markas-select` event with the item value in `$event.detail`. In Livewire: `x-on:markas-select="$wire.handle($event.detail)"`.

## React

```tsx
import { ContextMenu } from "@/components/markas/ContextMenu";

<ContextMenu
  items={[
    { label: "Open", value: "open" },
    { label: "Rename", value: "rename" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
  onSelect={(value) => console.log(value)}
>
  <div className="rounded-lg border border-dashed border-line p-8 text-sm text-muted">
    Right-click here
  </div>
</ContextMenu>;
```

## Vue

```vue
<template>
  <ContextMenu
    :items="[
      { label: 'Open', value: 'open' },
      { label: 'Rename', value: 'rename' },
      { separator: true },
      { label: 'Delete', value: 'delete', danger: true },
    ]"
    @select="(value) => console.log(value)"
  >
    <div
      class="rounded-lg border border-dashed border-line p-8 text-sm text-muted"
    >
      Right-click here
    </div>
  </ContextMenu>
</template>
```

## Notes

- Attributes and `class` go to the trigger area, which is focusable. Shift+F10 or the ContextMenu key opens the menu from the keyboard.
- When `value` is empty, the callback receives the item `label`.
- The menu renders in the top layer through the Popover API and stays inside the viewport near the edges.
- `menuLabel` and `hintLabel` default to English. Translate them for other languages.
