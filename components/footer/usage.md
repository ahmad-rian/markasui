## Blade

```blade
<x-markas.footer
    description="Invoicing and payroll for Indonesian small businesses."
    copyright="© 2026 PT Rapi Teknologi Indonesia"
    :back-to-top="true"
    :columns="[
        ['title' => 'Product', 'links' => [
            ['label' => 'Invoicing', 'href' => '/invoicing'],
            ['label' => 'Payroll', 'href' => '/payroll'],
        ]],
        ['title' => 'Company', 'links' => [
            ['label' => 'About', 'href' => '/about'],
            ['label' => 'Careers', 'href' => '/careers'],
        ]],
    ]"
    :socials="[
        ['label' => 'X', 'href' => 'https://x.com/rapi', 'icon' => 'M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4'],
    ]"
    :legal="[
        ['label' => 'Privacy', 'href' => '/privacy'],
        ['label' => 'Terms', 'href' => '/terms'],
    ]"
>
    <x-slot:brand>Rapi</x-slot:brand>
</x-markas.footer>

{{-- Landing page closer --}}
<x-markas.footer variant="cta" heading="Close your books in minutes" copyright="© 2026 Rapi">
    <x-slot:brand>Rapi</x-slot:brand>
    <x-slot:actions>
        <x-markas.button>Start free trial</x-markas.button>
        <x-markas.button variant="secondary">Talk to sales</x-markas.button>
    </x-slot:actions>
</x-markas.footer>
```

Only the built-in newsletter form needs Alpine.js. Every other variant is plain HTML.

## React

```tsx
import { Footer } from "@/components/markas/Footer";

<Footer
  brand="Rapi"
  description="Invoicing and payroll for Indonesian small businesses."
  copyright="© 2026 PT Rapi Teknologi Indonesia"
  backToTop
  columns={[
    {
      title: "Product",
      links: [
        { label: "Invoicing", href: "/invoicing" },
        { label: "Payroll", href: "/payroll" },
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
      href: "https://x.com/rapi",
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
  brand="Rapi"
  wordmark="Rapi"
  copyright="© 2026 Rapi"
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
      { label: "Invoicing", href: "/invoicing" },
      { label: "Payroll", href: "/payroll" },
    ],
  },
];
</script>

<template>
  <Footer
    variant="newsletter"
    newsletter-description="One email a month. No spam."
    copyright="© 2026 Rapi"
    :columns="columns"
  >
    <template #brand>Rapi</template>
  </Footer>
</template>
```

## Notes

- The layout responds to the footer's own width (container queries), so it stacks correctly inside a narrow column as well as on a phone.
- The built-in newsletter form validates the email natively and shows `successLabel` in a `role="status"` region without any network request. Pass the `newsletter` slot with your own form to send the address to a provider.
- In React the file is a Client Component only because of the newsletter form state. The bundle stays under 3 KB gzip.
- `backToTop` is a plain link to `#top`, which browsers scroll to the top of the page without JavaScript.
- The wordmark of `big-brand` is sized from its character count, so short brand names (3 to 8 letters) fill the width best.
