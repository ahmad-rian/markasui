@php
    $logo = [
        ['fill' => 'fill-ink/15', 'points' => '354,578 1256,138 1171,430 268,868'],
        ['fill' => 'fill-ink/55', 'points' => '553,443 1455,3 1370,295 467,733'],
        ['fill' => 'fill-success/35', 'points' => '421,762 1325,318 1240,611 336,1050'],
        ['fill' => 'fill-ink/30', 'points' => '265,1073 1169,629 1084,922 180,1362'],
        ['fill' => 'fill-ink/80', 'points' => '93,965 997,521 912,814 8,1253'],
        ['fill' => 'fill-success', 'points' => '347,1135 1251,691 1166,984 262,1424'],
    ];
    $links = [
        [
            'label' => 'Components',
            'children' => [
                [
                    'label' => 'Forms',
                    'href' => '/components/forms',
                    'description' => 'Input, select, checkbox, and more',
                    'icon' => 'M3 7h18v10H3zM7 12h.01M11 12h6',
                ],
                [
                    'label' => 'Overlays',
                    'href' => '/components/overlays',
                    'description' => 'Modal, drawer, popover, toast',
                    'icon' => 'M8 8h12v12H8zM4 16V4h12',
                ],
                [
                    'label' => 'Navigation',
                    'href' => '/components/navigation',
                    'description' => 'Navbar, sidebar, tabs, menus',
                    'icon' => 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm4-13-2 6-6 2 2-6z',
                ],
            ],
        ],
        ['label' => 'Templates', 'href' => '/templates', 'active' => true],
        ['label' => 'Docs', 'href' => '/docs'],
        ['label' => 'Pricing', 'href' => '/pricing'],
    ];
    $utilities = [
        ['label' => 'Changelog', 'href' => '/changelog'],
        ['label' => 'GitHub', 'href' => 'https://github.com'],
        ['label' => 'Sign in', 'href' => '/login'],
    ];
    $shell = '@container grid';
    $strip = 'flex h-9 items-center gap-4 border-b border-line bg-canvas px-4 text-xs text-muted';
    $status = 'inline-flex items-center gap-2 rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $dot = 'size-1.5 rounded-full bg-success ring-4 ring-success/20';
    $version = 'hidden rounded-full border border-line px-2 py-px @lg:inline';
    $utilityNav = 'ml-auto flex items-center gap-4';
    $utilityLink = 'rounded-sm transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $main = '[&>div:first-child]:h-16';
    $brand = 'flex items-center gap-2.5 rounded-md text-base';
    $logoClass = 'size-7';
    $sales = 'hidden @3xl:block';
@endphp

<div class="{{ $shell }}">
    <div class="{{ $strip }}">
        <a href="/status" class="{{ $status }}">
            <span aria-hidden="true" class="{{ $dot }}"></span>
            All systems normal
        </a>
        <span class="{{ $version }}">v1.0.0</span>
        <nav aria-label="Utilities" class="{{ $utilityNav }}">
            @foreach ($utilities as $link)
                <a href="{{ $link['href'] }}" class="{{ $utilityLink }}">{{ $link['label'] }}</a>
            @endforeach
        </nav>
    </div>
    <x-markas.navbar :links="$links" class="{{ $main }}">
        <x-slot:brand>
            <a href="/" class="{{ $brand }}">
                <svg class="{{ $logoClass }}" viewBox="0 0 1464 1430" aria-hidden="true">
                    @foreach ($logo as $shape)
                        <polygon class="{{ $shape['fill'] }}" points="{{ $shape['points'] }}" />
                    @endforeach
                </svg>
                <span>MarkasUI</span>
            </a>
        </x-slot:brand>
        <x-slot:actions>
            <div class="{{ $sales }}">
                <x-markas.button size="sm" variant="secondary">Contact sales</x-markas.button>
            </div>
            <x-markas.button size="sm">Get started</x-markas.button>
        </x-slot:actions>
    </x-markas.navbar>
</div>
