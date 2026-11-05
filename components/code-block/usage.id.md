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

## Catatan

- Kode berupa teks polos tanpa pewarnaan sintaks, jadi ringan dan identik di semua framework.
- Tambahkan `showLineNumbers` (`show-line-numbers` di Blade dan Vue) untuk potongan kode yang panjang.
- Tombol salin memakai `navigator.clipboard` yang butuh HTTPS atau localhost.
