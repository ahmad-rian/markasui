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

## Notes

- Code is plain text without syntax highlighting, so it stays small and identical in every framework.
- Add `showLineNumbers` (`show-line-numbers` in Blade and Vue) for longer snippets.
- The copy button uses `navigator.clipboard`, which needs HTTPS or localhost.
