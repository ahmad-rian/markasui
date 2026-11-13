## Blade

```blade
<h2 class="text-3xl font-semibold">
    <x-markas.text-scramble text="Operation Nusantara" trigger="view" />
</h2>
<x-markas.text-scramble text="Rp 12,4 M" trigger="view" charset="digits" />
<x-markas.text-scramble text="99.98%" trigger="view" charset="digits" :delay="150" />
<a href="/brief"><x-markas.text-scramble text="Open the brief" charset="symbols" /></a>
```

## React

```tsx
import { TextScramble } from "@/components/markas/TextScramble";

<h2 className="text-3xl font-semibold">
  <TextScramble text="Operation Nusantara" trigger="view" />
</h2>
<TextScramble text="Rp 12,4 M" trigger="view" charset="digits" />
<TextScramble text="99.98%" trigger="view" charset="digits" delay={150} />
<a href="/brief"><TextScramble text="Open the brief" charset="symbols" /></a>
```

## Vue

```vue
<template>
  <h2 class="text-3xl font-semibold">
    <TextScramble text="Operation Nusantara" trigger="view" />
  </h2>
  <TextScramble text="Rp 12,4 M" trigger="view" charset="digits" />
  <TextScramble text="99.98%" trigger="view" charset="digits" :delay="150" />
  <a href="/brief"><TextScramble text="Open the brief" charset="symbols" /></a>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import TextScramble from "$lib/components/markas/TextScramble.svelte";
</script>

<h2 class="text-3xl font-semibold">
  <TextScramble text="Operation Nusantara" trigger="view" />
</h2>
<TextScramble text="99.98%" trigger="view" charset="digits" delay={150} />
<a href="/brief"><TextScramble text="Open the brief" charset="symbols" /></a>
```

## Astro

```astro
---
import TextScramble from "@/components/markas/TextScramble.astro";
---

<h2 class="text-3xl font-semibold">
  <TextScramble text="Operation Nusantara" trigger="view" />
</h2>
<TextScramble text="99.98%" trigger="view" charset="digits" delay={150} />
<a href="/brief"><TextScramble text="Open the brief" charset="symbols" /></a>
```

## Angular

```ts
import { Component } from "@angular/core";
import { TextScramble } from "./markas/text-scramble.component";

@Component({
  selector: "app-stats",
  imports: [TextScramble],
  template: `
    <h2 class="text-3xl font-semibold">
      <span
        markas-text-scramble
        text="Operation Nusantara"
        trigger="view"
      ></span>
    </h2>
    <span
      markas-text-scramble
      text="99.98%"
      trigger="view"
      charset="digits"
      delay="150"
    ></span>
    <a href="/brief">
      <span markas-text-scramble text="Open the brief" charset="symbols"></span>
    </a>
  `,
})
export class Stats {}
```

Angular uses an attribute selector on a span: `<span markas-text-scramble>`. In Astro the text is rendered on the server and a small script scrambles it.

## Notes

- `hover` runs on hover and focus of the closest link or button. `view` and `mount` start scrambled and decode once; `view` waits until the text scrolls into view.
- An invisible copy of the final text holds the width, so the layout never shifts while scrambling.
- The random characters come from a seeded generator, so every run looks the same in every framework.
- Screen readers hear only the final text. With reduced motion, the final text is shown and never scrambles. The Blade version needs Alpine.js.
