<script lang="ts">
  import ElasticLine from "../../components/elastic-line/ElasticLine.svelte";

  const wrap = "grid justify-items-start py-4";
  const eyebrow = "text-sm font-medium text-primary";
  const title = "mt-1 text-3xl font-semibold text-ink";
  const line = "w-48";
  const text = "max-w-80 text-sm text-muted";
</script>

<div class={wrap}>
  <p class={eyebrow}>New in Markas</p>
  <h3 class={title}>Build faster, ship calmer</h3>
  <ElasticLine
    variant="pluck"
    color="primary"
    strokeWidth={3}
    reach={16}
    playOnView
    decorative
    class={line}
  />
  <p class={text}>
    Touch the underline and pull: it slips free and vibrates like a string.
  </p>
</div>
