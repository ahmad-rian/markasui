<script lang="ts">
  import StackingCards from "../../components/stacking-cards/StackingCards.svelte";

  const scroller =
    "h-96 overflow-y-auto rounded-xl border border-line bg-subtle px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
  const intro = "py-6";
  const title = "text-lg font-semibold text-ink";
  const hint = "mt-1 text-sm text-muted";
  const stack = "gap-4";
  const card =
    "grid h-48 content-start gap-3 rounded-xl border border-line bg-surface p-5";
  const badge =
    "grid size-9 place-items-center rounded-lg bg-primary-soft text-sm font-semibold text-primary";
  const cardTitle = "text-base font-semibold text-ink";
  const cardText = "text-sm text-muted";
  const features = [
    {
      title: "Copy, paste, own it",
      text: "Every component lands in your codebase as plain files you can read and change.",
    },
    {
      title: "Blade, React, and Vue",
      text: "The same classes and props in all three, so teams can share one design.",
    },
    {
      title: "Tokens only",
      text: "Colors come from one theme file, so dark mode and rebrands take minutes.",
    },
    {
      title: "Accessible by default",
      text: "Native elements, keyboard support, and reduced motion are built in.",
    },
  ];
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section tabindex="0" aria-label="Product features" class={scroller}>
  <div class={intro}>
    <h3 class={title}>Why teams pick Markas</h3>
    <p class={hint}>Scroll to stack the cards</p>
  </div>
  <StackingCards class={stack}>
    {#each features as feature, index (feature.title)}<article class={card}>
        <span class={badge}>{index + 1}</span>
        <h4 class={cardTitle}>{feature.title}</h4>
        <p class={cardText}>{feature.text}</p>
      </article>{/each}
  </StackingCards>
</section>
