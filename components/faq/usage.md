## Blade

```blade
<x-markas.faq
    variant="split"
    title="Frequently asked questions"
    description="Everything you need to know about plans and billing."
    exclusive
    schema
    :items="[
        ['question' => 'Is there a free trial?', 'answer' => 'Yes. Every plan starts with a 14 day trial.'],
        ['question' => 'Can I cancel at any time?', 'answer' => 'Yes. Your plan stays active until the end of the period.'],
    ]"
>
    <x-slot:contact>Still have questions? <a href="/contact">Contact support</a></x-slot:contact>
</x-markas.faq>

<x-markas.faq variant="searchable" title="Help center" :items="$faqs" />
```

## React

```tsx
import { Faq } from "@/components/markas/Faq";

<Faq
  variant="split"
  title="Frequently asked questions"
  items={faqs}
  exclusive
  schema
  contact={
    <>
      Still have questions? <a href="/contact">Contact support</a>
    </>
  }
/>

<Faq variant="categories" title="Help center" items={faqsWithCategory} />
```

## Vue

```vue
<template>
  <Faq
    variant="split"
    title="Frequently asked questions"
    :items="faqs"
    exclusive
    schema
  >
    <template #contact>
      Still have questions? <a href="/contact">Contact support</a>
    </template>
  </Faq>

  <Faq variant="searchable" title="Help center" :items="faqs" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Faq from "$lib/components/markas/Faq.svelte";
</script>

<Faq
  variant="split"
  title="Frequently asked questions"
  items={faqs}
  exclusive
  schema
>
  {#snippet contact()}
    Still have questions? <a href="/contact">Contact support</a>
  {/snippet}
</Faq>

<Faq variant="searchable" title="Help center" items={faqs} />
```

## Astro

```astro
---
import Faq from "@/components/markas/Faq.astro";
---

<Faq variant="split" title="Frequently asked questions" items={faqs} exclusive schema>
  <Fragment slot="contact">
    Still have questions? <a href="/contact">Contact support</a>
  </Fragment>
</Faq>

<Faq variant="categories" title="Help center" items={faqsWithCategory} />
```

searchable and categories use one small bundled script per page. The other variants ship no JavaScript.

## Angular

```ts
import { Component } from "@angular/core";
import { Faq, type FaqItem } from "./markas/faq.component";

@Component({
  selector: "app-help",
  imports: [Faq],
  template: `
    <markas-faq
      variant="split"
      title="Frequently asked questions"
      [items]="faqs"
      exclusive
      schema
    >
      <ng-container contact>
        Still have questions? <a href="/contact">Contact support</a>
      </ng-container>
    </markas-faq>
  `,
})
export class Help {
  faqs: FaqItem[] = [];
}
```

## Notes

- Opening and closing is native `details`, so simple, split, cards, and centered need no JavaScript. Heights animate with `::details-content` and `interpolate-size` where supported and simply snap elsewhere.
- searchable and categories need a little state. The Blade version needs Alpine.js for those two variants only.
- Layouts react to the section width through container queries, so split and cards stack inside narrow columns.
- `schema` prints FAQPage JSON-LD built from the same items. Use it once per page.
