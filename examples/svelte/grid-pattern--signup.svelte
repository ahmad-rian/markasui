<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import GridPattern from "../../components/grid-pattern/GridPattern.svelte";
  import Input from "../../components/input/Input.svelte";
</script>

<GridPattern
  cellSize={24}
  mask="linear"
  cells={[
    [13, 0],
    [16, 1],
    [18, 0],
  ]}
  class="rounded-xl border border-line bg-surface p-6"
>
  <form class="grid gap-4">
    <div class="grid gap-1.5">
      <h3 class="text-lg font-semibold text-ink">Get the changelog</h3>
      <p class="text-sm text-muted">
        One short email when we ship something new. No spam.
      </p>
    </div>
    <div class="flex items-end gap-2">
      <Input
        label="Email"
        type="email"
        placeholder="you@company.com"
        class="flex-1"
      />
      <Button type="submit">Subscribe</Button>
    </div>
  </form>
</GridPattern>
