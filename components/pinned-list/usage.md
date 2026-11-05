## Blade

```blade
<x-markas.pinned-list
    :default-pinned="$user->pinned_channels"
    x-on:change="fetch('/pins', { method: 'PUT', body: JSON.stringify($event.detail) })"
    :items="[
        ['value' => 'general', 'label' => 'general', 'description' => 'Company-wide announcements', 'meta' => '128'],
        ['value' => 'design', 'label' => 'design-crit', 'description' => 'Weekly critiques', 'meta' => '14'],
        ['value' => 'random', 'label' => 'random', 'meta' => '9'],
    ]"
/>
```

## React

```tsx
import { PinnedList } from "@/components/markas/PinnedList";

const [pinned, setPinned] = useState<string[]>(["design"]);

<PinnedList items={channels} pinned={pinned} onPinnedChange={setPinned} />;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import PinnedList from "@/components/markas/PinnedList.vue";

const pinned = ref(["design"]);
</script>

<template>
  <PinnedList v-model:pinned="pinned" :items="channels" />
</template>
```

## Notes

- Pinned rows keep the order of items, so unpinning returns a row to its original place.
- The move uses FLIP: every row is measured before and after the change and animated from the old spot with the Web Animations API. No layout library is needed.
- {label} in pinLabel, unpinLabel, pinnedMessage, and unpinnedMessage is replaced by the row label.
- Blade renders the rows with Alpine x-for and needs Alpine.js.
