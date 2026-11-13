## Blade

```blade
<x-markas.logo-cloud
    title="Trusted by teams across Indonesia"
    :logos="[
        ['name' => 'Nusantara Labs', 'path' => 'M12 2 21 7v10l-9 5-9-5V7Z', 'href' => 'https://example.com'],
        ['name' => 'Kopi Kita'],
    ]"
/>

<x-markas.logo-cloud variant="stats" title="The UI kit behind 2,000+ teams" :logos="$logos" :stats="[['value' => '2,000+', 'label' => 'Teams']]" />

{{-- Custom markup: a slot named after the array key --}}
<x-markas.logo-cloud variant="marquee" :logos="['sagara' => ['name' => 'Sagara']]">
    <x-slot:sagara><img src="/logos/sagara.svg" alt="Sagara" class="h-7" /></x-slot:sagara>
</x-markas.logo-cloud>
```

## React

```tsx
import { LogoCloud } from "@/components/markas/LogoCloud";

<LogoCloud title="Trusted by teams across Indonesia" logos={logos} />

<LogoCloud
  variant="marquee"
  logos={[{ name: "Sagara", logo: <img src="/logos/sagara.svg" alt="Sagara" className="h-7" /> }]}
/>
```

## Vue

```vue
<template>
  <LogoCloud title="Trusted by teams across Indonesia" :logos="logos" />

  <LogoCloud variant="marquee" :logos="logos">
    <template #logo="{ logo }">
      <img :src="logo.src" :alt="logo.name" class="h-7" />
    </template>
  </LogoCloud>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import LogoCloud from "$lib/components/markas/LogoCloud.svelte";
</script>

<LogoCloud title="Trusted by teams across Indonesia" {logos} />

<LogoCloud variant="marquee" {logos}>
  {#snippet logo(item)}
    <img src={`/logos/${item.name}.svg`} alt={item.name} class="h-7" />
  {/snippet}
</LogoCloud>
```

## Astro

```astro
---
import LogoCloud from "@/components/markas/LogoCloud.astro";
---

<LogoCloud title="Trusted by teams across Indonesia" logos={logos} />

<LogoCloud variant="marquee" logos={logos}>
  {(logo) => <img src={`/logos/${logo.name}.svg`} alt={logo.name} class="h-7" />}
</LogoCloud>
```

## Angular

```ts
import { Component } from "@angular/core";
import { LogoCloud, type LogoCloudLogo } from "./markas/logo-cloud.component";

@Component({
  selector: "app-customers",
  imports: [LogoCloud],
  template: `
    <markas-logo-cloud
      title="Trusted by teams across Indonesia"
      [logos]="logos"
    />

    <markas-logo-cloud variant="marquee" [logos]="logos">
      <ng-template let-logo>
        <img
          [src]="'/logos/' + logo.name + '.svg'"
          [alt]="logo.name"
          class="h-7"
        />
      </ng-template>
    </markas-logo-cloud>
  `,
})
export class Customers {
  logos: LogoCloudLogo[] = [];
}
```

## Notes

- No JavaScript in any variant. The marquee is a CSS animation that pauses on hover and focus, fades at the edges, and wraps in place with reduced motion.
- The marquee repeats the list once; the copy is `aria-hidden` and `inert`.
- Logos drawn with `path` use `currentColor`, so they follow light and dark themes. With `grayscale`, images in custom markup are desaturated until hover.
- Layouts react to the section width through container queries.
