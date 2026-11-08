## Blade

```blade
<x-markas.hero-highlight class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">Stop guessing. <mark>Start measuring</mark> what users love.</h2>
</x-markas.hero-highlight>
```

Needs Alpine.js for the pointer glow and to start drawing the marks.

## React

```tsx
import { HeroHighlight } from "@/components/markas/HeroHighlight";

<HeroHighlight className="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 className="text-3xl font-semibold text-ink">
    Stop guessing. <mark>Start measuring</mark> what users love.
  </h2>
</HeroHighlight>;
```

## Vue

```vue
<template>
  <HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">
      Stop guessing. <mark>Start measuring</mark> what users love.
    </h2>
  </HeroHighlight>
</template>
```

## Notes

- Any `<mark>` inside the component gets the highlight. There is no separate child component, so the markup is the same in Blade, React, and Vue.
- The pointer position is stored in CSS variables; a radial mask reveals the bright grid around it. No canvas and no animation loop.
- Marks draw once, the first time the section scrolls into view. With reduced motion they are fully highlighted right away.
- The component has no built-in text, so there are no label props to translate.
