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

## Notes

- Run the action in the complete event. A short click does nothing.
- Pointer up, pointer leave, blur, or releasing Space or Enter before the end cancels and the fill slides back.
- The button keeps data-state="complete" until it is released. Blade dispatches a bubbling `complete` DOM event and needs Alpine.js.
