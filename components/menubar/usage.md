## Blade

```blade
<x-markas.menubar
    :menus="[
        ['label' => 'File', 'items' => [
            ['label' => 'New file', 'value' => 'new'],
            ['label' => 'Save', 'value' => 'save'],
        ]],
        ['label' => 'Edit', 'items' => [
            ['label' => 'Undo', 'value' => 'undo'],
            ['separator' => true],
            ['label' => 'Delete', 'value' => 'delete', 'danger' => true],
        ]],
        ['label' => 'Help', 'items' => [
            ['label' => 'Documentation', 'href' => '/docs'],
        ]],
    ]"
    x-on:markas-select="console.log($event.detail)"
/>
```

Needs Alpine.js. Selecting an item dispatches a `markas-select` event with the item value in `$event.detail`. In Livewire: `x-on:markas-select="$wire.handle($event.detail)"`.

## React

```tsx
import { Menubar } from "@/components/markas/Menubar";

<Menubar
  menus={[
    {
      label: "File",
      items: [
        { label: "New file", value: "new" },
        { label: "Save", value: "save" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", value: "undo" },
        { separator: true },
        { label: "Delete", value: "delete", danger: true },
      ],
    },
    { label: "Help", items: [{ label: "Documentation", href: "/docs" }] },
  ]}
  onSelect={(value) => console.log(value)}
/>;
```

## Vue

```vue
<template>
  <Menubar
    :menus="[
      {
        label: 'File',
        items: [
          { label: 'New file', value: 'new' },
          { label: 'Save', value: 'save' },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', value: 'undo' },
          { separator: true },
          { label: 'Delete', value: 'delete', danger: true },
        ],
      },
      { label: 'Help', items: [{ label: 'Documentation', href: '/docs' }] },
    ]"
    @select="(value) => console.log(value)"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Menubar, {
    type MenubarMenu,
  } from "$lib/components/markas/Menubar.svelte";

  const menus: MenubarMenu[] = [
    {
      label: "File",
      items: [
        { label: "New file", value: "new" },
        { label: "Save", value: "save" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", value: "undo" },
        { separator: true },
        { label: "Delete", value: "delete", danger: true },
      ],
    },
    { label: "Help", items: [{ label: "Documentation", href: "/docs" }] },
  ];
</script>

<Menubar {menus} onselect={(value) => console.log(value)} />
```

## Astro

```astro
---
import Menubar from "@/components/markas/Menubar.astro";
---

<Menubar
  id="app-menu"
  menus={[
    {
      label: "File",
      items: [
        { label: "New file", value: "new" },
        { label: "Save", value: "save" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", value: "undo" },
        { separator: true },
        { label: "Delete", value: "delete", danger: true },
      ],
    },
    { label: "Help", items: [{ label: "Documentation", href: "/docs" }] },
  ]}
/>

<script>
  document
    .getElementById("app-menu")
    ?.addEventListener("markas-select", (event) =>
      console.log((event as CustomEvent<string>).detail),
    );
</script>
```

A small bundled script powers every menubar on the page, also after view transitions. Selecting an item dispatches a bubbling `markas-select` event with the value in `detail`, like Blade.

## Angular

```ts
import { Component } from "@angular/core";
import { Menubar, type MenubarMenu } from "./markas/menubar.component";

@Component({
  selector: "app-editor-menu",
  imports: [Menubar],
  template: `
    <markas-menubar [menus]="menus" (selected)="onSelected($event)" />
  `,
})
export class EditorMenu {
  protected readonly menus: MenubarMenu[] = [
    {
      label: "File",
      items: [
        { label: "New file", value: "new" },
        { label: "Save", value: "save" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", value: "undo" },
        { separator: true },
        { label: "Delete", value: "delete", danger: true },
      ],
    },
    { label: "Help", items: [{ label: "Documentation", href: "/docs" }] },
  ];

  protected onSelected(value: string) {
    console.log(value);
  }
}
```

## Notes

- Menu items take the same shape as Dropdown Menu items: `value`, `href`, `danger`, `disabled`, or `{ separator: true }`.
- When `value` is empty, the callback receives the item `label`.
- Menus render in the top layer through the Popover API, so a parent with `overflow: hidden` never clips them. Only one menu is open at a time.
- The bar's accessible name defaults to "Menu". Translate it with `label`.
