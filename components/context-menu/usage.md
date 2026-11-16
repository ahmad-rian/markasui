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

### Livewire

```blade
<x-markas.context-menu :items="$actions" wire:markas-select="run($event.detail)">
    ...
</x-markas.context-menu>
```

`wire:markas-select` calls a Livewire action with the picked value.

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

## Svelte

```svelte
<script lang="ts">
  import ContextMenu from "$lib/components/markas/ContextMenu.svelte";
</script>

<ContextMenu
  items={[
    { label: "Open", value: "open" },
    { label: "Rename", value: "rename" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
  onselect={(value) => console.log(value)}
>
  <div
    class="rounded-lg border border-dashed border-line p-8 text-sm text-muted"
  >
    Right-click here
  </div>
</ContextMenu>
```

## Astro

```astro
---
import ContextMenu from "@/components/markas/ContextMenu.astro";
---

<ContextMenu
  items={[
    { label: "Open", value: "open" },
    { label: "Rename", value: "rename" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
>
  <div class="rounded-lg border border-dashed border-line p-8 text-sm text-muted">
    Right-click here
  </div>
</ContextMenu>

<script>
  document.addEventListener("markas-select", (event) =>
    console.log((event as CustomEvent<string>).detail),
  );
</script>
```

A small bundled script runs every context menu on the page, also after view transitions. Selecting an item dispatches a bubbling `markas-select` event with the item value in `detail`.

## Angular

```ts
import { Component } from "@angular/core";
import { ContextMenu } from "./markas/context-menu.component";

@Component({
  selector: "app-file-card",
  imports: [ContextMenu],
  template: `
    <markas-context-menu [items]="items" (selected)="onSelect($event)">
      <div
        class="rounded-lg border border-dashed border-line p-8 text-sm text-muted"
      >
        Right-click here
      </div>
    </markas-context-menu>
  `,
})
export class FileCard {
  readonly items = [
    { label: "Open", value: "open" },
    { label: "Rename", value: "rename" },
    { separator: true as const },
    { label: "Delete", value: "delete", danger: true },
  ];

  onSelect(value: string) {}
}
```

## Notes

- Attributes and `class` go to the trigger area, which is focusable. Shift+F10 or the ContextMenu key opens the menu from the keyboard.
- When `value` is empty, the callback receives the item `label`.
- The menu renders in the top layer through the Popover API and stays inside the viewport near the edges.
- `menuLabel` and `hintLabel` default to English. Translate them for other languages.
