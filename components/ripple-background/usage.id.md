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

## Catatan

- Lingkaran berada di tengah komponen. Letakkan ikon atau avatar di tengah dengan `grid place-items-center`.
- Kalau denyut punya arti, misalnya sedang mencari, sampaikan juga lewat teks (misalnya dengan `role="status"`).
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
