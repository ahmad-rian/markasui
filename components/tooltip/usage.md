## Blade

```blade
<x-markas.tooltip content="Copy link to clipboard">
    <x-markas.button variant="secondary">Copy link</x-markas.button>
</x-markas.tooltip>
```

Needs Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Tooltip } from "@/components/markas/Tooltip";

<Tooltip content="Copy link to clipboard">
  <Button variant="secondary">Copy link</Button>
</Tooltip>;
```

## Vue

```vue
<template>
  <Tooltip content="Copy link to clipboard">
    <Button variant="secondary">Copy link</Button>
  </Tooltip>
</template>
```

## Notes

- The first element inside Tooltip automatically gets `aria-describedby` pointing to the tooltip.
- Use `side="bottom"` to show the tooltip below the trigger.
- Tooltip has no built-in text. Write `content` in the language of your site.
