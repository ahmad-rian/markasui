<script lang="ts">
  import TextRotate from "../../components/text-rotate/TextRotate.svelte";
</script>

<div class="py-4 text-center">
  <h2 class="text-4xl font-semibold tracking-tight text-ink">
    Ship <TextRotate
      words={["faster", "with confidence", "every Friday"]}
      split="words"
      from="center"
      class="rounded-lg bg-primary px-3 text-on-primary"
    />
  </h2>
  <p class="mx-auto mt-4 max-w-sm text-sm text-muted">
    One component library for Blade, React, and Vue.
  </p>
</div>
