## Blade

```blade
<x-markas.theme-toggle />

<x-markas.theme-toggle animation="eclipse" variant="outline" size="sm" />

<x-markas.theme-toggle :show-text="true" dark-label="Dark mode" light-label="Light mode" animation="flip" />
```

## React

```tsx
import { ThemeToggle } from "@/components/markas/ThemeToggle";

<ThemeToggle />
<ThemeToggle animation="eclipse" variant="outline" size="sm" />
<ThemeToggle showText darkLabel="Dark mode" lightLabel="Light mode" animation="flip" onThemeChange={(theme) => console.log(theme)} />
```

## Vue

```vue
<script setup lang="ts">
import ThemeToggle from "@/components/markas/ThemeToggle.vue";
</script>

<template>
  <ThemeToggle />
  <ThemeToggle animation="eclipse" variant="outline" size="sm" />
  <ThemeToggle
    show-text
    dark-label="Dark mode"
    light-label="Light mode"
    animation="flip"
    @change="(theme) => console.log(theme)"
  />
</template>
```

## Notes

- The toggle adds or removes the `dark` class on `<html>`, saves the choice in localStorage (`storageKey`), and dispatches `markas-theme-change` on `document` with the theme as `detail`.
- On load it reads the saved choice, then a `dark` class the page already set, then `prefers-color-scheme`. Add this to `<head>` so the page never flashes the wrong theme:

```html
<script>
  try {
    const saved = localStorage.getItem("markas-theme");
    document.documentElement.classList.toggle(
      "dark",
      saved
        ? saved === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches,
    );
  } catch {}
</script>
```

- Animations: `rotate`, `morph`, `flip`, `slide`, `eclipse`, `spring`. Each click plays keyframes with the Web Animations API (transform and opacity only). Users with reduced motion get an instant swap.
- `document.dispatchEvent(new Event("markas-theme-demo"))` plays every toggle there and back without changing the theme, handy for a "Play all" button.
- The button keeps its own `data-state` (light or dark) and follows the `dark` class on `<html>`, so several toggles, or a theme set elsewhere, stay in sync.
