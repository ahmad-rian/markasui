## Blade

```blade
<x-markas.tabs :items="['akun' => 'Akun', 'sandi' => 'Kata sandi']" default-value="akun">
    <x-slot:akun>Ubah nama dan email akun Anda.</x-slot:akun>
    <x-slot:sandi>Ganti kata sandi secara berkala.</x-slot:sandi>
</x-markas.tabs>
```

Butuh Alpine.js.

## React

```tsx
import { Tabs } from "@/components/markas/Tabs";

<Tabs
  defaultValue="akun"
  items={[
    { value: "akun", label: "Akun", content: "Ubah nama dan email akun Anda." },
    {
      value: "sandi",
      label: "Kata sandi",
      content: "Ganti kata sandi secara berkala.",
    },
  ]}
/>;
```

## Vue

```vue
<template>
  <Tabs
    default-value="akun"
    :items="[
      { value: 'akun', label: 'Akun' },
      { value: 'sandi', label: 'Kata sandi' },
    ]"
  >
    <template #akun>Ubah nama dan email akun Anda.</template>
    <template #sandi>Ganti kata sandi secara berkala.</template>
  </Tabs>
</template>
```

## Catatan

- Key tab dipakai sebagai id dan nama slot, jadi pakai huruf kecil, angka, atau underscore saja.
