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
        ['label' => 'Docs', 'href' => '/docs', 'active' => true],
        ['label' => 'Components', 'href' => '/components'],
        ['label' => 'Blog', 'href' => '/blog'],
    ];
    $commands = [
        ['group' => 'Components', 'label' => 'Button', 'href' => '/components/button'],
        ['group' => 'Components', 'label' => 'Navbar', 'href' => '/components/navbar'],
        ['group' => 'Components', 'label' => 'Command', 'href' => '/components/command'],
        ['group' => 'Pages', 'label' => 'Installation', 'href' => '/docs/installation'],
        ['group' => 'Pages', 'label' => 'Templates', 'href' => '/templates'],
        ['group' => 'Pages', 'label' => 'Changelog', 'href' => '/changelog'],
    ];
    $layout = '[&>div>div:last-child]:min-w-0 [&>div>div:last-child]:flex-1 @2xl:[&>div>nav]:order-last';
    $brand = 'flex items-center gap-2 rounded-md';
    $logoClass = 'size-6';
    $search = 'mx-auto flex h-10 max-w-md min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line bg-canvas pr-2 pl-4 text-sm text-muted transition-colors duration-150 ease-out hover:border-primary-line hover:bg-subtle motion-reduce:transition-none';
    $searchIcon = 'size-4 shrink-0';
    $placeholder = 'min-w-0 flex-1 truncate text-left';
    // Phones have no hotkey, and the label needs the room in a narrow bar.
    $shortcut = '@max-xs:hidden';
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
    </x-slot:brand>
    <x-slot:actions>
        <x-markas.command hotkey :items="$commands">
            <x-slot:trigger>
                <button type="button" aria-keyshortcuts="Meta+K" class="{{ $search }}">
                    <svg class="{{ $searchIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.3-4.3" /><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" /></svg>
                    <span class="{{ $placeholder }}">Search components</span>
                    <x-markas.kbd size="sm" class="{{ $shortcut }}">⌘K</x-markas.kbd>
                </button>
            </x-slot:trigger>
        </x-markas.command>
    </x-slot:actions>
</x-markas.navbar>
