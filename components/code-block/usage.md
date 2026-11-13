## Blade

```blade
@php
    $code = <<<'CODE'
pnpm add markasui
pnpm markasui add carousel
CODE;
@endphp

<x-markas.code-block :code="$code" title="Terminal" />
```

Needs Alpine.js for the copy button.

## React

```tsx
import { CodeBlock } from "@/components/markas/CodeBlock";

const code = `pnpm add markasui
pnpm markasui add carousel`;

<CodeBlock code={code} title="Terminal" />;
```

## Vue

```vue
<script setup lang="ts">
const code = `pnpm add markasui
pnpm markasui add carousel`;
</script>

<template>
  <CodeBlock :code="code" title="Terminal" />
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

A small bundled script handles the copy button of every code block on the page.

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

## Notes

- Code is plain text without syntax highlighting, so it stays small and identical in every framework.
- Add `showLineNumbers` (`show-line-numbers` in Blade and Vue) for longer snippets.
- The copy button uses `navigator.clipboard`, which needs HTTPS or localhost.
