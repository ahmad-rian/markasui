## Blade

```blade
<x-markas.gradient-border variant="spin" :glow="true" class="max-w-80">
    <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
        <x-markas.button>Upgrade now</x-markas.button>
    </div>
</x-markas.gradient-border>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { GradientBorder } from "@/components/markas/GradientBorder";

<GradientBorder variant="spin" glow className="max-w-80">
  <div className="grid gap-3 p-6">
    <h3 className="text-lg font-semibold text-ink">Pro workspace</h3>
    <Button>Upgrade now</Button>
  </div>
</GradientBorder>;
```

## Vue

```vue
<template>
  <GradientBorder variant="spin" glow class="max-w-80">
    <div class="grid gap-3 p-6">
      <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
      <Button>Upgrade now</Button>
    </div>
  </GradientBorder>
</template>
```

## Notes

- The border is 1px. Put padding on the content inside; the inner panel uses `bg-surface`.
- For a pill button use `radius="full"` with `inline-block` on the component and `rounded-full` on the button.
- `spin` uses container query units, supported by every current browser.
- The component has no built-in text, so there are no label props to translate.
