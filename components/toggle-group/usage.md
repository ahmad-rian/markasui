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

## Svelte

```svelte
<script lang="ts">
  import ToggleGroup from "$lib/components/markas/ToggleGroup.svelte";

  let view = $state("week");
</script>

{#snippet leftIcon()}
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h14" /></svg
  >
{/snippet}

<ToggleGroup
  bind:value={view}
  label="Calendar view"
  items={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>

<ToggleGroup
  label="Text alignment"
  value="left"
  items={[{ value: "left", label: leftIcon, ariaLabel: "Align left" }]}
/>
```

## Astro

```astro
---
import ToggleGroup from "@/components/markas/ToggleGroup.astro";
---

<ToggleGroup
  label="Calendar view"
  value="week"
  items={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>
```

Replace a label with an icon through a slot named after its value, such as `<Fragment slot="left">`. A small page script handles clicks and arrow keys.

## Angular

```ts
import { Component, signal } from "@angular/core";
import {
  ToggleGroup,
  ToggleGroupItemTemplate,
} from "./markas/toggle-group.component";

@Component({
  selector: "app-calendar",
  imports: [ToggleGroup, ToggleGroupItemTemplate],
  template: `
    <markas-toggle-group
      [(value)]="view"
      label="Calendar view"
      [items]="views"
    />
    <markas-toggle-group label="Text alignment" value="left" [items]="align">
      <ng-template markasToggleGroupItem="left">
        <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
      </ng-template>
    </markas-toggle-group>
  `,
})
export class Calendar {
  readonly view = signal<string | string[]>("week");
  readonly views = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];
  readonly align = [{ value: "left", label: "Left", ariaLabel: "Align left" }];
}
```

## Notes

- Single returns a string, empty when the pressed item is clicked again. Multiple returns an array in item order.
- Values become slot names in Blade, Vue, and Astro, so use only lowercase letters, digits, or underscores.
- The component has no built-in text. Pass `label` and the item labels in your site's language.
