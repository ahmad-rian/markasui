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

Needs Alpine.js. Livewire 3 already ships it.

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

## Notes

- The `value` of the button that closed the modal is available as `dialog.returnValue` in the `close` event.
- To open the modal from code, call `document.getElementById(id).showModal()`.
- The close button is labelled "Close". Translate it with `closeLabel` (Blade: `close-label`).
