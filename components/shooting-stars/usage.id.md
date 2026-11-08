## Blade

```blade
<x-markas.shooting-stars variant="night" frequency="normal" trail-color="primary" class="dark rounded-xl bg-canvas px-6 py-14">
    <h2 class="text-2xl font-semibold text-ink">Buat permintaan, lalu rilis</h2>
    <x-markas.button>Gabung waitlist</x-markas.button>
</x-markas.shooting-stars>
```

Tidak butuh JavaScript atau Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { ShootingStars } from "@/components/markas/ShootingStars";

<ShootingStars
  variant="night"
  frequency="normal"
  trailColor="primary"
  className="dark rounded-xl bg-canvas px-6 py-14"
>
  <h2 className="text-2xl font-semibold text-ink">
    Buat permintaan, lalu rilis
  </h2>
  <Button>Gabung waitlist</Button>
</ShootingStars>;
```

## Vue

```vue
<template>
  <ShootingStars
    variant="night"
    frequency="normal"
    trail-color="primary"
    class="dark rounded-xl bg-canvas px-6 py-14"
  >
    <h2 class="text-2xl font-semibold text-ink">Buat permintaan, lalu rilis</h2>
    <Button>Gabung waitlist</Button>
  </ShootingStars>
</template>
```

## Catatan

- Tiga bintang jatuh berbagi satu putaran CSS, jadi satu melintas setiap sepertiga putaran. Di sisa putaran mereka tidak terlihat.
- Posisi bintang dan lintasan dihitung dari `seed` dengan bilangan bulat, jadi Blade, React, dan Vue merender langit yang sama.
- Komponen ini terpisah dari Stars Background dengan keyframe sendiri, jadi keduanya bisa ada di halaman yang sama.
- Dengan reduced motion bintang berhenti berkelip dan lintasan diam.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
