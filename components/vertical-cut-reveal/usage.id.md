## Blade

```blade
<h1 class="text-5xl leading-tight font-semibold">
    <x-markas.vertical-cut-reveal :text="implode(chr(10), ['Desain sekali.', 'Rilis di mana saja.'])" split="lines" />
</h1>
<p class="text-lg">
    <x-markas.vertical-cut-reveal text="Blade, React, dan Vue" split="chars" from="center" :delay="300" />
</p>
```

## React

```tsx
import { VerticalCutReveal } from "@/components/markas/VerticalCutReveal";

<h1 className="text-5xl leading-tight font-semibold">
  <VerticalCutReveal text={'Desain sekali.\nRilis di mana saja.'} split="lines" />
</h1>
<p className="text-lg">
  <VerticalCutReveal text="Blade, React, dan Vue" split="chars" from="center" delay={300} />
</p>
```

## Vue

```vue
<template>
  <h1 class="text-5xl leading-tight font-semibold">
    <VerticalCutReveal
      :text="'Desain sekali.\nRilis di mana saja.'"
      split="lines"
    />
  </h1>
  <p class="text-lg">
    <VerticalCutReveal
      text="Blade, React, dan Vue"
      split="chars"
      from="center"
      :delay="300"
    />
  </p>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import VerticalCutReveal from "$lib/components/markas/VerticalCutReveal.svelte";
</script>

<h1 class="text-5xl leading-tight font-semibold">
  <VerticalCutReveal
    text={"Desain sekali.\nRilis di mana saja."}
    split="lines"
  />
</h1>
<p class="text-lg">
  <VerticalCutReveal
    text="Blade, React, dan Vue"
    split="chars"
    from="center"
    delay={300}
  />
</p>
```

## Astro

```astro
---
import VerticalCutReveal from "@/components/markas/VerticalCutReveal.astro";
---

<h1 class="text-5xl leading-tight font-semibold">
  <VerticalCutReveal text={"Desain sekali.\nRilis di mana saja."} split="lines" />
</h1>
<p class="text-lg">
  <VerticalCutReveal text="Blade, React, dan Vue" split="chars" from="center" delay={300} />
</p>
```

## Angular

```ts
import { Component } from "@angular/core";
import { VerticalCutReveal } from "./markas/vertical-cut-reveal.component";

@Component({
  selector: "app-launch",
  imports: [VerticalCutReveal],
  template: `
    <h1 class="text-5xl leading-tight font-semibold">
      <span markas-vertical-cut-reveal [text]="title" split="lines"></span>
    </h1>
    <p class="text-lg">
      <span
        markas-vertical-cut-reveal
        text="Blade, React, dan Vue"
        split="chars"
        from="center"
        delay="300"
      ></span>
    </p>
  `,
})
export class Launch {
  protected readonly title = "Desain sekali.\nRilis di mana saja.";
}
```

Angular memakai attribute selector pada span: `<span markas-vertical-cut-reveal>`. Teks dengan baris baru dikirim lewat property binding.

## Catatan

- Teks dirender di tempatnya oleh server. Di browser setiap bagian bersembunyi di balik garis potong dan naik saat teks masuk layar.
- Baris baru (`\n`) memulai baris berikutnya. Di Blade, buat dengan `implode(chr(10), [...])` atau string PHP berkutip ganda.
- Pakai `delay` bertingkat untuk memunculkan judul, harga, dan keterangan berurutan.
- Screen reader membaca teks utuh sekali. Dengan reduced motion, teks langsung tampil. Versi Blade butuh Alpine.js.
