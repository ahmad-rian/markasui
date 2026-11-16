## Blade

```blade
<x-markas.dropdown-menu
    label="Actions"
    :items="[
        ['label' => 'Edit', 'value' => 'edit'],
        ['label' => 'View details', 'href' => '/projects/1'],
        ['separator' => true],
        ['label' => 'Delete', 'value' => 'delete', 'danger' => true],
    ]"
    x-on:markas-select="console.log($event.detail)"
/>
```

Needs Alpine.js. Selecting an item dispatches a `markas-select` event with the item value in `$event.detail`. In Livewire: `x-on:markas-select="$wire.handle($event.detail)"`.

### Livewire

```blade
<x-markas.dropdown-menu label="Actions" :items="$actions" wire:markas-select="run($event.detail)" />
```

Picking an item dispatches `markas-select` with the value; `wire:markas-select` calls a Livewire action with it. The open menu keeps its position across re-renders.

## React

```tsx
import { DropdownMenu } from "@/components/markas/DropdownMenu";

<DropdownMenu
  label="Actions"
  items={[
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
  onSelect={(value) => console.log(value)}
/>;
```

## Vue

```vue
<template>
  <DropdownMenu
    label="Actions"
    :items="[
      { label: 'Edit', value: 'edit' },
      { label: 'View details', href: '/projects/1' },
      { separator: true },
      { label: 'Delete', value: 'delete', danger: true },
    ]"
    @select="(value) => console.log(value)"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import DropdownMenu from "$lib/components/markas/DropdownMenu.svelte";
</script>

<DropdownMenu
  label="Actions"
  items={[
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
  onselect={(value) => console.log(value)}
/>
```

## Astro

```astro
---
import DropdownMenu from "@/components/markas/DropdownMenu.astro";
---

<DropdownMenu
  label="Actions"
  items={[
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
/>

<script>
  document.addEventListener("markas-select", (event) =>
    console.log((event as CustomEvent<string>).detail),
  );
</script>
```

A small bundled script runs every dropdown menu on the page, also after view transitions. Selecting an item dispatches a bubbling `markas-select` event with the item value in `detail`.

## Angular

```ts
import { Component } from "@angular/core";
import { DropdownMenu } from "./markas/dropdown-menu.component";

@Component({
  selector: "app-project-actions",
  imports: [DropdownMenu],
  template: `
    <markas-dropdown-menu
      label="Actions"
      [items]="items"
      (selected)="onSelect($event)"
    />
  `,
})
export class ProjectActions {
  readonly items = [
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true as const },
    { label: "Delete", value: "delete", danger: true },
  ];

  onSelect(value: string) {}
}
```

The trigger content can be replaced with an element that has the `trigger` attribute (an `ng-container` works).

## Notes

- Replace the button content with the `trigger` slot (Blade and Vue) or the `trigger` prop (React). The chevron icon stays.
- When `value` is empty, the callback receives the item `label`.
- The menu panel renders in the top layer through the Popover API, so a parent with `overflow: hidden` never clips it.
- The trigger text defaults to "Options". Translate it with `label`.
