<script lang="ts">
  import BackgroundBeams from "../../components/background-beams/BackgroundBeams.svelte";
</script>

<BackgroundBeams
  variant="collide"
  count={10}
  class="rounded-xl border border-line bg-surface px-6 pt-8 pb-16"
>
  <div class="grid gap-6">
    <div class="grid gap-1 text-center">
      <h3 class="text-2xl font-semibold text-ink">Built for impact</h3>
      <p class="text-sm text-muted">
        Every deploy lands safely, no matter how fast you ship.
      </p>
    </div>
    <ul class="grid grid-cols-3 gap-3 text-center">
      <li class="rounded-lg border border-line bg-surface p-3">
        <p class="text-lg font-semibold text-ink">99.99%</p>
        <p class="text-xs text-muted">Uptime</p>
      </li>
      <li class="rounded-lg border border-line bg-surface p-3">
        <p class="text-lg font-semibold text-ink">40 ms</p>
        <p class="text-xs text-muted">Edge latency</p>
      </li>
      <li class="rounded-lg border border-line bg-surface p-3">
        <p class="text-lg font-semibold text-ink">1 click</p>
        <p class="text-xs text-muted">Rollback</p>
      </li>
    </ul>
  </div>
</BackgroundBeams>
