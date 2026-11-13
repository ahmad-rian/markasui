## Blade

```blade
<x-markas.prompt-input
    :models="['Markas Pro', 'Markas Mini']"
    model="Markas Pro"
    :max-length="2000"
    accept="image/*,.pdf"
    x-on:send="ask($event.detail.text, $event.detail.files); loading = true"
    x-on:stop="cancel(); loading = false"
/>
```

## React

```tsx
import { PromptInput } from "@/components/markas/PromptInput";

const [loading, setLoading] = useState(false);

<PromptInput
  models={["Markas Pro", "Markas Mini"]}
  model="Markas Pro"
  maxLength={2000}
  loading={loading}
  onSend={({ text, files }) => {
    setLoading(true);
    ask(text, files).finally(() => setLoading(false));
  }}
  onStop={cancel}
/>;
```

## Vue

```vue
<script setup lang="ts">
import PromptInput from "@/components/markas/PromptInput.vue";

const model = ref("Markas Pro");
const loading = ref(false);
</script>

<template>
  <PromptInput
    v-model:model="model"
    :models="['Markas Pro', 'Markas Mini']"
    :max-length="2000"
    :loading="loading"
    @send="({ text, files }) => ask(text, files)"
    @stop="cancel"
  >
    <template #actions>
      <button type="button" aria-pressed="false">Search</button>
    </template>
  </PromptInput>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import PromptInput from "$lib/components/markas/PromptInput.svelte";

  let text = $state("");
  let loading = $state(false);
</script>

<PromptInput
  bind:value={text}
  {loading}
  models={["Markas Pro", "Markas Mini"]}
  model="Markas Pro"
  onSend={({ text, files }) => (loading = true)}
  onStop={() => (loading = false)}
/>
```

## Astro

```astro
---
import PromptInput from "@/components/markas/PromptInput.astro";
---

<PromptInput models={["Markas Pro", "Markas Mini"]} model="Markas Pro" />

<script>
  const input = document.querySelector("markas-prompt-input");
  input?.addEventListener("send", () => input.toggleAttribute("loading", true));
  input?.addEventListener("stop", () => input.toggleAttribute("loading", false));
</script>
```

The bundled script dispatches `send` with `{ text, files }` and `stop` on `markas-prompt-input`; set or remove its `loading` attribute to switch the button.

## Angular

```ts
import { Component, signal } from "@angular/core";
import {
  PromptInput,
  type PromptInputValue,
} from "./markas/prompt-input.component";

@Component({
  selector: "app-chat",
  imports: [PromptInput],
  template: `
    <markas-prompt-input
      [(value)]="text"
      [loading]="loading()"
      [models]="['Markas Pro', 'Markas Mini']"
      model="Markas Pro"
      (send)="onSend($event)"
      (stop)="loading.set(false)"
    />
  `,
})
export class Chat {
  readonly text = signal("");
  readonly loading = signal(false);
  onSend(value: PromptInputValue) {
    this.loading.set(true);
  }
}
```

## Notes

- The field grows with its content up to maxHeight, then scrolls. It uses CSS field-sizing and falls back to measuring in older browsers.
- Enter sends, Shift+Enter adds a line. The text and the attached files are cleared after a send.
- The send button is only active when there is text. While loading it becomes a stop button and fires stop.
- In Blade the x-on handlers run inside the component, so `loading = true` in x-on:send switches it to the stop button.
