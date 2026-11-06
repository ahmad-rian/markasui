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

## Notes

- The field grows with its content up to maxHeight, then scrolls. It uses CSS field-sizing and falls back to measuring in older browsers.
- Enter sends, Shift+Enter adds a line. The text and the attached files are cleared after a send.
- The send button is only active when there is text. While loading it becomes a stop button and fires stop.
- In Blade the x-on handlers run inside the component, so `loading = true` in x-on:send switches it to the stop button.
