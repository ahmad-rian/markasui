## Blade

```blade
<x-markas.input-otp
    name="code"
    label="Kode verifikasi"
    digit-label="Digit {index} dari {length}"
    x-on:markas-complete="$el.closest('form').requestSubmit()"
/>
```

Butuh Alpine.js. Setiap perubahan memancarkan `markas-change` dan kode yang lengkap memancarkan `markas-complete`, keduanya membawa kode di `$event.detail`. Isi kode awal lewat `value`.

## React

```tsx
import { useState } from "react";
import { InputOTP } from "@/components/markas/InputOTP";

const [code, setCode] = useState("");

<InputOTP
  name="code"
  label="Kode verifikasi"
  digitLabel="Digit {index} dari {length}"
  value={code}
  onValueChange={setCode}
  onComplete={(value) => verify(value)}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import InputOTP from "@/components/markas/InputOTP.vue";

const code = ref("");
</script>

<template>
  <InputOTP
    v-model="code"
    name="code"
    label="Kode verifikasi"
    digit-label="Digit {index} dari {length}"
    @complete="(value) => verify(value)"
  />
</template>
```

## Catatan

- Kotak hanya menerima digit. Menempel kode lengkap mengisi semua kotak, walaupun ada spasi atau tanda hubung.
- `name` dipasang di satu input tersembunyi berisi kode gabungan, jadi submit form biasa mengirim `code=123456`.
- Atribut tambahan dan `class` jatuh ke `<fieldset>`. `disabled` menonaktifkan semua kotak.
- Label kotak bawaan berbahasa Inggris ("Digit {index} of {length}"). Terjemahkan lewat `digitLabel`.
