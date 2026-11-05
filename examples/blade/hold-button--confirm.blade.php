<div class="grid gap-4 rounded-xl border border-line bg-surface p-6">
    <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Delete workspace</p>
        <p class="text-sm text-muted">This removes 12 projects and 48 members. It cannot be undone.</p>
    </div>
    <div class="flex flex-wrap justify-end gap-2">
        <x-markas.button variant="secondary">Cancel</x-markas.button>
        <x-markas.hold-button variant="danger" :duration="2000">Hold to delete</x-markas.hold-button>
    </div>
</div>
