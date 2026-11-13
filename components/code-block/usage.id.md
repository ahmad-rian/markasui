## Blade

```blade
@php
    $code = <<<'CODE'
pnpm add markasui
pnpm markasui add carousel
CODE;
@endphp

<x-markas.code-block :code="$code" title="Terminal" copy-label="Salin kode" copied-label="Tersalin" />
```

Butuh Alpine.js untuk tombol salin.

## React

```tsx
import { CodeBlock } from "@/components/markas/CodeBlock";

const code = `pnpm add markasui
pnpm markasui add carousel`;

<CodeBlock
  code={code}
  title="Terminal"
  copyLabel="Salin kode"
  copiedLabel="Tersalin"
/>;
```

## Vue

```vue
<script setup lang="ts">
const code = `pnpm add markasui
pnpm markasui add carousel`;
</script>

<template>
  <CodeBlock
    :code="code"
    title="Terminal"
    copy-label="Salin kode"
    copied-label="Tersalin"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import CodeBlock from "$lib/components/markas/CodeBlock.svelte";

  const code = `pnpm add markasui\npnpm markasui init`;
</script>

<CodeBlock {code} title="Terminal" showLineNumbers />
```

## Astro

```astro
---
import CodeBlock from "@/components/markas/CodeBlock.astro";

const code = `pnpm add markasui\npnpm markasui init`;
---

<CodeBlock code={code} title="Terminal" showLineNumbers />
```

Script kecil yang dibundel menangani tombol salin semua code block di halaman.

## Angular

```ts
import { Component } from "@angular/core";
import { CodeBlock } from "./markas/code-block.component";

@Component({
  selector: "app-example",
  imports: [CodeBlock],
  template: `
    <div markas-code-block [code]="code" title="Terminal" showLineNumbers></div>
  `,
})
export class Example {
  code = "pnpm add markasui\npnpm markasui init";
}
```

## Catatan

- Kode berupa teks polos tanpa pewarnaan sintaks, jadi ringan dan identik di semua framework.
- Tambahkan `showLineNumbers` (`show-line-numbers` di Blade dan Vue) untuk potongan kode yang panjang.
- Tombol salin memakai `navigator.clipboard` yang butuh HTTPS atau localhost.
