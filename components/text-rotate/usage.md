## Blade

```blade
<h1 class="text-4xl font-semibold">
    Build for
    <x-markas.text-rotate :words="['Laravel', 'React', 'Vue']" />
</h1>
<x-markas.text-rotate :words="['faster', 'with confidence', 'every Friday']" split="words" from="center" :interval="3000" />
```

## React

```tsx
import { TextRotate } from "@/components/markas/TextRotate";

<h1 className="text-4xl font-semibold">
  Build for <TextRotate words={["Laravel", "React", "Vue"]} />
</h1>
<TextRotate words={['faster', 'with confidence', 'every Friday']} split="words" from="center" interval={3000} />
```

## Vue

```vue
<template>
  <h1 class="text-4xl font-semibold">
    Build for
    <TextRotate :words="['Laravel', 'React', 'Vue']" />
  </h1>
  <TextRotate
    :words="['faster', 'with confidence', 'every Friday']"
    split="words"
    from="center"
    :interval="3000"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import TextRotate from "$lib/components/markas/TextRotate.svelte";
</script>

<h1 class="text-4xl font-semibold">
  Build for <TextRotate words={["Laravel", "React", "Vue"]} />
</h1>
<TextRotate
  words={["faster", "with confidence", "every Friday"]}
  split="words"
  from="center"
  interval={3000}
/>
```

## Astro

```astro
---
import TextRotate from "@/components/markas/TextRotate.astro";
---

<h1 class="text-4xl font-semibold">
  Build for <TextRotate words={["Laravel", "React", "Vue"]} />
</h1>
<TextRotate
  words={["faster", "with confidence", "every Friday"]}
  split="words"
  from="center"
  interval={3000}
/>
```

## Angular

```ts
import { Component } from "@angular/core";
import { TextRotate } from "./markas/text-rotate.component";

@Component({
  selector: "app-hero",
  imports: [TextRotate],
  template: `
    <h1 class="text-4xl font-semibold">
      Build for
      <span markas-text-rotate [words]="stacks"></span>
    </h1>
    <span
      markas-text-rotate
      [words]="phrases"
      split="words"
      from="center"
      interval="3000"
    ></span>
  `,
})
export class Hero {
  protected readonly stacks = ["Laravel", "React", "Vue"];
  protected readonly phrases = ["faster", "with confidence", "every Friday"];
}
```

Angular uses an attribute selector on a span, so `class` and `aria-*` land on the root. Astro renders the first word on the server and rotates it with a small script.

## Notes

- The old word leaves upward unit by unit, then the next one rises in, and the width of the wrapper follows smoothly.
- The rotation pauses on hover (turn it off with `pauseOnHover`), when the text is off screen, and when the tab is hidden.
- Screen readers hear every word once, joined with commas, and nothing is announced on each turn.
- With reduced motion, the first word stays. The Blade version needs Alpine.js.
