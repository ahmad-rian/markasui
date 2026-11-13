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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Popover from "$lib/components/markas/Popover.svelte";
</script>

<Popover label="Share" align="end">
  <div class="grid gap-3">
    <p class="text-muted">Anyone with the link can view this project.</p>
    <Button size="sm">Copy link</Button>
  </div>
</Popover>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Popover from "@/components/markas/Popover.astro";
---

<Popover label="Share" align="end">
  <div class="grid gap-3">
    <p class="text-muted">Anyone with the link can view this project.</p>
    <Button size="sm">Copy link</Button>
  </div>
</Popover>
```

A small bundled script places every popover on the page. It also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Popover } from "./markas/popover.component";

@Component({
  selector: "app-share",
  imports: [Button, Popover],
  template: `
    <markas-popover label="Share" align="end">
      <div class="grid gap-3">
        <p class="text-muted">Anyone with the link can view this project.</p>
        <button markas-button size="sm">Copy link</button>
      </div>
    </markas-popover>
  `,
})
export class Share {}
```

For an icon trigger, put the icon and sr-only text in an element with the `trigger` attribute, for example `<ng-container trigger>`.

## Notes

- The panel opens below the trigger aligned to its start edge. Change it with `side` (`top`, `bottom`) and `align` (`start`, `center`, `end`).
- Use the `trigger` slot for an icon trigger and include sr-only text, for example `<span class="sr-only">Notification settings</span>`.
- The trigger reads "Open" by default. Set `label` in the language of your site.
