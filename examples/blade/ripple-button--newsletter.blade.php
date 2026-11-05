<form class="grid gap-3 rounded-xl border border-line bg-surface p-6">
    <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Get the changelog</p>
        <p class="text-sm text-muted">One email a month with new components. No spam.</p>
    </div>
    <div class="flex gap-2">
        <input type="email" name="email" aria-label="Email address" placeholder="you@company.com" class="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint" />
        <x-markas.ripple-button type="submit">Subscribe</x-markas.ripple-button>
    </div>
</form>
