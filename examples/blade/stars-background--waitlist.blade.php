<x-markas.stars-background :count="150" :seed="3" color="muted" class="rounded-xl border border-line bg-canvas p-6">
  <form class="grid gap-4">
    <div class="grid gap-1.5">
      <h3 class="text-lg font-semibold text-ink">Join the waitlist</h3>
      <p class="text-sm text-muted">Be first to try Orbit when invites open this spring.</p>
    </div>
    <div class="flex items-end gap-2">
      <x-markas.input label="Email" type="email" placeholder="you@company.com" class="flex-1" />
      <x-markas.button type="submit">Request invite</x-markas.button>
    </div>
  </form>
</x-markas.stars-background>
