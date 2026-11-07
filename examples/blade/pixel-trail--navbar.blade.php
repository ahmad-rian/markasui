@php
    $bar = 'flex h-16 items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4';
    $brand = 'text-base font-semibold text-ink';
    $links = 'flex gap-4 text-sm text-muted';
    $link = 'rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $pages = [
        ['label' => 'Docs', 'href' => '/docs'],
        ['label' => 'Components', 'href' => '/components'],
        ['label' => 'Templates', 'href' => '/templates'],
    ];
@endphp

<x-markas.pixel-trail color="ink" :cell-size="8" :fade="400" :class="$bar">
    <span class="{{ $brand }}">Markas</span>
    <nav aria-label="Main">
        <ul class="{{ $links }}">
            @foreach ($pages as $page)
                <li><a href="{{ $page['href'] }}" class="{{ $link }}">{{ $page['label'] }}</a></li>
            @endforeach
        </ul>
    </nav>
    <x-markas.button size="sm">Sign in</x-markas.button>
</x-markas.pixel-trail>
