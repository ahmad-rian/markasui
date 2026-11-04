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

## Notes

- Replace the button content with the `trigger` slot (Blade and Vue) or the `trigger` prop (React). The chevron icon stays.
- When `value` is empty, the callback receives the item `label`.
- The menu panel renders in the top layer through the Popover API, so a parent with `overflow: hidden` never clips it.
- The trigger text defaults to "Options". Translate it with `label`.
