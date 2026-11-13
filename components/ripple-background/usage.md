## Blade

```blade
<x-markas.ripple-background :size="88" :gap="56" class="grid h-48 place-items-center rounded-xl bg-canvas">
    <span class="grid size-14 place-items-center rounded-full border border-line bg-surface">MC</span>
</x-markas.ripple-background>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { RippleBackground } from "@/components/markas/RippleBackground";

<RippleBackground
  size={88}
  gap={56}
  className="grid h-48 place-items-center rounded-xl bg-canvas"
>
  <span className="grid size-14 place-items-center rounded-full border border-line bg-surface">
    MC
  </span>
</RippleBackground>;
```

## Vue

```vue
<template>
  <RippleBackground
    :size="88"
    :gap="56"
    class="grid h-48 place-items-center rounded-xl bg-canvas"
  >
    <span
      class="grid size-14 place-items-center rounded-full border border-line bg-surface"
      >MC</span
    >
  </RippleBackground>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import RippleBackground from "$lib/components/markas/RippleBackground.svelte";
</script>

<RippleBackground
  size={88}
  gap={56}
  class="grid h-48 place-items-center rounded-xl bg-canvas"
>
  <span
    class="grid size-14 place-items-center rounded-full border border-line bg-surface"
  >
    MC
  </span>
</RippleBackground>
```

## Astro

```astro
---
import RippleBackground from "@/components/markas/RippleBackground.astro";
---

<RippleBackground
  size={88}
  gap={56}
  class="grid h-48 place-items-center rounded-xl bg-canvas"
>
  <span class="grid size-14 place-items-center rounded-full border border-line bg-surface">
    MC
  </span>
</RippleBackground>
```

## Angular

```ts
import { Component } from "@angular/core";
import { RippleBackground } from "./markas/ripple-background.component";

@Component({
  selector: "app-call",
  imports: [RippleBackground],
  template: `
    <div
      markas-ripple-background
      size="88"
      gap="56"
      class="grid h-48 place-items-center rounded-xl bg-canvas"
    >
      <span
        class="grid size-14 place-items-center rounded-full border border-line bg-surface"
      >
        MC
      </span>
    </div>
  `,
})
export class Call {}
```

Angular uses an attribute selector on the native div, so `class`, `aria-*`, and other attributes stay on the root element.

## Notes

- The circles are centered in the component. Center your icon or avatar with `grid place-items-center`.
- If the pulse means something, such as searching, also say it in text (for example with `role="status"`).
- The component has no built-in text, so there are no label props to translate.
