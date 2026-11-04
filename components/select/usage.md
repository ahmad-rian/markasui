## Blade

```blade
<x-markas.select name="city" label="City" hint="Choose your city.">
    <option value="jakarta">Jakarta</option>
    <option value="bandung" @selected(old('city') === 'bandung')>Bandung</option>
</x-markas.select>
```

## React

```tsx
import { Select } from "@/components/markas/Select";

<Select name="city" label="City" defaultValue="bandung">
  <option value="jakarta">Jakarta</option>
  <option value="bandung">Bandung</option>
</Select>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Select from "@/components/markas/Select.vue";

const city = ref("bandung");
</script>

<template>
  <Select v-model="city" name="city" label="City">
    <option value="jakarta">Jakarta</option>
    <option value="bandung">Bandung</option>
  </Select>
</template>
```

## Notes

- Extra attributes (`name`, `required`, `multiple`, `class`) go to the `<select>` element.
- Without `v-model`, the Vue version selects the option marked `selected`, or the first option, just like Blade and React.
- The component has no built-in text. Every visible string comes from your props and options, so translate them directly.
