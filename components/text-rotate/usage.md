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

## Notes

- The old word leaves upward unit by unit, then the next one rises in, and the width of the wrapper follows smoothly.
- The rotation pauses on hover (turn it off with `pauseOnHover`), when the text is off screen, and when the tab is hidden.
- Screen readers hear every word once, joined with commas, and nothing is announced on each turn.
- With reduced motion, the first word stays. The Blade version needs Alpine.js.
