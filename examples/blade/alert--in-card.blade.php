<div class="grid gap-4 rounded-lg border border-line bg-surface p-5">
    <div class="grid gap-1">
        <h3 class="text-base font-semibold text-ink">Delete workspace</h3>
        <p class="text-sm text-muted">All projects, files, and members will be removed.</p>
    </div>
    <x-markas.alert variant="danger" title="This cannot be undone">Export your data first if you want to keep a copy.</x-markas.alert>
    <div class="flex justify-end gap-2">
        <x-markas.button variant="secondary">Cancel</x-markas.button>
        <x-markas.button variant="danger">Delete workspace</x-markas.button>
    </div>
</div>
