## Blade

```blade
<x-markas.combobox
    name="country"
    label="Country"
    placeholder="Search countries"
    :value="old('country', 'id')"
    :options="[
        ['value' => 'au', 'label' => 'Australia'],
        ['value' => 'id', 'label' => 'Indonesia'],
        ['value' => 'jp', 'label' => 'Japan'],
    ]"
    :error="$errors->first('country')"
    x-on:markas-change="console.log($event.detail)"
/>
```

Needs Alpine.js. Changing the selection dispatches a `markas-change` event with the value in `$event.detail` (an empty string when cleared).

## React

```tsx
import { useState } from "react";
import { Combobox } from "@/components/markas/Combobox";

const [country, setCountry] = useState("id");

<Combobox
  name="country"
  label="Country"
  placeholder="Search countries"
  options={[
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
  ]}
  value={country}
  onValueChange={setCountry}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Combobox from "@/components/markas/Combobox.vue";

const country = ref("id");
const countries = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
];
</script>

<template>
  <Combobox
    v-model="country"
    name="country"
    label="Country"
    placeholder="Search countries"
    :options="countries"
  />
</template>
```

## Notes

- Extra attributes (`placeholder`, `required`, `disabled`, `class`) go to the visible text input. `name` goes to a hidden input that holds the selected value, so the form sends `country=id`, not the label.
- Typing filters options by label and clears the selected value until an option is picked again.
- The list renders in the top layer through the Popover API, so a parent with `overflow: hidden` never clips it.
- Translate the empty state with `emptyLabel` (default "No results").
