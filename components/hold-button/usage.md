## Blade

```blade
<form method="POST" action="/workspace" x-data x-on:complete="$el.submit()">
    @csrf
    @method('DELETE')
    <x-markas.hold-button variant="danger" :duration="2000">Hold to delete</x-markas.hold-button>
</form>
```

## React

```tsx
import { HoldButton } from "@/components/markas/HoldButton";

<HoldButton variant="danger" duration={2000} onComplete={deleteWorkspace}>
  Hold to delete
</HoldButton>;
```

## Vue

```vue
<script setup lang="ts">
import HoldButton from "@/components/markas/HoldButton.vue";
</script>

<template>
  <HoldButton variant="danger" :duration="2000" @complete="deleteWorkspace">
    Hold to delete
  </HoldButton>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import HoldButton from "$lib/components/markas/HoldButton.svelte";
</script>

<HoldButton variant="danger" duration={2000} oncomplete={deleteWorkspace}>
  Hold to delete
</HoldButton>
```

## Astro

```astro
---
import HoldButton from "@/components/markas/HoldButton.astro";
---

<HoldButton id="delete-workspace" variant="danger" duration={2000}>
  Hold to delete
</HoldButton>

<script>
  document
    .getElementById("delete-workspace")
    ?.addEventListener("complete", () => deleteWorkspace());
</script>
```

## Angular

```ts
import { Component } from "@angular/core";
import { HoldButton } from "./markas/hold-button.component";

@Component({
  selector: "app-dangerzone",
  imports: [HoldButton],
  template: `
    <markas-hold-button
      variant="danger"
      [duration]="2000"
      (complete)="deleteWorkspace()"
    >
      Hold to delete
    </markas-hold-button>
  `,
})
export class DangerZone {
  deleteWorkspace() {}
}
```

Astro dispatches a bubbling `complete` DOM event from the button. Angular moves `id`, `aria-label`, `title`, and `class` from `markas-hold-button` to the inner button.

## Notes

- Run the action in the complete event. A short click does nothing.
- Pointer up, pointer leave, blur, or releasing Space or Enter before the end cancels and the fill slides back.
- The button keeps data-state="complete" until it is released. Blade dispatches a bubbling `complete` DOM event and needs Alpine.js.
