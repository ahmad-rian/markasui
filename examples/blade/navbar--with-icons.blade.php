<x-markas.navbar :links="[
    [
        'label' => 'Product',
        'children' => [
            [
                'label' => 'Analytics',
                'href' => '/analytics',
                'description' => 'Traffic and conversions',
                'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6',
            ],
            [
                'label' => 'Automation',
                'href' => '/automation',
                'description' => 'Scheduled workflows',
                'icon' => 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
            ],
            [
                'label' => 'Integrations',
                'href' => '/integrations',
                'description' => 'Connect the tools you use',
                'icon' => 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm13 0v6m-3-3h6',
            ],
            [
                'label' => 'Security',
                'href' => '/security',
                'description' => 'Roles, audit logs, and SSO',
                'icon' => 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z',
            ],
            [
                'label' => 'Reports',
                'href' => '/reports',
                'description' => 'Weekly team summaries',
                'icon' => 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
            ],
            [
                'label' => 'Billing',
                'href' => '/billing',
                'description' => 'Invoices and usage limits',
                'icon' => 'M3 6h18v12H3zM3 10h18M7 15h3',
            ],
        ],
    ],
    [
        'label' => 'Developers',
        'children' => [
            [
                'label' => 'Documentation',
                'href' => '/docs',
                'description' => 'Guides and API reference',
                'icon' => 'M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20',
            ],
            [
                'label' => 'Status',
                'href' => '/status',
                'description' => 'Uptime for every region',
                'icon' => 'M3 12h4l3-8 4 16 3-8h4',
            ],
            [
                'label' => 'Changelog',
                'href' => '/changelog',
                'description' => 'What shipped this week',
                'icon' => 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
            ],
        ],
    ],
    [
        'label' => 'Pricing',
        'href' => '/pricing',
    ],
]">
    <x-slot:brand>Acme</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Sign up</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
