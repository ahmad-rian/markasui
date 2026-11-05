<div class="overflow-hidden rounded-xl border border-line bg-surface">
  <x-markas.ripple-background color="success" :size="72" :gap="48" class="grid h-44 place-items-center bg-surface">
    <span class="grid size-14 place-items-center rounded-full bg-success/10 text-success">
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0" /><path d="M12 19h.01" /></svg>
    </span>
  </x-markas.ripple-background>
  <div class="grid justify-items-center gap-3 px-6 pb-6 text-center">
    <div class="grid gap-1" role="status">
      <h3 class="text-base font-semibold text-ink">Looking for nearby devices</h3>
      <p class="text-sm text-muted">Keep your phone unlocked and close to this screen.</p>
    </div>
    <x-markas.button variant="secondary" size="sm">Cancel</x-markas.button>
  </div>
</div>
