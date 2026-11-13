<script lang="ts">
  import CardStack from "../../components/card-stack/CardStack.svelte";

  const cardClass = "grid h-full content-start gap-3 p-6";
  const badge =
    "inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-ink";
  const title = "text-lg font-semibold text-ink";
  const text = "text-sm text-muted";

  const features = [
    {
      title: "Instant search",
      text: "Find any document, comment, or file in milliseconds with typo-tolerant search.",
      icon: "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
    },
    {
      title: "Offline mode",
      text: "Keep working on a plane. Changes sync the moment you are back online.",
      icon: "M4 14a8 8 0 0 1 16 0M8 14a4 4 0 0 1 8 0M12 18h.01",
    },
    {
      title: "Shared inbox",
      text: "Route customer emails to the right teammate without forwarding threads.",
      icon: "M4 6h16v12H4zM4 7l8 6 8-6",
    },
  ];
</script>

<CardStack
  label="Product features"
  prevLabel="Previous feature"
  nextLabel="Next feature"
  cardLabel={"Feature {index} of {total}"}
  items={features}
>
  {#snippet card(feature)}
    <div class={cardClass}>
      <span class={badge}>
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d={feature.icon} />
        </svg>
      </span>
      <h3 class={title}>{feature.title}</h3>
      <p class={text}>{feature.text}</p>
    </div>
  {/snippet}
</CardStack>
