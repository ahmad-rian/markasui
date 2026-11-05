## Blade

```blade
<x-markas.carousel label="Product tour" show-dots>
    <x-slot:plan>
        <div class="h-40 rounded-xl bg-subtle p-5">Plan your week</div>
    </x-slot:plan>
    <x-slot:share>
        <div class="h-40 rounded-xl bg-subtle p-5">Share with your team</div>
    </x-slot:share>
    <x-slot:track>
        <div class="h-40 rounded-xl bg-subtle p-5">Track progress</div>
    </x-slot:track>
</x-markas.carousel>
```

Needs Alpine.js. Every named slot becomes a slide, in the order you write them. For a list, use `<x-slot :name="'slide-'.$index">` inside `@foreach`.

## React

```tsx
import { Carousel } from "@/components/markas/Carousel";

<Carousel label="Product tour" showDots>
  <div className="h-40 rounded-xl bg-subtle p-5">Plan your week</div>
  <div className="h-40 rounded-xl bg-subtle p-5">Share with your team</div>
  <div className="h-40 rounded-xl bg-subtle p-5">Track progress</div>
</Carousel>;
```

## Vue

```vue
<template>
  <Carousel label="Product tour" show-dots>
    <div class="h-40 rounded-xl bg-subtle p-5">Plan your week</div>
    <div class="h-40 rounded-xl bg-subtle p-5">Share with your team</div>
    <div class="h-40 rounded-xl bg-subtle p-5">Track progress</div>
  </Carousel>
</template>
```

## Notes

- Slides scroll with CSS scroll snap, so touch swipe and trackpad scrolling work without extra code.
- Use `perView` 2 or 3 to show several cards at once. The buttons still move one slide per press.
- `slideLabel` and `dotLabel` accept `{index}` and `{total}` placeholders.
- There is no autoplay on purpose.
