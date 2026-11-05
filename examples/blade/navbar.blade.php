<x-markas.navbar :links="[
    [
        'label' => 'Home',
        'href' => '/',
        'active' => true,
    ],
    [
        'label' => 'Products',
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
        'label' => 'Resources',
        'children' => [
            [
                'label' => 'Docs',
                'href' => '/docs',
                'description' => 'Guides and API reference',
            ],
            [
                'label' => 'Changelog',
                'href' => '/changelog',
                'description' => 'What shipped this week',
            ],
            [
                'label' => 'Community',
                'href' => '/community',
                'description' => 'Ask and share with others',
            ],
        ],
    ],
    [
        'label' => 'Pricing',
        'href' => '/pricing',
    ],
]">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Sign in</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
