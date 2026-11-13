## Blade

```blade
<x-markas.github-stars-button href="https://github.com/markasui/markasui" :stars="12480">Star on GitHub</x-markas.github-stars-button>
```

## React

```tsx
import { GithubStarsButton } from "@/components/markas/GithubStarsButton";

<GithubStarsButton href="https://github.com/markasui/markasui" stars={12480}>
  Star on GitHub
</GithubStarsButton>;
```

## Vue

```vue
<script setup lang="ts">
import GithubStarsButton from "@/components/markas/GithubStarsButton.vue";
</script>

<template>
  <GithubStarsButton href="https://github.com/markasui/markasui" :stars="12480">
    Star on GitHub
  </GithubStarsButton>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import GithubStarsButton from "$lib/components/markas/GithubStarsButton.svelte";
</script>

<GithubStarsButton href="https://github.com/markasui/markasui" stars={12480}>
  Star on GitHub
</GithubStarsButton>
```

## Astro

```astro
---
import GithubStarsButton from "@/components/markas/GithubStarsButton.astro";
---

<GithubStarsButton href="https://github.com/markasui/markasui" stars={12480}>
  Star on GitHub
</GithubStarsButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { GithubStarsButton } from "./markas/github-stars-button.component";

@Component({
  selector: "app-repo",
  imports: [GithubStarsButton],
  template: `
    <a
      markas-github-stars-button
      href="https://github.com/markasui/markasui"
      [stars]="12480"
    >
      Star on GitHub
    </a>
  `,
})
export class Repo {}
```

Angular uses an attribute selector on the native link, so `target`, `rel`, and `aria-*` stay on it.

## Notes

- The component never calls the GitHub API. Read the count at build time or on the server and pass it in.
- The visible number is compact (980, 12.5k, 1.2M). `{count}` in `starsLabel` gets the full number with thousands separators.
- The count-up starts the first time the link scrolls into view. Blade needs Alpine.js for the animation and renders the final number without it.
