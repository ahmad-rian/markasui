## Blade

```blade
<x-markas.popover label="Share">
    <div class="grid gap-3">
        <p class="text-muted">Anyone with the link can view this project.</p>
        <x-markas.button size="sm">Copy link</x-markas.button>
    </div>
</x-markas.popover>
```

Needs Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Popover } from "@/components/markas/Popover";

<Popover label="Share" align="end">
  <div className="grid gap-3">
    <p className="text-muted">Anyone with the link can view this project.</p>
    <Button size="sm">Copy link</Button>
  </div>
</Popover>;
```

## Vue

```vue
<template>
  <Popover label="Share" side="top">
    <div class="grid gap-3">
      <p class="text-muted">Anyone with the link can view this project.</p>
      <Button size="sm">Copy link</Button>
    </div>
  </Popover>
</template>
```

## Notes

- The panel opens below the trigger aligned to its start edge. Change it with `side` (`top`, `bottom`) and `align` (`start`, `center`, `end`).
- Use the `trigger` slot for an icon trigger and include sr-only text, for example `<span class="sr-only">Notification settings</span>`.
- The trigger reads "Open" by default. Set `label` in the language of your site.
