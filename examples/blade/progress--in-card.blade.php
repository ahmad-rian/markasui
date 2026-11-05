<div class="grid gap-3">
    <div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
        <div class="flex items-start justify-between gap-4">
            <div class="grid gap-0.5 text-sm">
                <span class="font-medium text-ink">quarterly-report.pdf</span>
                <span class="text-muted">2.4 MB of 4 MB</span>
            </div>
            <x-markas.button size="sm" variant="ghost">Cancel</x-markas.button>
        </div>
        <x-markas.progress :value="60" aria-label="Uploading quarterly-report.pdf" />
    </div>
    <div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
        <div class="grid gap-0.5 text-sm">
            <span class="font-medium text-ink">Preparing export</span>
            <span class="text-muted">This can take a few minutes.</span>
        </div>
        <x-markas.progress aria-label="Preparing export" />
    </div>
</div>
