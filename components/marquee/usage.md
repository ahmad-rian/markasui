## Blade

```blade
<x-markas.marquee :duration="25">
    @foreach ($logos as $logo)
        <img src="{{ $logo['src'] }}" alt="{{ $logo['name'] }}" class="h-8" />
    @endforeach
</x-markas.marquee>

<x-markas.marquee vertical reverse class="h-64">...</x-markas.marquee>
```

## React

```tsx
import { Marquee } from "@/components/markas/Marquee";

<Marquee duration={25}>
  {logos.map((logo) => (
    <img key={logo.name} src={logo.src} alt={logo.name} className="h-8" />
  ))}
</Marquee>

<Marquee vertical reverse className="h-64">...</Marquee>
```

## Vue

```vue
<template>
  <Marquee :duration="25">
    <img
      v-for="logo in logos"
      :key="logo.name"
      :src="logo.src"
      :alt="logo.name"
      class="h-8"
    />
  </Marquee>

  <Marquee vertical reverse class="h-64">...</Marquee>
</template>
```

## Notes

- Pass the items of one loop. The component renders them twice; the copy is `aria-hidden` and `inert`.
- Each copy is at least as wide as the marquee, so short lists still loop without a gap.
- Motion uses the Web Animations API and pauses on hover, on focus inside, and off screen. The Blade version needs Alpine.js.
- With reduced motion, nothing moves. Do not put information users need only inside a marquee.
