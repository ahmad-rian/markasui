<script lang="ts">
  import TextHighlighter from "../../components/text-highlighter/TextHighlighter.svelte";

  const primary =
    "inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const outline =
    "inline-flex h-9 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  let active = $state(false);
</script>

<div class="grid gap-4">
  <p class="text-base leading-7 text-muted">
    Before you publish, check that the
    <TextHighlighter trigger="manual" {active}
      >title fits in 60 characters</TextHighlighter
    >, every image has
    <TextHighlighter trigger="manual" {active} color="success" delay={250}
      >alt text</TextHighlighter
    >, and the summary answers
    <TextHighlighter trigger="manual" {active} color="danger" delay={500}
      >one clear question</TextHighlighter
    >.
  </p>
  <div class="flex gap-2">
    <button type="button" class={primary} onclick={() => (active = true)}>
      Highlight
    </button>
    <button type="button" class={outline} onclick={() => (active = false)}>
      Reset
    </button>
  </div>
</div>
