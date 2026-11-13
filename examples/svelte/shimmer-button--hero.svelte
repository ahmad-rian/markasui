<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import ShimmerButton from "../../components/shimmer-button/ShimmerButton.svelte";
</script>

<section
  class="grid justify-items-center gap-5 rounded-xl border border-line bg-surface px-6 py-10 text-center"
>
  <span
    class="rounded-full border border-line bg-subtle px-3 py-1 text-xs font-medium text-muted"
  >
    Version 2.0 is out
  </span>
  <div class="grid gap-2">
    <h2 class="text-2xl font-semibold text-ink">
      Ship your dashboard this week
    </h2>
    <p class="text-sm text-muted">
      Copy the components you need. Own every line of code.
    </p>
  </div>
  <div class="flex flex-wrap justify-center gap-3">
    <ShimmerButton>Start building</ShimmerButton>
    <Button variant="ghost">Read the docs</Button>
  </div>
</section>
