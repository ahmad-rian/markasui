<script lang="ts">
  import DotPattern from "../../components/dot-pattern/DotPattern.svelte";
</script>

<DotPattern
  color="success"
  spacing={24}
  dotSize={1.5}
  mask="radial"
  class="rounded-xl border border-line bg-surface px-6 py-8"
>
  <div class="grid gap-6">
    <h3 class="text-center text-base font-semibold text-ink">
      Trusted by teams in 40 countries
    </h3>
    <dl class="grid grid-cols-3 gap-4 text-center">
      <div class="grid gap-1">
        <dt class="text-xs text-muted">Uptime</dt>
        <dd class="text-2xl font-semibold text-ink">99.99%</dd>
      </div>
      <div class="grid gap-1">
        <dt class="text-xs text-muted">Median latency</dt>
        <dd class="text-2xl font-semibold text-ink">38 ms</dd>
      </div>
      <div class="grid gap-1">
        <dt class="text-xs text-muted">Regions</dt>
        <dd class="text-2xl font-semibold text-ink">24</dd>
      </div>
    </dl>
  </div>
</DotPattern>
