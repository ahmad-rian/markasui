<x-markas.navbar :links="[
    ['label' => 'Overview', 'href' => '/overview', 'active' => true],
    ['label' => 'Projects', 'href' => '/projects'],
    ['label' => 'Reports', 'href' => '/reports'],
]">
    <x-slot:brand>
        <svg class="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-9 5 9 5 9-5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>
        <span>Acme</span>
    </x-slot:brand>
    <x-slot:actions>
        <x-markas.button variant="ghost" aria-label="Notifications, 3 unread" class="relative size-9 px-0">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            <span class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"></span>
        </x-markas.button>
        <x-markas.dropdown-menu
            label="Account"
            class="[&>button]:h-9 [&>button]:gap-1 [&>button]:border-0 [&>button]:px-1"
            :items="[
                ['label' => 'Profile', 'href' => '/profile'],
                ['label' => 'Settings', 'href' => '/settings'],
                ['label' => 'Billing', 'href' => '/billing'],
                ['separator' => true],
                ['label' => 'Sign out', 'value' => 'sign-out', 'danger' => true],
            ]"
        >
            <x-slot:trigger><x-markas.avatar name="Siti Aminah" size="sm" /></x-slot:trigger>
        </x-markas.dropdown-menu>
    </x-slot:actions>
</x-markas.navbar>
