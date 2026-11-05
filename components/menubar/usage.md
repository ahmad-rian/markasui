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

## Notes

- Menu items take the same shape as Dropdown Menu items: `value`, `href`, `danger`, `disabled`, or `{ separator: true }`.
- When `value` is empty, the callback receives the item `label`.
- Menus render in the top layer through the Popover API, so a parent with `overflow: hidden` never clips them. Only one menu is open at a time.
- The bar's accessible name defaults to "Menu". Translate it with `label`.
