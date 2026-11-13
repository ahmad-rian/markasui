<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import GridPattern from "../../components/grid-pattern/GridPattern.svelte";
</script>

<GridPattern
  mask="radial"
  cells={[
    [2, 1],
    [10, 2],
    [3, 6],
    [11, 7],
  ]}
  class="rounded-xl border border-line bg-surface px-6 py-12"
>
  <div class="grid justify-items-center gap-4 text-center">
    <h2 class="text-2xl font-semibold text-balance text-ink">
      Plan, build, and ship in one place
    </h2>
    <p class="max-w-80 text-sm text-muted">
      Roadmaps, issues, and releases that stay in sync with your code.
    </p>
    <div class="flex gap-2">
      <Button>Start free</Button>
      <Button variant="secondary">Book a demo</Button>
    </div>
  </div>
</GridPattern>
