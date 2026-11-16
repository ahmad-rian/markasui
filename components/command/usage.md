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

### Livewire

```blade
<x-markas.command hotkey :items="$commands" wire:markas-select="go($event.detail)" />
```

`wire:markas-select` calls a Livewire action with the picked value. The Ctrl+K listener is removed when the component leaves the page, so `wire:navigate` never stacks listeners.

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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Command from "$lib/components/markas/Command.svelte";

  const items = [
    { group: "Navigation", label: "Dashboard", href: "/dashboard" },
    { group: "Navigation", label: "Projects", href: "/projects" },
    {
      group: "Actions",
      label: "Create project",
      value: "create",
      shortcut: "Ctrl+N",
    },
    { group: "Actions", label: "Invite member", value: "invite" },
  ];
</script>

<Command hotkey {items} onselect={(value) => console.log(value)}>
  {#snippet trigger()}
    <Button variant="secondary">Search</Button>
  {/snippet}
</Command>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Command from "@/components/markas/Command.astro";

const items = [
  { group: "Navigation", label: "Dashboard", href: "/dashboard" },
  { group: "Navigation", label: "Projects", href: "/projects" },
  { group: "Actions", label: "Create project", value: "create", shortcut: "Ctrl+N" },
  { group: "Actions", label: "Invite member", value: "invite" },
];
---

<Command hotkey items={items}>
  <Button slot="trigger" variant="secondary">Search</Button>
</Command>

<script>
  document.addEventListener("markas-select", (event) => {
    console.log((event as CustomEvent<string>).detail);
  });
</script>
```

A small bundled script filters the list and handles the keyboard. Choosing a command dispatches a bubbling `markas-select` event with the value in `detail`.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Command } from "./markas/command.component";

@Component({
  selector: "app-launcher",
  imports: [Button, Command],
  template: `
    <markas-command hotkey [items]="items" (selected)="run($event)">
      <button markas-button trigger variant="secondary">Search</button>
    </markas-command>
  `,
})
export class Launcher {
  readonly items = [
    { group: "Navigation", label: "Dashboard", href: "/dashboard" },
    { group: "Navigation", label: "Projects", href: "/projects" },
    {
      group: "Actions",
      label: "Create project",
      value: "create",
      shortcut: "Ctrl+N",
    },
    { group: "Actions", label: "Invite member", value: "invite" },
  ];

  run(value: string) {}
}
```

## Notes

- The search is a case-insensitive match on the label. The search resets when the dialog closes.
- Items with `href` navigate like normal links and also call the select callback.
- Attributes and `class` go to the `dialog` element.
- `placeholderLabel`, `emptyLabel`, `searchLabel`, and `dialogLabel` default to English. Translate them for other languages.
