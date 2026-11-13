## Blade

```blade
<x-markas.tabs :items="['account' => 'Account', 'password' => 'Password']" default-value="account">
    <x-slot:account>Change your account name and email.</x-slot:account>
    <x-slot:password>Change your password regularly.</x-slot:password>
</x-markas.tabs>
```

Needs Alpine.js.

## React

```tsx
import { Tabs } from "@/components/markas/Tabs";

<Tabs
  defaultValue="account"
  items={[
    {
      value: "account",
      label: "Account",
      content: "Change your account name and email.",
    },
    {
      value: "password",
      label: "Password",
      content: "Change your password regularly.",
    },
  ]}
/>;
```

## Vue

```vue
<template>
  <Tabs
    default-value="account"
    :items="[
      { value: 'account', label: 'Account' },
      { value: 'password', label: 'Password' },
    ]"
  >
    <template #account>Change your account name and email.</template>
    <template #password>Change your password regularly.</template>
  </Tabs>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Tabs from "$lib/components/markas/Tabs.svelte";

  let active = $state("account");
  const items = [
    { value: "account", label: "Account", content: account },
    {
      value: "password",
      label: "Password",
      content: "Change your password regularly.",
    },
  ];
</script>

{#snippet account()}
  <p>Change your account name and <strong>email</strong>.</p>
{/snippet}

<Tabs {items} bind:value={active} />
```

`content` is plain text or a snippet declared at the top level of the template.

## Astro

```astro
---
import Tabs from "@/components/markas/Tabs.astro";

const items = [
  { value: "account", label: "Account" },
  { value: "password", label: "Password" },
];
---

<Tabs items={items} defaultValue="account">
  <Fragment slot="account">Change your account name and email.</Fragment>
  <Fragment slot="password">Change your password regularly.</Fragment>
</Tabs>
```

A small client script handles clicks and the arrow keys. The selected tab dispatches a bubbling `markas-change` event with its value as `detail`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { TabPanel, Tabs } from "./markas/tabs.component";

@Component({
  selector: "app-settings",
  imports: [Tabs, TabPanel],
  template: `
    <markas-tabs [items]="items" [(value)]="active">
      <ng-template markasTabPanel="account">
        Change your account name and email.
      </ng-template>
      <ng-template markasTabPanel="password">
        Change your password regularly.
      </ng-template>
    </markas-tabs>
  `,
})
export class Settings {
  readonly active = signal("account");
  readonly items = [
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
  ];
}
```

Each panel is an `<ng-template markasTabPanel="value">`, so its content is only created when Angular renders that panel.

## Notes

- Tab keys become ids and slot names, so use only lowercase letters, digits, or underscores.
- Tabs has no built-in text. Tab labels come from `items`, so pass them in your site's language.
