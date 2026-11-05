## Blade

```blade
<div class="relative h-dvh overflow-hidden">
    <main class="h-full overflow-y-auto pb-28">...</main>
    <x-markas.bottom-navigation
        shrink-on-scroll
        default-value="home"
        action-label="New transfer"
        class="absolute inset-x-4 bottom-4"
        x-on:change="console.log($event.detail)"
        :items="[
            ['value' => 'home', 'label' => 'Home', 'icon' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z'],
            ['value' => 'activity', 'label' => 'Activity', 'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6', 'badge' => 2],
            ['value' => 'profile', 'label' => 'Profile', 'href' => '/profile', 'icon' => 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'],
        ]"
    >
        <x-slot:action>
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </x-slot:action>
    </x-markas.bottom-navigation>
</div>
```

## React

```tsx
import { BottomNavigation } from "@/components/markas/BottomNavigation";

const [tab, setTab] = useState("home");

<BottomNavigation
  items={items}
  value={tab}
  onValueChange={setTab}
  shrinkOnScroll
  action={<PlusIcon className="size-6" />}
  actionLabel="New transfer"
  onAction={openTransfer}
  className="absolute inset-x-4 bottom-4"
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import BottomNavigation from "@/components/markas/BottomNavigation.vue";

const tab = ref("home");
</script>

<template>
  <BottomNavigation
    v-model="tab"
    :items="items"
    shrink-on-scroll
    action-label="New transfer"
    class="absolute inset-x-4 bottom-4"
    @action="openTransfer"
  >
    <template #action><PlusIcon class="size-6" /></template>
  </BottomNavigation>
</template>
```

## Notes

- Place the bar inside the element that scrolls (or next to it, in the same parent). shrinkOnScroll listens to scrolling inside the bar's parent element and on the page.
- Give the scrolling content bottom padding (about pb-28) so the last row is not hidden under the bar.
- The pill and labels are pure CSS driven by the selected index, so the first render already shows the right state on the server.
- Items with href stay real links. Pressing one still updates the pill for single page apps.
