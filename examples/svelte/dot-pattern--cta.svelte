<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import DotPattern from "../../components/dot-pattern/DotPattern.svelte";
</script>

<DotPattern
  color="primary"
  mask="linear"
  spacing={20}
  class="rounded-xl border border-line bg-surface p-6"
>
  <div class="grid gap-4">
    <div class="grid gap-1.5">
      <h3 class="text-lg font-semibold text-ink">
        Ready to launch your next project?
      </h3>
      <p class="text-sm text-muted">
        Start with a free workspace. Upgrade when your team grows.
      </p>
    </div>
    <div class="flex gap-2">
      <Button>Create workspace</Button>
      <Button variant="ghost">Talk to sales</Button>
    </div>
  </div>
</DotPattern>
