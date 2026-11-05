<x-markas.navbar :links="[
    ['label' => 'Dashboard', 'href' => '/dashboard', 'active' => true],
    ['label' => 'Projects', 'href' => '/projects'],
    ['label' => 'Team', 'href' => '/team'],
]">
    <x-slot:brand>Acme</x-slot:brand>
    <x-slot:actions>
        <x-markas.button variant="ghost" aria-label="Search" class="size-9 px-0">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.3-4.3" /><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" /></svg>
        </x-markas.button>
        <x-markas.button variant="ghost" aria-label="Notifications" class="size-9 px-0">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </x-markas.button>
        <x-markas.avatar name="Siti Aminah" size="sm" />
    </x-slot:actions>
</x-markas.navbar>
