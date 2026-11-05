<div class="grid gap-3">
    <x-markas.alert variant="warning" title="Your trial ends in 3 days">
        <p>Upgrade now to keep access to all of your projects.</p>
        <div class="mt-3 flex flex-wrap gap-2">
            <x-markas.button size="sm">Upgrade plan</x-markas.button>
            <x-markas.button size="sm" variant="ghost">Remind me later</x-markas.button>
        </div>
    </x-markas.alert>
    <x-markas.alert variant="danger" title="Sync failed">
        <p>We could not reach the server. Your last 2 edits are not saved.</p>
        <div class="mt-3 flex flex-wrap gap-2">
            <x-markas.button size="sm" variant="secondary">Try again</x-markas.button>
        </div>
    </x-markas.alert>
</div>
