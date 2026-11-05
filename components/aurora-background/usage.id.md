## Blade

```blade
<x-markas.aurora-background color="success" speed="slow" class="rounded-xl border border-line bg-surface px-6 py-12">
    <h2 class="text-2xl font-semibold text-ink">Kenalan dengan ruang kerja yang lebih tenang</h2>
    <x-markas.button>Mulai sekarang</x-markas.button>
</x-markas.aurora-background>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { AuroraBackground } from "@/components/markas/AuroraBackground";

<AuroraBackground
  color="success"
  speed="slow"
  className="rounded-xl border border-line bg-surface px-6 py-12"
>
  <h2 className="text-2xl font-semibold text-ink">
    Kenalan dengan ruang kerja yang lebih tenang
  </h2>
  <Button>Mulai sekarang</Button>
</AuroraBackground>;
```

## Vue

```vue
<template>
  <AuroraBackground
    color="success"
    speed="slow"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <h2 class="text-2xl font-semibold text-ink">
      Kenalan dengan ruang kerja yang lebih tenang
    </h2>
    <Button>Mulai sekarang</Button>
  </AuroraBackground>
</template>
```

## Catatan

- Cahaya mencampur `primary` dengan token `color`, jadi ikut mode terang dan gelap.
- Keyframes ikut di dalam komponen lewat tag `<style>` kecil. Dengan reduced motion cahaya diam.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
