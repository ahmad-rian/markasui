## Blade

```blade
<x-markas.gradient-border variant="spin" :glow="true" class="max-w-80">
    <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
        <x-markas.button>Upgrade sekarang</x-markas.button>
    </div>
</x-markas.gradient-border>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { GradientBorder } from "@/components/markas/GradientBorder";

<GradientBorder variant="spin" glow className="max-w-80">
  <div className="grid gap-3 p-6">
    <h3 className="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
    <Button>Upgrade sekarang</Button>
  </div>
</GradientBorder>;
```

## Vue

```vue
<template>
  <GradientBorder variant="spin" glow class="max-w-80">
    <div class="grid gap-3 p-6">
      <h3 class="text-lg font-semibold text-ink">Ruang kerja Pro</h3>
      <Button>Upgrade sekarang</Button>
    </div>
  </GradientBorder>
</template>
```

## Catatan

- Border setebal 1px. Beri padding pada konten di dalam; panel dalam memakai `bg-surface`.
- Untuk tombol pil pakai `radius="full"` dengan `inline-block` pada komponen dan `rounded-full` pada tombol.
- `spin` memakai satuan container query yang didukung semua browser terkini.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
