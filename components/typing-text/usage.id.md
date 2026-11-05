## Blade

```blade
<h1 class="text-4xl font-semibold">
    Bangun antarmuka untuk
    <x-markas.typing-text :words="['Laravel', 'React', 'Vue']" />
</h1>
<x-markas.typing-text :words="['pnpm dlx markasui add marquee']" :loop="false" />
```

## React

```tsx
import { TypingText } from "@/components/markas/TypingText";

<h1 className="text-4xl font-semibold">
  Bangun antarmuka untuk <TypingText words={["Laravel", "React", "Vue"]} />
</h1>
<TypingText words={["pnpm dlx markasui add marquee"]} loop={false} />
```

## Vue

```vue
<template>
  <h1 class="text-4xl font-semibold">
    Bangun antarmuka untuk
    <TypingText :words="['Laravel', 'React', 'Vue']" />
  </h1>
  <TypingText :words="['pnpm dlx markasui add marquee']" :loop="false" />
</template>
```

## Catatan

- Kata pertama dirender di server. Animasi dimulai dengan jeda di kata itu, lalu menghapusnya dan mengetik kata berikutnya.
- Putaran berhenti selama teks di luar layar. Versi Blade butuh Alpine.js.
- Screen reader membaca setiap kata sekali, dipisah koma, bukan setiap huruf yang diketik.
- Dengan reduced motion, kata pertama tetap tampil dan kursor tidak berkedip.
