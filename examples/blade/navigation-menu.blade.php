@php
    $products = [
        [
            'label' => 'Components',
            'href' => '/components',
            'description' => '61 accessible building blocks',
        ],
        [
            'label' => 'Templates',
            'href' => '/templates',
            'description' => 'Full pages you can ship today',
        ],
        [
            'label' => 'CLI',
            'href' => '/docs/cli',
            'description' => 'Add components with one command',
        ],
        [
            'label' => 'MCP server',
            'href' => '/docs/mcp',
            'description' => 'Let your editor agent install them',
        ],
    ];
    $developers = [
        [
            'label' => 'Documentation',
            'href' => '/docs',
            'description' => 'Guides and API reference',
        ],
        [
            'label' => 'Registry',
            'href' => '/docs/registry',
            'description' => 'JSON for every component',
        ],
        ['label' => 'Changelog', 'href' => '/changelog', 'description' => 'What shipped this week'],
        ['label' => 'Status', 'href' => '/status', 'description' => 'Registry and docs uptime'],
    ];
    $items = [
        [
            'label' => 'Products',
            'links' => [
                [
                    'label' => 'Components',
                    'href' => '/components',
                    'description' => '61 accessible building blocks',
                ],
                [
                    'label' => 'Templates',
                    'href' => '/templates',
                    'description' => 'Full pages you can ship today',
                ],
                [
                    'label' => 'CLI',
                    'href' => '/docs/cli',
                    'description' => 'Add components with one command',
                ],
                [
                    'label' => 'MCP server',
                    'href' => '/docs/mcp',
                    'description' => 'Let your editor agent install them',
                ],
            ],
        ],
        [
            'label' => 'Developers',
            'links' => [
                [
                    'label' => 'Documentation',
                    'href' => '/docs',
                    'description' => 'Guides and API reference',
                ],
                [
                    'label' => 'Registry',
                    'href' => '/docs/registry',
                    'description' => 'JSON for every component',
                ],
                ['label' => 'Changelog', 'href' => '/changelog', 'description' => 'What shipped this week'],
                ['label' => 'Status', 'href' => '/status', 'description' => 'Registry and docs uptime'],
            ],
        ],
        ['label' => 'Pricing', 'href' => '/pricing', 'active' => true],
        ['label' => 'Blog', 'href' => '/blog'],
    ];
@endphp

<x-markas.navigation-menu :items="$items" />
