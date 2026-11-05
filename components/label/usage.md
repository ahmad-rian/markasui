## Blade

```blade
<x-markas.label for="full_name" required>Full name</x-markas.label>
<input id="full_name" name="full_name" required />

<x-markas.label for="company" optional>Company</x-markas.label>
<input id="company" name="company" />
```

## React

```tsx
import { Label } from "@/components/markas/Label";

<Label htmlFor="full_name" required>Full name</Label>
<input id="full_name" name="full_name" required />

<Label htmlFor="company" optional>Company</Label>
<input id="company" name="company" />
```

## Vue

```vue
<script setup lang="ts">
import Label from "@/components/markas/Label.vue";
</script>

<template>
  <Label for="full_name" required>Full name</Label>
  <input id="full_name" name="full_name" required />

  <Label for="company" optional>Company</Label>
  <input id="company" name="company" />
</template>
```

## Notes

- Label needs no JavaScript. Extra attributes and `class` go to the `<label>` element, and your classes come last.
- You can also wrap a checkbox or radio inside the label instead of using `for`: `<Label class="flex items-center gap-2"><input type="checkbox" />Remember me</Label>`.
- The asterisk is hidden from screen readers. They hear "Full name required" instead, from `requiredLabel`. When both `required` and `optional` are set, `required` wins.
- Translate the built-in text with `requiredLabel` (default "required") and `optionalLabel` (default "Optional").
