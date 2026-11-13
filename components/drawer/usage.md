## Blade

```blade
<x-markas.drawer title="Filter products">
    <x-slot:trigger>
        <x-markas.button variant="secondary">Open filters</x-markas.button>
    </x-slot:trigger>

    Choose a category and price range to filter the product list.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
        <x-markas.button type="submit" value="apply">Apply</x-markas.button>
    </x-slot:footer>
</x-markas.drawer>
```

Needs Alpine.js. Livewire 3 already ships it.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Drawer } from "@/components/markas/Drawer";

<Drawer
  title="Filter products"
  trigger={<Button variant="secondary">Open filters</Button>}
  footer={
    <>
      <Button variant="secondary" type="submit" value="cancel">
        Cancel
      </Button>
      <Button type="submit" value="apply">
        Apply
      </Button>
    </>
  }
  onClose={(e) => console.log(e.currentTarget.returnValue)}
>
  Choose a category and price range to filter the product list.
</Drawer>;
```

## Vue

```vue
<template>
  <Drawer title="Filter products">
    <template #trigger>
      <Button variant="secondary">Open filters</Button>
    </template>

    Choose a category and price range to filter the product list.

    <template #footer>
      <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
      <Button type="submit" value="apply">Apply</Button>
    </template>
  </Drawer>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Drawer from "$lib/components/markas/Drawer.svelte";
</script>

<Drawer title="Filter products">
  {#snippet trigger()}
    <Button variant="secondary">Open filters</Button>
  {/snippet}

  Choose a category and price range to filter the product list.

  {#snippet footer()}
    <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
    <Button type="submit" value="apply">Apply</Button>
  {/snippet}
</Drawer>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Drawer from "@/components/markas/Drawer.astro";
---

<Drawer title="Filter products">
  <Button slot="trigger" variant="secondary">Open filters</Button>

  Choose a category and price range to filter the product list.

  <Fragment slot="footer">
    <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
    <Button type="submit" value="apply">Apply</Button>
  </Fragment>
</Drawer>
```

A small bundled script opens every drawer on the page. It also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Drawer } from "./markas/drawer.component";

@Component({
  selector: "app-filters",
  imports: [Button, Drawer],
  template: `
    <markas-drawer title="Filter products" (closed)="onClosed()">
      <button markas-button trigger variant="secondary">Open filters</button>

      Choose a category and price range to filter the product list.

      <ng-container footer>
        <button markas-button variant="secondary" type="submit" value="cancel">
          Cancel
        </button>
        <button markas-button type="submit" value="apply">Apply</button>
      </ng-container>
    </markas-drawer>
  `,
})
export class Filters {
  onClosed() {}
}
```

## Notes

- Use `side="left"` for a drawer from the left side.
- The `value` of the button that closed the drawer is available as `dialog.returnValue` in the `close` event.
- The close button is labelled "Close". Translate it with `closeLabel` (Blade: `close-label`).
