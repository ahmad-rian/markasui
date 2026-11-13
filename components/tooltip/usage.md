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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Tooltip from "$lib/components/markas/Tooltip.svelte";
</script>

<Tooltip content="Copy link to clipboard">
  <Button variant="secondary">Copy link</Button>
</Tooltip>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Tooltip from "@/components/markas/Tooltip.astro";
---

<Tooltip content="Copy link to clipboard">
  <Button variant="secondary">Copy link</Button>
</Tooltip>
```

Each tooltip is wrapped in a `markas-tooltip` custom element with `display: contents`, so it also works for markup added later and after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Tooltip } from "./markas/tooltip.component";

@Component({
  selector: "app-share",
  imports: [Button, Tooltip],
  template: `
    <markas-tooltip content="Copy link to clipboard">
      <button markas-button variant="secondary">Copy link</button>
    </markas-tooltip>
  `,
})
export class Share {}
```

## Notes

- The first element inside Tooltip automatically gets `aria-describedby` pointing to the tooltip.
- Use `side="bottom"` to show the tooltip below the trigger.
- Tooltip has no built-in text. Write `content` in the language of your site.
