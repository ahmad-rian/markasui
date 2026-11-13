## Blade

```blade
<x-markas.slider name="volume" label="Volume" :value="60" />
<x-markas.slider name="budget" label="Budget" :min="0" :max="500" :step="25" :value="250" />
```

Needs Alpine.js to update the fill and the value while dragging.

## React

```tsx
import { Slider } from "@/components/markas/Slider";

<Slider
  name="volume"
  label="Volume"
  defaultValue={60}
  onValueChange={(value) => console.log(value)}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Slider from "@/components/markas/Slider.vue";

const volume = ref(60);
</script>

<template>
  <Slider v-model="volume" name="volume" label="Volume" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Slider from "$lib/components/markas/Slider.svelte";

  let volume = $state(60);
</script>

<Slider bind:value={volume} name="volume" label="Volume" />
<Slider name="budget" label="Budget" max={500} step={25} value={250} />
```

## Astro

```astro
---
import Slider from "@/components/markas/Slider.astro";
---

<Slider name="volume" label="Volume" value={60} />
```

A small page script updates the fill and the value while dragging.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Slider } from "./markas/slider.component";

@Component({
  selector: "app-sound",
  imports: [Slider],
  template: `
    <markas-slider [(value)]="volume" name="volume" label="Volume" />
    <markas-slider
      name="budget"
      label="Budget"
      max="500"
      step="25"
      value="250"
    />
  `,
})
export class Sound {
  readonly volume = signal(60);
}
```

## Notes

- Slider is an `<input type="range">`, so its value is submitted with the form and the keyboard works natively.
- The fill comes from the CSS variable `--value` (a percentage) that the component updates on every input.
- Without a visible label, pass `aria-label` and set `showValue` to false if the number is not needed.
- The component has no built-in text. Translate `label` directly.
