## Blade

```blade
<h1 class="text-4xl font-semibold">
    Build interfaces for
    <x-markas.typing-text :words="['Laravel', 'React', 'Vue']" />
</h1>
<x-markas.typing-text :words="['pnpm dlx markasui add marquee']" :loop="false" />
```

## React

```tsx
import { TypingText } from "@/components/markas/TypingText";

<h1 className="text-4xl font-semibold">
  Build interfaces for <TypingText words={["Laravel", "React", "Vue"]} />
</h1>
<TypingText words={["pnpm dlx markasui add marquee"]} loop={false} />
```

## Vue

```vue
<template>
  <h1 class="text-4xl font-semibold">
    Build interfaces for
    <TypingText :words="['Laravel', 'React', 'Vue']" />
  </h1>
  <TypingText :words="['pnpm dlx markasui add marquee']" :loop="false" />
</template>
```

## Notes

- The first word is rendered on the server. The animation starts by pausing on it, then deletes it and types the next one.
- The loop pauses while the text is off screen. The Blade version needs Alpine.js.
- Screen readers hear every word once, joined with commas, instead of each typed letter.
- With reduced motion, the first word stays and the cursor does not blink.
