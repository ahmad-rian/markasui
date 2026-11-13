## Blade

```blade
<x-markas.ripple-background :size="88" :gap="56" class="grid h-48 place-items-center rounded-xl bg-canvas">
    <span class="grid size-14 place-items-center rounded-full border border-line bg-surface">MC</span>
</x-markas.ripple-background>
```

Tidak butuh JavaScript atau Alpine.js.

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

Angular memakai attribute selector pada div native, jadi `class`, `aria-*`, dan atribut lain tetap di elemen akar.

## Catatan

- Lingkaran berada di tengah komponen. Letakkan ikon atau avatar di tengah dengan `grid place-items-center`.
- Kalau denyut punya arti, misalnya sedang mencari, sampaikan juga lewat teks (misalnya dengan `role="status"`).
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
