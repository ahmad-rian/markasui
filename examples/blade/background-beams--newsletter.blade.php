<x-markas.background-beams
  variant="pulse"
  :count="10"
  class="rounded-xl border border-line bg-canvas p-6"
>
  <form class="grid gap-4">
    <div class="grid gap-1">
      <h3 class="text-xl font-semibold text-ink">The Friday digest</h3>
      <p class="text-sm text-muted">
        One email a week with the best product updates. No spam.
      </p>
    </div>
    <div class="flex items-end gap-2">
      <div class="flex-1">
        <x-markas.input label="Email" type="email" placeholder="you@company.com" />
      </div>
      <x-markas.button type="submit">Subscribe</x-markas.button>
    </div>
  </form>
</x-markas.background-beams>
