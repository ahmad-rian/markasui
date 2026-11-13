## Blade

```blade
<x-markas.flip-button back-label="It takes 2 minutes">Create account</x-markas.flip-button>

<x-markas.flip-button size="lg">
    Download report
    <x-slot:back>PDF, 2.4 MB</x-slot:back>
</x-markas.flip-button>
```

## React

```tsx
import { FlipButton } from "@/components/markas/FlipButton";

<FlipButton backLabel="It takes 2 minutes">Create account</FlipButton>
<FlipButton size="lg" backLabel={<>PDF, 2.4 MB</>}>Download report</FlipButton>
```

## Vue

```vue
<script setup lang="ts">
import FlipButton from "@/components/markas/FlipButton.vue";
</script>

<template>
  <FlipButton back-label="It takes 2 minutes">Create account</FlipButton>
  <FlipButton size="lg">
    Download report
    <template #back>PDF, 2.4 MB</template>
  </FlipButton>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import FlipButton from "$lib/components/markas/FlipButton.svelte";
</script>

<FlipButton backLabel="It takes 2 minutes">Create account</FlipButton>
<FlipButton size="lg">
  Download report
  {#snippet back()}PDF, 2.4 MB{/snippet}
</FlipButton>
```

## Astro

```astro
---
import FlipButton from "@/components/markas/FlipButton.astro";
---

<FlipButton backLabel="It takes 2 minutes">Create account</FlipButton>
<FlipButton size="lg">
  Download report
  <Fragment slot="back">PDF, 2.4 MB</Fragment>
</FlipButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { FlipButton } from "./markas/flip-button.component";

@Component({
  selector: "app-signup",
  imports: [FlipButton],
  template: `
    <button markas-flip-button backLabel="It takes 2 minutes">
      Create account
    </button>
    <button markas-flip-button size="lg">
      Download report
      <ng-container back>PDF, 2.4 MB</ng-container>
    </button>
  `,
})
export class Signup {}
```

Angular uses an attribute selector on the native button. Without `backLabel` or a `back` element, the back face gets a copy of the label after the first render.

## Notes

- Pure CSS: no JavaScript and no Alpine.js. The flip runs on hover and on keyboard focus.
- The back face is aria-hidden. Screen readers only read the front label.
- Touch devices have no hover, so never put required information only on the back.
