## Blade

```blade
<h1 class="text-5xl leading-tight font-semibold">
    <x-markas.vertical-cut-reveal :text="implode(chr(10), ['Design once.', 'Ship everywhere.'])" split="lines" />
</h1>
<p class="text-lg">
    <x-markas.vertical-cut-reveal text="Blade, React, and Vue" split="chars" from="center" :delay="300" />
</p>
```

## React

```tsx
import { VerticalCutReveal } from "@/components/markas/VerticalCutReveal";

<h1 className="text-5xl leading-tight font-semibold">
  <VerticalCutReveal text={'Design once.\nShip everywhere.'} split="lines" />
</h1>
<p className="text-lg">
  <VerticalCutReveal text="Blade, React, and Vue" split="chars" from="center" delay={300} />
</p>
```

## Vue

```vue
<template>
  <h1 class="text-5xl leading-tight font-semibold">
    <VerticalCutReveal :text="'Design once.\nShip everywhere.'" split="lines" />
  </h1>
  <p class="text-lg">
    <VerticalCutReveal
      text="Blade, React, and Vue"
      split="chars"
      from="center"
      :delay="300"
    />
  </p>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import VerticalCutReveal from "$lib/components/markas/VerticalCutReveal.svelte";
</script>

<h1 class="text-5xl leading-tight font-semibold">
  <VerticalCutReveal text={"Design once.\nShip everywhere."} split="lines" />
</h1>
<p class="text-lg">
  <VerticalCutReveal
    text="Blade, React, and Vue"
    split="chars"
    from="center"
    delay={300}
  />
</p>
```

## Astro

```astro
---
import VerticalCutReveal from "@/components/markas/VerticalCutReveal.astro";
---

<h1 class="text-5xl leading-tight font-semibold">
  <VerticalCutReveal text={"Design once.\nShip everywhere."} split="lines" />
</h1>
<p class="text-lg">
  <VerticalCutReveal text="Blade, React, and Vue" split="chars" from="center" delay={300} />
</p>
```

## Angular

```ts
import { Component } from "@angular/core";
import { VerticalCutReveal } from "./markas/vertical-cut-reveal.component";

@Component({
  selector: "app-launch",
  imports: [VerticalCutReveal],
  template: `
    <h1 class="text-5xl leading-tight font-semibold">
      <span markas-vertical-cut-reveal [text]="title" split="lines"></span>
    </h1>
    <p class="text-lg">
      <span
        markas-vertical-cut-reveal
        text="Blade, React, and Vue"
        split="chars"
        from="center"
        delay="300"
      ></span>
    </p>
  `,
})
export class Launch {
  protected readonly title = "Design once.\nShip everywhere.";
}
```

Angular uses an attribute selector on a span: `<span markas-vertical-cut-reveal>`. Pass a text with a line break through a property binding.

## Notes

- The text is rendered in place on the server. On the client each unit hides behind its cut line and rises once the text scrolls into view.
- A line break (`\n`) starts a new line. In Blade, build it with `implode(chr(10), [...])` or a double quoted PHP string.
- Use rising `delay` values to reveal a title, a price, and a caption in order.
- Screen readers hear the full text once. With reduced motion, the text is shown at once. The Blade version needs Alpine.js.
