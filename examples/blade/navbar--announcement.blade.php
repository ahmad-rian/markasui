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
        ['label' => 'Docs', 'href' => '/docs'],
        ['label' => 'Components', 'href' => '/components', 'active' => true],
        ['label' => 'Templates', 'href' => '/templates'],
        ['label' => 'Changelog', 'href' => '/changelog'],
    ];
    $shell = '@container grid';
    $bar = 'relative flex items-center justify-center bg-primary bg-[radial-gradient(45%_160%_at_50%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent)] py-2 pr-11 pl-4 text-sm text-on-primary';
    $message = 'group inline-flex min-w-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary';
    $badge = 'bg-surface!';
    $headline = 'truncate font-medium';
    $detail = 'hidden text-on-primary/75 @lg:inline';
    $arrow = 'size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none';
    $dismiss = 'absolute right-2 inline-flex size-7 items-center justify-center rounded-md transition-colors duration-150 ease-out hover:bg-on-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary';
    $icon = 'size-4';
    $brand = 'flex items-center gap-2 rounded-md';
    $logoClass = 'size-6';
@endphp

<div x-data="{ open: true }" class="{{ $shell }}">
    <div x-show="open" class="{{ $bar }}">
        <a href="/changelog" class="{{ $message }}">
            <x-markas.badge variant="success" class="{{ $badge }}">New</x-markas.badge>
            <span class="{{ $headline }}">MarkasUI 1.0 is here</span>
            <span class="{{ $detail }}">Read the release notes</span>
            <svg class="{{ $arrow }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </a>
        <button type="button" aria-label="Dismiss announcement" @click="open = false" class="{{ $dismiss }}">
            <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
    </div>
    <x-markas.navbar :links="$links">
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
            <x-markas.theme-toggle size="sm" animation="eclipse" />
            <x-markas.button size="sm">Get started</x-markas.button>
        </x-slot:actions>
    </x-markas.navbar>
</div>
