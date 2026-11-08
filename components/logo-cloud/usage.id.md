## Blade

```blade
<x-markas.logo-cloud
    title="Dipercaya tim di seluruh Indonesia"
    :logos="[
        ['name' => 'Nusantara Labs', 'path' => 'M12 2 21 7v10l-9 5-9-5V7Z', 'href' => 'https://example.com'],
        ['name' => 'Kopi Kita'],
    ]"
/>

{{-- Tanpa judul: beri nama section lewat logos-label --}}
<x-markas.logo-cloud variant="marquee" logos-label="Logo pelanggan" :logos="$logos" />
```

## React

```tsx
import { LogoCloud } from "@/components/markas/LogoCloud";

<LogoCloud title="Dipercaya tim di seluruh Indonesia" logos={logos} />

<LogoCloud variant="stats" title="Dipakai 2.000+ tim" logos={logos} stats={[{ value: "2.000+", label: "Tim" }]} />

<LogoCloud variant="marquee" logosLabel="Logo pelanggan" logos={logos} />
```

## Vue

```vue
<template>
  <LogoCloud title="Dipercaya tim di seluruh Indonesia" :logos="logos" />

  <LogoCloud variant="marquee" logos-label="Logo pelanggan" :logos="logos" />
</template>
```

## Catatan

- Tidak ada JavaScript di varian mana pun. Marquee adalah animasi CSS yang berhenti saat hover dan fokus, memudar di tepi, dan diam membungkus saat reduced motion.
- Marquee mengulang daftar sekali; salinannya diberi `aria-hidden` dan `inert`.
- Logo dari `path` memakai `currentColor`, jadi mengikuti tema terang dan gelap. Dengan `grayscale`, gambar di markup sendiri dibuat abu sampai hover.
- Tata letak mengikuti lebar section lewat container query.
