## Blade

```blade
<x-markas.pinned-list
    :default-pinned="$user->pinned_channels"
    pin-label="Sematkan {label}"
    unpin-label="Lepas sematan {label}"
    pinned-label="Disematkan"
    all-label="Semua"
    pinned-message="{label} disematkan"
    unpinned-message="Sematan {label} dilepas"
    x-on:change="fetch('/pins', { method: 'PUT', body: JSON.stringify($event.detail) })"
    :items="[
        ['value' => 'umum', 'label' => 'umum', 'description' => 'Pengumuman perusahaan', 'meta' => '128'],
        ['value' => 'desain', 'label' => 'kritik-desain', 'description' => 'Kritik mingguan', 'meta' => '14'],
        ['value' => 'santai', 'label' => 'santai', 'meta' => '9'],
    ]"
/>
```

## React

```tsx
import { PinnedList } from "@/components/markas/PinnedList";

const [pinned, setPinned] = useState<string[]>(["desain"]);

<PinnedList
  items={channels}
  pinned={pinned}
  onPinnedChange={setPinned}
  pinLabel="Sematkan {label}"
  unpinLabel="Lepas sematan {label}"
  pinnedLabel="Disematkan"
  allLabel="Semua"
  pinnedMessage="{label} disematkan"
  unpinnedMessage="Sematan {label} dilepas"
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import PinnedList from "@/components/markas/PinnedList.vue";

const pinned = ref(["desain"]);
</script>

<template>
  <PinnedList
    v-model:pinned="pinned"
    :items="channels"
    pin-label="Sematkan {label}"
    unpin-label="Lepas sematan {label}"
    pinned-label="Disematkan"
    all-label="Semua"
    pinned-message="{label} disematkan"
    unpinned-message="Sematan {label} dilepas"
  />
</template>
```

## Catatan

- Baris tersemat mengikuti urutan items, jadi melepas sematan mengembalikan baris ke tempat asalnya.
- Perpindahan memakai FLIP: setiap baris diukur sebelum dan sesudah perubahan lalu dianimasikan dari posisi lama dengan Web Animations API. Tidak perlu library tata letak.
- {label} di pinLabel, unpinLabel, pinnedMessage, dan unpinnedMessage diganti label baris.
- Blade merender baris dengan Alpine x-for dan butuh Alpine.js.
