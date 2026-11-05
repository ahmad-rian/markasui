<x-markas.grid-pattern :cell-size="24" mask="linear" :cells="[[13, 0], [16, 1], [18, 0]]" class="rounded-xl border border-line bg-surface p-6">
  <form class="grid gap-4">
    <div class="grid gap-1.5">
      <h3 class="text-lg font-semibold text-ink">Get the changelog</h3>
      <p class="text-sm text-muted">One short email when we ship something new. No spam.</p>
    </div>
    <div class="flex items-end gap-2">
      <x-markas.input label="Email" type="email" placeholder="you@company.com" class="flex-1" />
      <x-markas.button type="submit">Subscribe</x-markas.button>
    </div>
  </form>
</x-markas.grid-pattern>
