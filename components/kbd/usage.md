## Blade

```blade
<x-markas.kbd>Esc</x-markas.kbd>
<x-markas.kbd :keys="['Ctrl', 'K']" />
<x-markas.kbd size="sm" :keys="['G', 'N']" separator="then" />
```

## React

```tsx
import { Kbd } from "@/components/markas/Kbd";

<Kbd>Esc</Kbd>
<Kbd keys={["Ctrl", "K"]} />
<Kbd size="sm" keys={["G", "N"]} separator="then" />
```

## Vue

```vue
<template>
  <Kbd>Esc</Kbd>
  <Kbd :keys="['Ctrl', 'K']" />
  <Kbd size="sm" :keys="['G', 'N']" separator="then" />
</template>
```

## Notes

- No JavaScript needed. The Blade version does not need Alpine.js.
- `keys` renders `<kbd><kbd>Ctrl</kbd><span>+</span><kbd>K</kbd></kbd>`. Without `keys`, the slot or children fill a single keycap.
- Inside a button that already has a name, add `aria-hidden="true"` so the shortcut is not read twice.
- The default separator is "+". Change it with `separator`, for example "then" for key sequences.
