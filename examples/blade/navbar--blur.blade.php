<div class="overflow-hidden rounded-xl border border-line bg-canvas">
    <div class="relative">
        <div aria-hidden="true" class="absolute inset-x-0 top-0 h-28 bg-linear-to-br from-primary via-primary-soft to-canvas"></div>
        <x-markas.navbar :links="[
            [
                'label' => 'Product',
                'children' => [
                    [
                        'label' => 'Analytics',
                        'href' => '/analytics',
                        'description' => 'Track usage in real time',
                    ],
                    [
                        'label' => 'Automation',
                        'href' => '/automation',
                        'description' => 'Run workflows on a schedule',
                    ],
                    [
                        'label' => 'Security',
                        'href' => '/security',
                        'description' => 'Roles, SSO, and audit logs',
                    ],
                ],
            ],
            [
                'label' => 'Docs',
                'href' => '/docs',
            ],
            [
                'label' => 'Pricing',
                'href' => '/pricing',
            ],
        ]" variant="blur" :sticky="true">
            <x-slot:brand>
                <svg class="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-9 5 9 5 9-5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>
                <span>Acme</span>
            </x-slot:brand>
            <x-slot:actions>
                <x-markas.button size="sm" variant="secondary">Sign in</x-markas.button>
            </x-slot:actions>
        </x-markas.navbar>
        <div class="relative grid gap-1 px-4 pt-6 pb-8">
            <h2 class="text-lg font-semibold text-ink">Ship faster with Acme</h2>
            <p class="text-sm text-muted">The header stays readable while the page scrolls under it.</p>
        </div>
    </div>
</div>
