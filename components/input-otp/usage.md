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

## Svelte

```svelte
<script lang="ts">
  import InputOTP from "$lib/components/markas/InputOTP.svelte";

  let code = $state("");
</script>

<InputOTP
  bind:value={code}
  name="code"
  label="Verification code"
  oncomplete={(value) => verify(value)}
/>
```

## Astro

```astro
---
import InputOTP from "@/components/markas/InputOTP.astro";
---

<InputOTP name="code" label="Verification code" />

<script>
  document.addEventListener("markas-complete", (event) => {
    verify((event as CustomEvent<string>).detail);
  });
</script>
```

One small script per page handles every field. Like Blade, the fieldset dispatches `markas-change` and `markas-complete` events with the code in `detail`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { InputOTP } from "./markas/input-otp.component";

@Component({
  selector: "app-verify",
  imports: [InputOTP],
  template: `
    <markas-input-otp
      [(value)]="code"
      name="code"
      label="Verification code"
      (complete)="verify($event)"
    />
  `,
})
export class Verify {
  readonly code = signal("");

  verify(code: string) {
    // Send the code to your API.
  }
}
```

## Notes

- The boxes accept digits only. Pasting a full code fills every box, even with spaces or dashes in it.
- `name` goes to one hidden input that holds the joined code, so a normal form submit sends `code=123456`.
- Extra attributes and `class` go to the `<fieldset>`. `disabled` disables every box.
- Translate the box labels with `digitLabel` (default "Digit {index} of {length}").
