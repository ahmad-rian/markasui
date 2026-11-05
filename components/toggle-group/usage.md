## Blade

```blade
<x-markas.toggle-group
    label="Calendar view"
    value="week"
    :items="[
        ['value' => 'day', 'label' => 'Day'],
        ['value' => 'week', 'label' => 'Week'],
        ['value' => 'month', 'label' => 'Month'],
    ]"
/>
```

Needs Alpine.js. Replace a label with an icon through a slot named after its value, such as `<x-slot:left>`, and pass `ariaLabel` in that item.

## React

```tsx
import { ToggleGroup } from "@/components/markas/ToggleGroup";

<ToggleGroup
  label="Calendar view"
  defaultValue="week"
  onValueChange={(value) => console.log(value)}
  items={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>;

<ToggleGroup
  type="multiple"
  label="Text style"
  defaultValue={["bold"]}
  items={[
    {
      value: "bold",
      label: <BoldIcon aria-hidden="true" />,
      ariaLabel: "Bold",
    },
    {
      value: "italic",
      label: <ItalicIcon aria-hidden="true" />,
      ariaLabel: "Italic",
    },
  ]}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import ToggleGroup from "@/components/markas/ToggleGroup.vue";

const view = ref("week");
</script>

<template>
  <ToggleGroup
    v-model="view"
    label="Calendar view"
    :items="[
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ]"
  />
</template>
```

## Notes

- Single returns a string, empty when the pressed item is clicked again. Multiple returns an array in item order.
- Values become slot names in Blade and Vue, so use only lowercase letters, digits, or underscores.
- The component has no built-in text. Pass `label` and the item labels in your site's language.
