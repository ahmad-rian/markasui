@php
    $logo = [
        ['fill' => 'fill-ink/15', 'points' => '354,578 1256,138 1171,430 268,868'],
        ['fill' => 'fill-ink/55', 'points' => '553,443 1455,3 1370,295 467,733'],
        ['fill' => 'fill-success/35', 'points' => '421,762 1325,318 1240,611 336,1050'],
        ['fill' => 'fill-ink/30', 'points' => '265,1073 1169,629 1084,922 180,1362'],
        ['fill' => 'fill-ink/80', 'points' => '93,965 997,521 912,814 8,1253'],
        ['fill' => 'fill-success', 'points' => '347,1135 1251,691 1166,984 262,1424'],
    ];
    $product = [
        [
            'label' => 'Components',
            'href' => '/components',
            'description' => '61 accessible building blocks',
            'icon' => 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z',
        ],
        [
            'label' => 'Templates',
            'href' => '/templates',
            'description' => 'Full pages you can ship today',
            'icon' => 'M3 4h18v6H3zM3 14h8v6H3zm12 0h6v6h-6z',
        ],
        [
            'label' => 'CLI',
            'href' => '/docs/cli',
            'description' => 'Add components with one command',
            'icon' => 'm4 17 6-5-6-5m8 12h8',
        ],
        [
            'label' => 'MCP server',
            'href' => '/docs/mcp',
            'description' => 'Let your editor agent install them',
            'icon' => 'M12 8V4H8M4 12a8 8 0 0 0 8 8h8v-8a8 8 0 0 0-8-8M9 13h.01M15 13h.01',
        ],
    ];
    $resources = [
        [
            'label' => 'Documentation',
            'href' => '/docs',
            'description' => 'Guides and API reference',
            'icon' => 'M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20',
        ],
        [
            'label' => 'Changelog',
            'href' => '/changelog',
            'description' => 'What shipped this week',
            'icon' => 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
        ],
        [
            'label' => 'Community',
            'href' => '/community',
            'description' => 'Ask and share on GitHub',
            'icon' => 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm11 10v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8',
        ],
        [
            'label' => 'Showcase',
            'href' => '/showcase',
            'description' => 'Sites built with MarkasUI',
            'icon' => 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
        ],
    ];
    $items = [
        [
            'label' => 'Product',
            'featured' => [
                'title' => 'MarkasUI 1.0',
                'href' => '/changelog/1-0',
                'description' => 'Blade, React, and Vue from one set of classes',
            ],
            'links' => [
                [
                    'label' => 'Components',
                    'href' => '/components',
                    'description' => '61 accessible building blocks',
                    'icon' => 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z',
                ],
                [
                    'label' => 'Templates',
                    'href' => '/templates',
                    'description' => 'Full pages you can ship today',
                    'icon' => 'M3 4h18v6H3zM3 14h8v6H3zm12 0h6v6h-6z',
                ],
                [
                    'label' => 'CLI',
                    'href' => '/docs/cli',
                    'description' => 'Add components with one command',
                    'icon' => 'm4 17 6-5-6-5m8 12h8',
                ],
                [
                    'label' => 'MCP server',
                    'href' => '/docs/mcp',
                    'description' => 'Let your editor agent install them',
                    'icon' => 'M12 8V4H8M4 12a8 8 0 0 0 8 8h8v-8a8 8 0 0 0-8-8M9 13h.01M15 13h.01',
                ],
            ],
        ],
        [
            'label' => 'Resources',
            'featured' => [
                'title' => 'Start in five minutes',
                'href' => '/docs/installation',
                'description' => 'Install the CLI and add your first component',
            ],
            'links' => [
                [
                    'label' => 'Documentation',
                    'href' => '/docs',
                    'description' => 'Guides and API reference',
                    'icon' => 'M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20',
                ],
                [
                    'label' => 'Changelog',
                    'href' => '/changelog',
                    'description' => 'What shipped this week',
                    'icon' => 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
                ],
                [
                    'label' => 'Community',
                    'href' => '/community',
                    'description' => 'Ask and share on GitHub',
                    'icon' => 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm11 10v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8',
                ],
                [
                    'label' => 'Showcase',
                    'href' => '/showcase',
                    'description' => 'Sites built with MarkasUI',
                    'icon' => 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
                ],
            ],
        ],
        ['label' => 'Pricing', 'href' => '/pricing'],
    ];
    $links = [
        [
            'label' => 'Product',
            'children' => [
                [
                    'label' => 'Components',
                    'href' => '/components',
                    'description' => '61 accessible building blocks',
                    'icon' => 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z',
                ],
                [
                    'label' => 'Templates',
                    'href' => '/templates',
                    'description' => 'Full pages you can ship today',
                    'icon' => 'M3 4h18v6H3zM3 14h8v6H3zm12 0h6v6h-6z',
                ],
                [
                    'label' => 'CLI',
                    'href' => '/docs/cli',
                    'description' => 'Add components with one command',
                    'icon' => 'm4 17 6-5-6-5m8 12h8',
                ],
                [
                    'label' => 'MCP server',
                    'href' => '/docs/mcp',
                    'description' => 'Let your editor agent install them',
                    'icon' => 'M12 8V4H8M4 12a8 8 0 0 0 8 8h8v-8a8 8 0 0 0-8-8M9 13h.01M15 13h.01',
                ],
            ],
        ],
        [
            'label' => 'Resources',
            'children' => [
                [
                    'label' => 'Documentation',
                    'href' => '/docs',
                    'description' => 'Guides and API reference',
                    'icon' => 'M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20',
                ],
                [
                    'label' => 'Changelog',
                    'href' => '/changelog',
                    'description' => 'What shipped this week',
                    'icon' => 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
                ],
                [
                    'label' => 'Community',
                    'href' => '/community',
                    'description' => 'Ask and share on GitHub',
                    'icon' => 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm11 10v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8',
                ],
                [
                    'label' => 'Showcase',
                    'href' => '/showcase',
                    'description' => 'Sites built with MarkasUI',
                    'icon' => 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
                ],
            ],
        ],
        ['label' => 'Pricing', 'href' => '/pricing'],
    ];
    $layout = '@2xl:[&>div>nav]:hidden';
    $brand = 'flex items-center gap-2 rounded-md';
    $logoClass = 'size-6';
    $menu = 'hidden pl-3 font-normal @2xl:block';
    $glow = '[&_[popover]>a]:bg-[radial-gradient(120%_90%_at_100%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent_65%)]';
    $signIn = 'hidden @lg:block';
@endphp

<x-markas.navbar :links="$links" class="{{ $layout }}">
    <x-slot:brand>
        <a href="/" class="{{ $brand }}">
            <svg class="{{ $logoClass }}" viewBox="0 0 1464 1430" aria-hidden="true">
                @foreach ($logo as $shape)
                    <polygon class="{{ $shape['fill'] }}" points="{{ $shape['points'] }}" />
                @endforeach
            </svg>
            <span>MarkasUI</span>
        </a>
        <div class="{{ $menu }}">
            <x-markas.navigation-menu :items="$items" class="{{ $glow }}" />
        </div>
    </x-slot:brand>
    <x-slot:actions>
        <div class="{{ $signIn }}">
            <x-markas.button size="sm" variant="ghost">Sign in</x-markas.button>
        </div>
        <x-markas.button size="sm">Start building</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
