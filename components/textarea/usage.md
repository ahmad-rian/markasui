## Blade

```blade
<x-markas.textarea name="bio" label="Short bio" hint="Up to 200 characters." />
<x-markas.textarea name="address" label="Address" :rows="2" :value="old('address')" :error="$errors->first('address')" />
```

## React

```tsx
import { Textarea } from "@/components/markas/Textarea";

<Textarea name="bio" label="Short bio" hint="Up to 200 characters." />
<Textarea name="address" label="Address" rows={2} error={errors.address} />
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Textarea from "@/components/markas/Textarea.vue";

const bio = ref("");
</script>

<template>
  <Textarea
    v-model="bio"
    name="bio"
    label="Short bio"
    hint="Up to 200 characters."
  />
</template>
```

## Notes

- Extra attributes (`name`, `placeholder`, `maxlength`, `class`) go to the `<textarea>` element, not its wrapper.
- In Blade, pass the initial content through the `value` prop because textarea has no value attribute.
- The component has no built-in text. Every visible string comes from your props, so translate `label`, `hint`, and `error` directly.
