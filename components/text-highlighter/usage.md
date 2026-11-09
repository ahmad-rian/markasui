## Blade

```blade
<p>Keep body text at <x-markas.text-highlighter>45 to 75 characters</x-markas.text-highlighter> per line, with a <x-markas.text-highlighter variant="marker" :delay="400">line height near 1.5</x-markas.text-highlighter>.</p>

<a href="/docs"><x-markas.text-highlighter trigger="hover" direction="rtl" color="success">Read the docs</x-markas.text-highlighter></a>

<div x-data>
    <x-markas.text-highlighter trigger="manual">Ready to publish</x-markas.text-highlighter>
    <button type="button" x-on:click="$dispatch('markas-highlight', { direction: 'ltr' })">Highlight</button>
    <button type="button" x-on:click="$dispatch('markas-highlight-reset')">Reset</button>
</div>
```

## React

```tsx
import { useRef } from "react";
import {
  TextHighlighter,
  type TextHighlighterHandle,
} from "@/components/markas/TextHighlighter";

const highlight = useRef<TextHighlighterHandle>(null);

<p>
  Keep body text at <TextHighlighter>45 to 75 characters</TextHighlighter> per
  line, with a{" "}
  <TextHighlighter variant="marker" delay={400}>
    line height near 1.5
  </TextHighlighter>
  .
</p>

<TextHighlighter ref={highlight} trigger="manual">Ready to publish</TextHighlighter>
<button type="button" onClick={() => highlight.current?.animate("rtl")}>Highlight</button>
<button type="button" onClick={() => highlight.current?.reset()}>Reset</button>
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import TextHighlighter from "@/components/markas/TextHighlighter.vue";

const active = ref(false);
</script>

<template>
  <p>
    Keep body text at <TextHighlighter>45 to 75 characters</TextHighlighter> per
    line, with a
    <TextHighlighter variant="marker" :delay="400"
      >line height near 1.5</TextHighlighter
    >.
  </p>
  <TextHighlighter trigger="manual" :active="active"
    >Ready to publish</TextHighlighter
  >
  <button type="button" @click="active = !active">Toggle</button>
</template>
```

## Notes

- The highlight is a background gradient that grows with a CSS transition of `background-size`, so it follows the text across line breaks (`box-decoration-break: clone`).
- `trigger="view"` uses IntersectionObserver with `once` and `threshold`; `hover` listens on the closest link, button, label, or element with `tabindex`, so keyboard focus draws it too.
- For `trigger="manual"`, React and Vue expose `animate(direction?)` and `reset()` through a ref. Blade listens for the `markas-highlight` (with an optional `direction` in the detail) and `markas-highlight-reset` window events, and `Alpine.$data(el)` exposes the same two methods.
- `duration` and `delay` set `transition-duration` and `transition-delay` on the element. Give each phrase a higher `delay` to highlight a paragraph in reading order.
- With reduced motion, `view` and `auto` highlights are shown at once, and every change happens without a transition.
