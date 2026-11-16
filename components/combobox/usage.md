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

### Livewire

```blade
<x-markas.combobox label="Country" wire:model.live="country" :options="$countries" />
```

`wire:model` binds the selected value (not the typed text) through `x-modelable`. Setting the property on the server shows the matching label. `.live` sends a request only when an option is picked or cleared, not on every keystroke.

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

## Svelte

```svelte
<script lang="ts">
  import Combobox from "$lib/components/markas/Combobox.svelte";

  let country = $state("id");
  const countries = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
  ];
</script>

<Combobox
  bind:value={country}
  name="country"
  label="Country"
  placeholder="Search countries"
  options={countries}
/>
```

## Astro

```astro
---
import Combobox from "@/components/markas/Combobox.astro";

const countries = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
];
---

<Combobox
  name="country"
  label="Country"
  placeholder="Search countries"
  value="id"
  options={countries}
/>
```

Options render on the server. A small bundled script (one custom element per combobox) filters, highlights, and positions the list. Changing the selection dispatches a bubbling `markas-change` event with the value in `event.detail`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Combobox } from "./markas/combobox.component";

@Component({
  selector: "app-address",
  imports: [Combobox],
  template: `
    <markas-combobox
      [(value)]="country"
      name="country"
      label="Country"
      placeholder="Search countries"
      [options]="countries"
    />
  `,
})
export class Address {
  readonly country = signal("id");
  readonly countries = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
  ];
}
```

## Notes

- Extra attributes (`placeholder`, `required`, `disabled`, `class`) go to the visible text input. `name` goes to a hidden input that holds the selected value, so the form sends `country=id`, not the label.
- Typing filters options by label and clears the selected value until an option is picked again.
- The list renders in the top layer through the Popover API, so a parent with `overflow: hidden` never clips it.
- Translate the empty state with `emptyLabel` (default "No results").
