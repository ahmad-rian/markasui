## Blade

```blade
<x-markas.marquee :duration="25">
    @foreach ($logos as $logo)
        <img src="{{ $logo['src'] }}" alt="{{ $logo['name'] }}" class="h-8" />
    @endforeach
</x-markas.marquee>

<x-markas.marquee vertical reverse class="h-64">...</x-markas.marquee>
```

## React

```tsx
import { Marquee } from "@/components/markas/Marquee";

<Marquee duration={25}>
  {logos.map((logo) => (
    <img key={logo.name} src={logo.src} alt={logo.name} className="h-8" />
  ))}
</Marquee>

<Marquee vertical reverse className="h-64">...</Marquee>
```

## Vue

```vue
<template>
  <Marquee :duration="25">
    <img
      v-for="logo in logos"
      :key="logo.name"
      :src="logo.src"
      :alt="logo.name"
      class="h-8"
    />
  </Marquee>

  <Marquee vertical reverse class="h-64">...</Marquee>
</template>
```

## Catatan

- Isi item untuk satu putaran. Komponen merendernya dua kali; salinannya memakai `aria-hidden` dan `inert`.
- Setiap salinan minimal selebar marquee, jadi daftar pendek tetap berputar tanpa celah.
- Gerakan memakai Web Animations API dan berhenti saat hover, saat fokus di dalam, dan saat di luar layar. Versi Blade butuh Alpine.js.
- Dengan reduced motion, tidak ada yang bergerak. Jangan taruh informasi yang dibutuhkan pengguna hanya di dalam marquee.
