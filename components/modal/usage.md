## Blade

```blade
<x-markas.modal title="Delete project?">
    <x-slot:trigger>
        <x-markas.button variant="danger">Delete</x-markas.button>
    </x-slot:trigger>

    The project and all of its data will be deleted permanently.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
        <x-markas.button variant="danger" type="submit" value="delete">Delete</x-markas.button>
    </x-slot:footer>
</x-markas.modal>
```

Needs Alpine.js. Livewire 3 and 4 already ship it.

### Livewire

```blade
<x-markas.modal title="Edit profile" wire:model="showEdit">
    ...
</x-markas.modal>
```

`wire:model` binds the open state: set `$showEdit = true` in an action to open the dialog, `false` to close it. Closing with Escape, the close button, or the backdrop sets it back to `false`. The dialog keeps its open state across re-renders.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Modal } from "@/components/markas/Modal";

<Modal
  title="Delete project?"
  trigger={<Button variant="danger">Delete</Button>}
  footer={
    <>
      <Button variant="secondary" type="submit" value="cancel">
        Cancel
      </Button>
      <Button variant="danger" type="submit" value="delete">
        Delete
      </Button>
    </>
  }
  onClose={(e) => console.log(e.currentTarget.returnValue)}
>
  The project and all of its data will be deleted permanently.
</Modal>;
```

## Vue

```vue
<template>
  <Modal title="Delete project?">
    <template #trigger>
      <Button variant="danger">Delete</Button>
    </template>

    The project and all of its data will be deleted permanently.

    <template #footer>
      <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
      <Button variant="danger" type="submit" value="delete">Delete</Button>
    </template>
  </Modal>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Modal from "$lib/components/markas/Modal.svelte";
</script>

<Modal
  title="Delete project?"
  onclose={(e) => console.log(e.currentTarget.returnValue)}
>
  {#snippet trigger()}
    <Button variant="danger">Delete</Button>
  {/snippet}

  The project and all of its data will be deleted permanently.

  {#snippet footer()}
    <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
    <Button variant="danger" type="submit" value="delete">Delete</Button>
  {/snippet}
</Modal>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Modal from "@/components/markas/Modal.astro";
---

<Modal title="Delete project?">
  <Button slot="trigger" variant="danger">Delete</Button>

  The project and all of its data will be deleted permanently.

  <Fragment slot="footer">
    <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
    <Button variant="danger" type="submit" value="delete">Delete</Button>
  </Fragment>
</Modal>
```

A small bundled script opens every modal on the page. It also works after view transitions.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Modal } from "./markas/modal.component";

@Component({
  selector: "app-danger-zone",
  imports: [Button, Modal],
  template: `
    <markas-modal title="Delete project?" (closed)="onClosed()">
      <button markas-button trigger variant="danger">Delete</button>

      The project and all of its data will be deleted permanently.

      <ng-container footer>
        <button markas-button variant="secondary" type="submit" value="cancel">
          Cancel
        </button>
        <button markas-button variant="danger" type="submit" value="delete">
          Delete
        </button>
      </ng-container>
    </markas-modal>
  `,
})
export class DangerZone {
  onClosed() {}
}
```

## Notes

- The `value` of the button that closed the modal is available as `dialog.returnValue` in the `close` event.
- To open the modal from code, call `document.getElementById(id).showModal()`.
- The close button is labelled "Close". Translate it with `closeLabel` (Blade: `close-label`).
