## Blade

```blade
<x-markas.aurora-background color="success" speed="slow" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Meet your calmer workspace</h2>
    <x-markas.button>Get started</x-markas.button>
</x-markas.aurora-background>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { AuroraBackground } from "@/components/markas/AuroraBackground";

<AuroraBackground
  color="success"
  speed="slow"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Meet your calmer workspace
  </h2>
  <Button>Get started</Button>
</AuroraBackground>;
```

## Vue

```vue
<template>
  <AuroraBackground
    color="success"
    speed="slow"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">Meet your calmer workspace</h2>
    <Button>Get started</Button>
  </AuroraBackground>
</template>
```

## Notes

- The glow mixes `primary` with the `color` token, so it follows light and dark mode.
- Keyframes ship inside the component in a small `<style>` tag. With reduced motion the glow stays still.
- The component has no built-in text, so there are no label props to translate.
