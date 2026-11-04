## Blade

```blade
<x-markas.card title="Pro plan" description="For small teams that are growing.">
    Includes 10 team members and 50 GB of storage.

    <x-slot:footer>
        <x-markas.button size="sm">Choose plan</x-markas.button>
    </x-slot:footer>
</x-markas.card>
```

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Card } from "@/components/markas/Card";

<Card
  title="Pro plan"
  description="For small teams that are growing."
  footer={<Button size="sm">Choose plan</Button>}
>
  Includes 10 team members and 50 GB of storage.
</Card>;
```

## Vue

```vue
<template>
  <Card title="Pro plan" description="For small teams that are growing.">
    Includes 10 team members and 50 GB of storage.

    <template #footer>
      <Button size="sm">Choose plan</Button>
    </template>
  </Card>
</template>
```

## Notes

- Every part is optional. Empty parts are not rendered, so the spacing stays even.
- Extra classes (such as `max-w-sm`) are merged last and land on the `<article>` element.
- Card has no built-in text. All text comes from your props and slots, so it works in any language as is.
