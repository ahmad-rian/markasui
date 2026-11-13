<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import GradientBorder from "../../components/gradient-border/GradientBorder.svelte";
</script>

<div class="grid grid-cols-2 gap-4 p-4">
  <div class="grid gap-2 rounded-xl border border-line bg-surface p-5">
    <h3 class="text-base font-semibold text-ink">Starter</h3>
    <p class="text-2xl font-bold text-ink">$0</p>
    <p class="text-sm text-muted">For side projects.</p>
    <Button variant="secondary">Choose</Button>
  </div>
  <GradientBorder variant="pulse" glow>
    <div class="grid gap-2 p-5">
      <h3 class="text-base font-semibold text-ink">Team</h3>
      <p class="text-2xl font-bold text-ink">$49</p>
      <p class="text-sm text-muted">Most popular.</p>
      <Button>Choose</Button>
    </div>
  </GradientBorder>
</div>
