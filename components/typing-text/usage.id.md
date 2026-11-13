## Blade

```blade
<h1 class="text-4xl font-semibold">
    Bangun antarmuka untuk
    <x-markas.typing-text :words="['Laravel', 'React', 'Vue']" />
</h1>
<x-markas.typing-text :words="['pnpm dlx markasui add marquee']" :loop="false" />
```

## React

```tsx
import { TypingText } from "@/components/markas/TypingText";

<h1 className="text-4xl font-semibold">
  Bangun antarmuka untuk <TypingText words={["Laravel", "React", "Vue"]} />
</h1>
<TypingText words={["pnpm dlx markasui add marquee"]} loop={false} />
```

## Vue

```vue
<template>
  <h1 class="text-4xl font-semibold">
    Bangun antarmuka untuk
    <TypingText :words="['Laravel', 'React', 'Vue']" />
  </h1>
  <TypingText :words="['pnpm dlx markasui add marquee']" :loop="false" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import TypingText from "$lib/components/markas/TypingText.svelte";
</script>

<h1 class="text-4xl font-semibold">
  Bangun antarmuka untuk <TypingText words={["Laravel", "React", "Vue"]} />
</h1>
<TypingText words={["pnpm dlx markasui add marquee"]} loop={false} />
```

## Astro

```astro
---
import TypingText from "@/components/markas/TypingText.astro";
---

<h1 class="text-4xl font-semibold">
  Bangun antarmuka untuk <TypingText words={["Laravel", "React", "Vue"]} />
</h1>
<TypingText words={["pnpm dlx markasui add marquee"]} loop={false} />
```

## Angular

```ts
import { Component } from "@angular/core";
import { TypingText } from "./markas/typing-text.component";

@Component({
  selector: "app-hero",
  imports: [TypingText],
  template: `
    <h1 class="text-4xl font-semibold">
      Bangun antarmuka untuk
      <span markas-typing-text [words]="stacks"></span>
    </h1>
    <span markas-typing-text [words]="command" [loop]="false"></span>
  `,
})
export class Hero {
  protected readonly stacks = ["Laravel", "React", "Vue"];
  protected readonly command = ["pnpm dlx markasui add marquee"];
}
```

Angular memakai attribute selector pada span: `<span markas-typing-text>`.

## Catatan

- Kata pertama dirender di server. Animasi dimulai dengan jeda di kata itu, lalu menghapusnya dan mengetik kata berikutnya.
- Putaran berhenti selama teks di luar layar. Versi Blade butuh Alpine.js.
- Screen reader membaca setiap kata sekali, dipisah koma, bukan setiap huruf yang diketik.
- Dengan reduced motion, kata pertama tetap tampil dan kursor tidak berkedip.
