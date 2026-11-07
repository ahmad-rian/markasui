## Blade

```blade
<h1 class="text-4xl font-semibold">
    Bangun untuk
    <x-markas.text-rotate :words="['Laravel', 'React', 'Vue']" />
</h1>
<x-markas.text-rotate :words="['lebih cepat', 'dengan yakin', 'setiap Jumat']" split="words" from="center" :interval="3000" />
```

## React

```tsx
import { TextRotate } from "@/components/markas/TextRotate";

<h1 className="text-4xl font-semibold">
  Bangun untuk <TextRotate words={["Laravel", "React", "Vue"]} />
</h1>
<TextRotate words={['lebih cepat', 'dengan yakin', 'setiap Jumat']} split="words" from="center" interval={3000} />
```

## Vue

```vue
<template>
  <h1 class="text-4xl font-semibold">
    Bangun untuk
    <TextRotate :words="['Laravel', 'React', 'Vue']" />
  </h1>
  <TextRotate
    :words="['lebih cepat', 'dengan yakin', 'setiap Jumat']"
    split="words"
    from="center"
    :interval="3000"
  />
</template>
```

## Catatan

- Kata lama keluar ke atas bagian demi bagian, lalu kata berikutnya naik masuk, dan lebar pembungkus ikut berubah halus.
- Putaran berhenti saat hover (matikan dengan `pauseOnHover`), saat teks di luar layar, dan saat tab tersembunyi.
- Screen reader membaca setiap kata sekali, dipisah koma, dan tidak ada pengumuman di setiap giliran.
- Dengan reduced motion, kata pertama tetap tampil. Versi Blade butuh Alpine.js.
