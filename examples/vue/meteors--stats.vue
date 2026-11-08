<script setup lang="ts">
import Meteors from "../../components/meteors/Meteors.vue";
</script>

<template>
  <Meteors
    :count="24"
    speed="fast"
    color="success"
    :seed="20"
    class="rounded-xl border border-line bg-surface px-6 py-8"
  >
    <div class="grid gap-5">
      <h3 class="text-base font-semibold text-ink">Last 24 hours</h3>
      <dl class="grid grid-cols-3 gap-3">
        <div class="grid gap-1 rounded-lg border border-line bg-surface p-3">
          <dt class="row-start-2 text-xs text-muted">Deploys</dt>
          <dd class="text-2xl font-semibold text-ink tabular-nums">1,284</dd>
        </div>
        <div class="grid gap-1 rounded-lg border border-line bg-surface p-3">
          <dt class="row-start-2 text-xs text-muted">Uptime</dt>
          <dd class="text-2xl font-semibold text-ink tabular-nums">99.99%</dd>
        </div>
        <div class="grid gap-1 rounded-lg border border-line bg-surface p-3">
          <dt class="row-start-2 text-xs text-muted">p95 latency</dt>
          <dd class="text-2xl font-semibold text-ink tabular-nums">84ms</dd>
        </div>
      </dl>
    </div>
  </Meteors>
</template>
