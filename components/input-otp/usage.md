## Blade

```blade
<x-markas.input-otp
    name="code"
    label="Verification code"
    x-on:markas-complete="$el.closest('form').requestSubmit()"
/>
```

Needs Alpine.js. Every change dispatches `markas-change` and a full code dispatches `markas-complete`, both with the code in `$event.detail`. Start with a code through `value`.

## React

```tsx
import { useState } from "react";
import { InputOTP } from "@/components/markas/InputOTP";

const [code, setCode] = useState("");

<InputOTP
  name="code"
  label="Verification code"
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
    label="Verification code"
    @complete="(value) => verify(value)"
  />
</template>
```

## Notes

- The boxes accept digits only. Pasting a full code fills every box, even with spaces or dashes in it.
- `name` goes to one hidden input that holds the joined code, so a normal form submit sends `code=123456`.
- Extra attributes and `class` go to the `<fieldset>`. `disabled` disables every box.
- Translate the box labels with `digitLabel` (default "Digit {index} of {length}").
