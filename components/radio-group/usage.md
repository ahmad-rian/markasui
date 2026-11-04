## Blade

```blade
<x-markas.radio-group
    name="plan"
    label="Subscription plan"
    :value="old('plan', 'pro')"
    :options="[
        ['value' => 'free', 'label' => 'Free', 'description' => 'For personal projects.'],
        ['value' => 'pro', 'label' => 'Pro'],
    ]"
/>
```

## React

```tsx
import { RadioGroup } from "@/components/markas/RadioGroup";

<RadioGroup
  name="plan"
  label="Subscription plan"
  defaultValue="pro"
  onValueChange={(value) => console.log(value)}
  options={[
    { value: "free", label: "Free", description: "For personal projects." },
    { value: "pro", label: "Pro" },
  ]}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "@/components/markas/RadioGroup.vue";

const plan = ref("pro");
</script>

<template>
  <RadioGroup
    v-model="plan"
    name="plan"
    label="Subscription plan"
    :options="[
      { value: 'free', label: 'Free', description: 'For personal projects.' },
      { value: 'pro', label: 'Pro' },
    ]"
  />
</template>
```

## Notes

- Extra attributes (`class`, `disabled`, `aria-*`) fall through to the `<fieldset>`. `disabled` on the fieldset disables every radio at once.
- Option values are used in ids, so stick to lowercase letters, digits, hyphens, or underscores.
- Use `orientation="horizontal"` for short options laid out in a row.
- The component has no built-in text. Translate `label` and each option's `label` and `description` directly.
