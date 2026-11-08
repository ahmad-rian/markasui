## Blade

```blade
<x-markas.shooting-stars variant="night" frequency="normal" trail-color="primary" class="dark rounded-xl bg-canvas px-6 py-14">
    <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
    <x-markas.button>Join the waitlist</x-markas.button>
</x-markas.shooting-stars>
```

No JavaScript or Alpine.js needed.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { ShootingStars } from "@/components/markas/ShootingStars";

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  className="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 className="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
  <Button>Join the waitlist</Button>
</ShootingStars>;
```

## Vue

```vue
<template>
  <ShootingStars
    variant="night"
    frequency="normal"
    trail-color="primary"
    class="dark rounded-xl bg-canvas px-6 py-14"
  >
    <h2 class="text-2xl font-semibold text-ink">Make a wish, then ship it</h2>
    <Button>Join the waitlist</Button>
  </ShootingStars>
</template>
```

## Notes

- Three shooting stars share one CSS cycle, so one crosses the sky every third of it. They are invisible for the rest of the cycle.
- Star and streak positions come from `seed` with integer math, so Blade, React, and Vue render the same sky.
- This is a separate component from Stars Background, with its own keyframes, so both can sit on the same page.
- With reduced motion the stars stop twinkling and the streaks stay still.
- The component has no built-in text, so there are no label props to translate.
