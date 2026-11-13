## Blade

```blade
<x-markas.footer
    description="UI components for Blade, React, and Vue."
    copyright="© 2026 MarkasUI"
    :back-to-top="true"
    :columns="[
        ['title' => 'Product', 'links' => [
            ['label' => 'Components', 'href' => '/components'],
            ['label' => 'Templates', 'href' => '/templates'],
        ]],
        ['title' => 'Company', 'links' => [
            ['label' => 'About', 'href' => '/about'],
            ['label' => 'Careers', 'href' => '/careers'],
        ]],
    ]"
    :socials="[
        ['label' => 'X', 'href' => 'https://x.com/markasui', 'icon' => 'M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4'],
    ]"
    :legal="[
        ['label' => 'Privacy', 'href' => '/privacy'],
        ['label' => 'Terms', 'href' => '/terms'],
    ]"
>
    <x-slot:brand>MarkasUI</x-slot:brand>
</x-markas.footer>

{{-- Landing page closer --}}
<x-markas.footer variant="cta" heading="Ship your next interface this week" copyright="© 2026 MarkasUI">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button>Browse components</x-markas.button>
        <x-markas.button variant="secondary">Read the docs</x-markas.button>
    </x-slot:actions>
</x-markas.footer>
```

Only the built-in newsletter form needs Alpine.js. Every other variant is plain HTML.

## React

```tsx
import { Footer } from "@/components/markas/Footer";

<Footer
  brand="MarkasUI"
  description="UI components for Blade, React, and Vue."
  copyright="© 2026 MarkasUI"
  backToTop
  columns={[
    {
      title: "Product",
      links: [
        { label: "Components", href: "/components" },
        { label: "Templates", href: "/templates" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ]}
  socials={[
    {
      label: "X",
      href: "https://x.com/markasui",
      icon: "M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4",
    },
  ]}
  legal={[
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ]}
/>;

<Footer
  variant="big-brand"
  brand="MarkasUI"
  wordmark="MarkasUI"
  copyright="© 2026 MarkasUI"
/>;
```

## Vue

```vue
<script setup lang="ts">
import Footer from "@/components/markas/Footer.vue";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
    ],
  },
];
</script>

<template>
  <Footer
    variant="newsletter"
    newsletter-description="One email a month. No spam."
    copyright="© 2026 MarkasUI"
    :columns="columns"
  >
    <template #brand>MarkasUI</template>
  </Footer>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Footer from "$lib/components/markas/Footer.svelte";

  const columns = [
    {
      title: "Product",
      links: [
        { label: "Components", href: "/components" },
        { label: "Templates", href: "/templates" },
      ],
    },
  ];
</script>

<Footer
  variant="newsletter"
  newsletterDescription="One email a month. No spam."
  copyright="© 2026 MarkasUI"
  {columns}
>
  {#snippet brand()}MarkasUI{/snippet}
</Footer>
```

## Astro

```astro
---
import Footer from "@/components/markas/Footer.astro";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
    ],
  },
];
---

<Footer
  variant="newsletter"
  newsletterDescription="One email a month. No spam."
  copyright="© 2026 MarkasUI"
  columns={columns}
  backToTop
>
  <Fragment slot="brand">MarkasUI</Fragment>
</Footer>
```

The footer renders on the server. Only the built-in newsletter form uses a small bundled script, shared by every footer on the page.

## Angular

```ts
import { Component } from "@angular/core";
import { Footer, type FooterColumn } from "./markas/footer.component";

@Component({
  selector: "app-site-footer",
  imports: [Footer],
  template: `
    <footer
      markas-footer
      variant="newsletter"
      newsletterDescription="One email a month. No spam."
      copyright="© 2026 MarkasUI"
      [columns]="columns"
      backToTop
    >
      <ng-container brand>MarkasUI</ng-container>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly columns: FooterColumn[] = [
    {
      title: "Product",
      links: [
        { label: "Components", href: "/components" },
        { label: "Templates", href: "/templates" },
      ],
    },
  ];
}
```

Footer is an attribute component on a native `footer`, so `class`, `id`, and `aria-*` stay on that element. Put slot content in an element (or `ng-container`) with the `brand`, `actions`, or `newsletter` attribute.

## Notes

- The layout responds to the footer's own width (container queries), so it stacks correctly inside a narrow column as well as on a phone.
- The built-in newsletter form validates the email natively and shows `successLabel` in a `role="status"` region without any network request. Pass the `newsletter` slot with your own form to send the address to a provider.
- In React the file is a Client Component only because of the newsletter form state. The bundle stays under 3 KB gzip.
- `backToTop` is a plain link to `#top`, which browsers scroll to the top of the page without JavaScript.
- The wordmark of `big-brand` is sized from its character count, so short brand names (3 to 8 letters) fill the width best.
- The `cta` block always uses the dark palette (it carries the `dark` class), so buttons in `actions` invert automatically in both themes.
