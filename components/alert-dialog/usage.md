## Blade

```blade
<x-markas.alert-dialog title="Delete your account?" variant="danger" action-label="Delete account" x-on:markas-action="deleteAccount()">
    <x-slot:trigger>
        <x-markas.button variant="danger">Delete account</x-markas.button>
    </x-slot:trigger>

    All of your projects and invoices will be removed. You cannot undo this action.
</x-markas.alert-dialog>
```

Needs Alpine.js. Livewire 3 already ships it.

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

## Notes

- Unlike Modal, clicking the backdrop does not close the dialog. The user must choose cancel or the action; Escape counts as cancel.
- Focus starts on the cancel button.
- `dialog.returnValue` is `action` or `cancel` in the `close` event.
- The buttons read "Cancel" and "Continue" by default. Translate them with `cancelLabel` and `actionLabel` (Blade: `cancel-label`, `action-label`).
