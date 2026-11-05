<x-markas.grid-pattern color="success" :cell-size="20" :cells="[[10, 0], [14, 1], [17, 0], [20, 1], [22, 0]]" class="rounded-xl border border-line bg-surface p-6">
  <div class="grid gap-3">
    <x-markas.badge variant="success" class="justify-self-start">Operational</x-markas.badge>
    <div class="grid gap-1">
      <h3 class="text-lg font-semibold text-ink">All systems running</h3>
      <p class="text-sm text-muted">API, dashboard, and webhooks are healthy. Last checked 1 minute ago.</p>
    </div>
  </div>
</x-markas.grid-pattern>
