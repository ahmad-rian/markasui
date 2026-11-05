## Blade

```blade
<x-markas.command
    hotkey
    :items="[
        ['group' => 'Navigation', 'label' => 'Dashboard', 'href' => '/dashboard'],
        ['group' => 'Navigation', 'label' => 'Projects', 'href' => '/projects'],
        ['group' => 'Actions', 'label' => 'Create project', 'value' => 'create', 'shortcut' => 'Ctrl+N'],
        ['group' => 'Actions', 'label' => 'Invite member', 'value' => 'invite'],
    ]"
    x-on:markas-select="console.log($event.detail)"
>
    <x-slot:trigger>
        <x-markas.button variant="secondary">Search</x-markas.button>
    </x-slot:trigger>
</x-markas.command>
```

Needs Alpine.js. Choosing a command dispatches a `markas-select` event with the value in `$event.detail`. In Livewire: `x-on:markas-select="$wire.run($event.detail)"`.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Command } from "@/components/markas/Command";

<Command
  hotkey
  trigger={<Button variant="secondary">Search</Button>}
  items={[
    { group: "Navigation", label: "Dashboard", href: "/dashboard" },
    { group: "Navigation", label: "Projects", href: "/projects" },
    {
      group: "Actions",
      label: "Create project",
      value: "create",
      shortcut: "Ctrl+N",
    },
    { group: "Actions", label: "Invite member", value: "invite" },
  ]}
  onSelect={(value) => console.log(value)}
/>;
```

## Vue

```vue
<template>
  <Command
    hotkey
    :items="[
      { group: 'Navigation', label: 'Dashboard', href: '/dashboard' },
      { group: 'Navigation', label: 'Projects', href: '/projects' },
      {
        group: 'Actions',
        label: 'Create project',
        value: 'create',
        shortcut: 'Ctrl+N',
      },
      { group: 'Actions', label: 'Invite member', value: 'invite' },
    ]"
    @select="(value) => console.log(value)"
  >
    <template #trigger>
      <Button variant="secondary">Search</Button>
    </template>
  </Command>
</template>
```

## Notes

- The search is a case-insensitive match on the label. The search resets when the dialog closes.
- Items with `href` navigate like normal links and also call the select callback.
- Attributes and `class` go to the `dialog` element.
- `placeholderLabel`, `emptyLabel`, `searchLabel`, and `dialogLabel` default to English. Translate them for other languages.
