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

## Notes

- Tab keys become ids and slot names, so use only lowercase letters, digits, or underscores.
- Tabs has no built-in text. Tab labels come from `items`, so pass them in your site's language.
