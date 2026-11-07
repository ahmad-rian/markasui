## Blade

```blade
<div class="pb-64">
    <x-markas.stacking-cards variant="fan" :top="96" :offset="12" class="gap-6">
        <article class="h-64 rounded-xl border border-line bg-surface p-6">Rencanakan minggumu</article>
        <article class="h-64 rounded-xl border border-line bg-surface p-6">Bagikan ke tim</article>
        <article class="h-64 rounded-xl border border-line bg-surface p-6">Dibayar tepat waktu</article>
    </x-markas.stacking-cards>
</div>
```

Butuh Alpine.js.

## React

```tsx
import { StackingCards } from "@/components/markas/StackingCards";

<div className="pb-64">
  <StackingCards variant="fan" top={96} offset={12} className="gap-6">
    <article className="h-64 rounded-xl border border-line bg-surface p-6">
      Rencanakan minggumu
    </article>
    <article className="h-64 rounded-xl border border-line bg-surface p-6">
      Bagikan ke tim
    </article>
    <article className="h-64 rounded-xl border border-line bg-surface p-6">
      Dibayar tepat waktu
    </article>
  </StackingCards>
</div>;
```

## Vue

```vue
<template>
  <div class="pb-64">
    <StackingCards variant="fan" :top="96" :offset="12" class="gap-6">
      <article class="h-64 rounded-xl border border-line bg-surface p-6">
        Rencanakan minggumu
      </article>
      <article class="h-64 rounded-xl border border-line bg-surface p-6">
        Bagikan ke tim
      </article>
      <article class="h-64 rounded-xl border border-line bg-surface p-6">
        Dibayar tepat waktu
      </article>
    </StackingCards>
  </div>
</template>
```

## Catatan

- Setiap anak langsung adalah kartu. Kartu menempel di `top` ditambah `offset` per kartu, sehingga kartu sebelumnya terlihat di atas kartu berikutnya.
- `--stack-depth` pada tiap kartu menyatakan seberapa jauh kartu berikutnya sudah menutupinya. `scale` mengecil dan meredup, `fan` miring kiri dan kanan, `blur` buram dan meredup.
- Listener scroll bersifat pasif, digabung dalam satu requestAnimationFrame, dan hanya terpasang selama tumpukan terlihat. Bekerja di halaman maupun di dalam kontainer scroll mana pun.
- Kartu yang memegang fokus keyboard melompat ke depan dalam ukuran penuh. Dengan reduced motion kartu tetap menempel tetapi tidak berubah. Atribut dan `class` jatuh ke tumpukan.
