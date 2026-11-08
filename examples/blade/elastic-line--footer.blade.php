@php
    $footer = 'grid gap-1';
    $row = 'flex items-center justify-between gap-4 text-sm text-muted';
    $links = 'flex gap-4';
    $link = 'rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $pages = [
        ['label' => 'Docs', 'href' => '/docs'],
        ['label' => 'Templates', 'href' => '/templates'],
        ['label' => 'GitHub', 'href' => 'https://github.com/markasui/markasui'],
    ];
@endphp

<footer class="{{ $footer }}">
    <x-markas.elastic-line color="muted" :stroke-width="1" :reach="20" />
    <div class="{{ $row }}">
        <p>2026 MarkasUI, Bandung</p>
        <nav aria-label="Footer">
            <ul class="{{ $links }}">
                @foreach ($pages as $page)
                    <li><a href="{{ $page['href'] }}" class="{{ $link }}">{{ $page['label'] }}</a></li>
                @endforeach
            </ul>
        </nav>
    </div>
</footer>
