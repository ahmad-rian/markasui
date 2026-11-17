## Blade

```blade
<div x-data="{ island: 'compact' }">
    <x-markas.dynamic-island
        state="compact"
        x-model="island"
        :announcements="['expanded' => 'Focus timer, 12 minutes left']"
    >
        <x-slot:leading><svg aria-hidden="true">...</svg></x-slot:leading>
        <x-slot:trailing><span class="tabular-nums">12:48</span></x-slot:trailing>
        <x-slot:expanded>
            <p>Focus timer</p>
            <button type="button" x-on:click="island = 'idle'">End</button>
        </x-slot:expanded>
    </x-markas.dynamic-island>
    <button type="button" x-on:click="island = 'expanded'">Show timer</button>
</div>
```

## React

```tsx
import { DynamicIsland } from "@/components/markas/DynamicIsland";

const [state, setState] = useState<"idle" | "compact" | "expanded">("compact");

<DynamicIsland
  state={state}
  leading={<TimerIcon />}
  trailing={<span className="tabular-nums">12:48</span>}
  expanded={<TimerCard onEnd={() => setState("idle")} />}
  announcements={{ expanded: "Focus timer, 12 minutes left" }}
/>;
```

## Vue

```vue
<script setup lang="ts">
import DynamicIsland from "@/components/markas/DynamicIsland.vue";

const state = ref<"idle" | "compact" | "expanded">("compact");
</script>

<template>
  <DynamicIsland :state="state" :announcements="{ expanded: 'Focus timer' }">
    <template #leading><TimerIcon /></template>
    <template #trailing><span class="tabular-nums">12:48</span></template>
    <template #expanded><TimerCard @end="state = 'idle'" /></template>
  </DynamicIsland>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import DynamicIsland, {
    type DynamicIslandState,
  } from "$lib/components/markas/DynamicIsland.svelte";

  let state = $state<DynamicIslandState>("compact");
</script>

<DynamicIsland
  {state}
  announcements={{ expanded: "Focus timer, 12 minutes left" }}
>
  {#snippet leading()}<TimerIcon />{/snippet}
  {#snippet trailing()}<span class="tabular-nums">12:48</span>{/snippet}
  {#snippet expanded()}
    <TimerCard onEnd={() => (state = "idle")} />
  {/snippet}
</DynamicIsland>
```

## Astro

```astro
---
import DynamicIsland from "@/components/markas/DynamicIsland.astro";
---

<DynamicIsland
  state="compact"
  announcements={{ expanded: "Focus timer, 12 minutes left" }}
>
  <TimerIcon slot="leading" />
  <span slot="trailing" class="tabular-nums">12:48</span>
  <TimerCard slot="expanded" />
</DynamicIsland>

<script>
  document
    .querySelector("markas-dynamic-island")
    ?.setAttribute("state", "expanded");
</script>
```

The island renders its first state on the server. Change it later by setting the `state` attribute on `markas-dynamic-island`; the panels, inert, and announcement follow.

## Angular

```ts
import { Component, signal } from "@angular/core";
import {
  DynamicIsland,
  type DynamicIslandState,
} from "./markas/dynamic-island.component";

@Component({
  selector: "app-timer-island",
  imports: [DynamicIsland],
  template: `
    <markas-dynamic-island [state]="state()" [announcements]="announcements">
      <span leading class="size-2 rounded-full bg-warning"></span>
      <span trailing class="tabular-nums">12:48</span>
      <div expanded>
        <button type="button" (click)="state.set('idle')">End</button>
      </div>
    </markas-dynamic-island>
  `,
})
export class TimerIsland {
  state = signal<DynamicIslandState>("compact");
  announcements = { expanded: "Focus timer, 12 minutes left" };
}
```

Elements with the `idle`, `leading`, `trailing`, or `expanded` attribute fill the matching slot. An `ng-container` works too.

## Notes

- Width, height, and corner radius move with one springy CSS transition. The incoming content fades and sharpens in a beat later.
- Each state's content keeps its final size and is revealed by the growing pill, so text never reflows mid-animation.
- The island adds the dark class to itself, so it is a black pill on light pages and a ringed one on dark pages, and nested components use dark tokens.
- Sizes come from `--island-idle-width`, `--island-compact-width`, `--island-expanded-width`, and `--island-expanded-height` (defaults 7.5rem, 15rem, 22rem, 9.5rem).
