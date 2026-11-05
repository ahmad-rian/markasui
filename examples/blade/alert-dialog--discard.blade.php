<div class="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4">
    <div class="grid gap-1">
        <p class="text-sm font-medium text-ink">Draft: Q3 product update</p>
        <p class="text-sm text-muted">3 unsaved changes</p>
    </div>
    <x-markas.alert-dialog title="Discard unsaved changes?" variant="danger" cancel-label="Keep editing" action-label="Discard">
        <x-slot:trigger>
            <x-markas.button variant="secondary">Close editor</x-markas.button>
        </x-slot:trigger>

        Your edits since the last save will be lost.
    </x-markas.alert-dialog>
</div>
