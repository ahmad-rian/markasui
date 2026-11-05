<div class="grid gap-3">
    <x-markas.breadcrumb :items="[
        ['label' => 'Projects', 'href' => '/projects'],
        ['label' => 'Website redesign', 'href' => '/projects/website'],
        ['label' => 'Settings'],
    ]" />
    <div class="flex items-start justify-between gap-4">
        <div class="grid gap-1">
            <h1 class="text-xl font-semibold text-ink">Settings</h1>
            <p class="text-sm text-muted">Manage access and notifications for this project.</p>
        </div>
        <x-markas.button size="sm">Save</x-markas.button>
    </div>
</div>
