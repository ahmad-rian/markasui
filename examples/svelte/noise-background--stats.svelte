<script lang="ts">
  import NoiseBackground from "../../components/noise-background/NoiseBackground.svelte";

  const stats = [
    ["12k", "Teams"],
    ["99.98%", "Uptime"],
    ["4.9", "Rating"],
  ];
</script>

<NoiseBackground
  color="success"
  intensity="low"
  size="fine"
  class="rounded-xl border border-line bg-surface p-6"
>
  <dl class="grid grid-cols-3 gap-4 text-center">
    {#each stats as [value, label] (label)}
      <div class="grid gap-1">
        <dt class="text-sm text-muted">{label}</dt>
        <dd class="text-2xl font-semibold tracking-tight text-ink">
          {value}
        </dd>
      </div>
    {/each}
  </dl>
</NoiseBackground>
