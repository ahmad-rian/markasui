## Blade

Mount the region once in your layout, for example before `</body>`:

```blade
<x-markas.toast :initial="session('toast') ? [session('toast')] : []" />
```

Trigger a toast from Alpine or plain JavaScript:

```blade
<x-markas.button x-data x-on:click="$dispatch('markas-toast', { title: 'Changes saved', variant: 'success' })">Save</x-markas.button>
```

```js
window.dispatchEvent(
  new CustomEvent("markas-toast", {
    detail: { title: "Could not send", variant: "danger", duration: 0 },
  }),
);
```

Needs Alpine.js. Livewire 3 already ships it.

## React

```tsx
import { Toaster, toast } from "@/components/markas/Toast";

// In the layout
<Toaster />;

// Anywhere
toast({
  title: "Changes saved",
  description: "Your profile has been updated",
  variant: "success",
});
```

## Vue

```vue
<script setup lang="ts">
import Toaster, { toast } from "@/components/markas/Toast.vue";
</script>

<template>
  <Button @click="toast({ title: 'Changes saved', variant: 'success' })">
    Save
  </Button>
  <Toaster />
</template>
```

## Notes

- Toast details: `title`, `description`, `variant` (`default`, `success`, `danger`), and `duration` in milliseconds (default 5000, `0` keeps it until closed).
- The timer pauses while a toast is hovered or holds focus.
- `toast()` returns an id. In React and Vue, call `dismissToast(id)` to close it from code.
- The toast queue lives at module level, so one `Toaster` per app is enough.
- Call `toast()` only in the browser, for example in an event handler, `useEffect` (React), or `onMounted` (Vue). During server rendering (SSR) `toast()` does nothing and returns `0`.
- The region is labelled "Notifications" and each close button "Close". Translate them with `regionLabel` and `closeLabel` (Blade: `region-label`, `close-label`).
