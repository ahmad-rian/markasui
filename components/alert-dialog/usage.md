## Blade

```blade
<x-markas.alert-dialog title="Delete your account?" variant="danger" action-label="Delete account" x-on:markas-action="deleteAccount()">
    <x-slot:trigger>
        <x-markas.button variant="danger">Delete account</x-markas.button>
    </x-slot:trigger>

    All of your projects and invoices will be removed. You cannot undo this action.
</x-markas.alert-dialog>
```

Needs Alpine.js. Livewire 3 and 4 already ship it.

### Livewire

```blade
<x-markas.alert-dialog title="Delete project?" wire:model="confirming" wire:markas-action="delete">
    This cannot be undone.
</x-markas.alert-dialog>
```

`wire:model` binds the open state. `wire:markas-action` runs a Livewire action when the action button is pressed; `wire:markas-cancel` for any other close.

## React

```tsx
import { AlertDialog } from "@/components/markas/AlertDialog";
import { Button } from "@/components/markas/Button";

<AlertDialog
  title="Delete your account?"
  variant="danger"
  actionLabel="Delete account"
  trigger={<Button variant="danger">Delete account</Button>}
  onAction={() => deleteAccount()}
  onCancel={() => console.log("kept")}
>
  All of your projects and invoices will be removed. You cannot undo this
  action.
</AlertDialog>;
```

## Vue

```vue
<template>
  <AlertDialog
    title="Delete your account?"
    variant="danger"
    action-label="Delete account"
    @action="deleteAccount"
  >
    <template #trigger>
      <Button variant="danger">Delete account</Button>
    </template>

    All of your projects and invoices will be removed. You cannot undo this
    action.
  </AlertDialog>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import AlertDialog from "$lib/components/markas/AlertDialog.svelte";
  import Button from "$lib/components/markas/Button.svelte";
</script>

<AlertDialog
  title="Delete your account?"
  variant="danger"
  actionLabel="Delete account"
  onaction={deleteAccount}
>
  {#snippet trigger()}
    <Button variant="danger">Delete account</Button>
  {/snippet}

  All of your projects and invoices will be removed. You cannot undo this
  action.
</AlertDialog>
```

## Astro

```astro
---
import AlertDialog from "@/components/markas/AlertDialog.astro";
import Button from "@/components/markas/Button.astro";
---

<AlertDialog
  title="Delete your account?"
  variant="danger"
  actionLabel="Delete account"
>
  <Button slot="trigger" variant="danger">Delete account</Button>

  All of your projects and invoices will be removed. You cannot undo this
  action.
</AlertDialog>
```

A small bundled script opens every alert dialog on the page and dispatches a bubbling `markas-action` or `markas-cancel` event from the dialog when it closes.

## Angular

```ts
import { Component } from "@angular/core";
import { AlertDialog } from "./markas/alert-dialog.component";
import { Button } from "./markas/button.component";

@Component({
  selector: "app-delete-account",
  imports: [AlertDialog, Button],
  template: `
    <markas-alert-dialog
      title="Delete your account?"
      variant="danger"
      actionLabel="Delete account"
      (action)="deleteAccount()"
    >
      <button markas-button trigger variant="danger">Delete account</button>

      All of your projects and invoices will be removed. You cannot undo this
      action.
    </markas-alert-dialog>
  `,
})
export class DeleteAccount {
  deleteAccount() {}
}
```

## Notes

- Unlike Modal, clicking the backdrop does not close the dialog. The user must choose cancel or the action; Escape counts as cancel.
- Focus starts on the cancel button.
- `dialog.returnValue` is `action` or `cancel` in the `close` event.
- The buttons read "Cancel" and "Continue" by default. Translate them with `cancelLabel` and `actionLabel` (Blade: `cancel-label`, `action-label`).
