@props([
    'page' => 1,
    'total' => 1,
    'href' => '?page={page}',
    'siblings' => 1,
])

@php
    $root = '@container';
    $list = 'flex flex-wrap items-center gap-1';
    $link = 'inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border border-transparent px-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:border-line data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none';
    $ellipsis = 'inline-flex h-8 min-w-8 items-center justify-center text-sm text-muted';
    $icon = 'size-4 shrink-0';
    $label = 'sr-only @lg:not-sr-only';

    // Logika sama persis dengan pageRange() di Pagination.tsx dan Pagination.vue.
    $pageRange = function (int $page, int $total, int $siblings): array {
        if ($total < 1) {
            return [];
        }
        $slots = $siblings * 2 + 5;
        if ($total <= $slots) {
            return range(1, $total);
        }
        $current = min(max($page, 1), $total);
        $start = min(max($current - $siblings, 3), $total - 2 - $siblings * 2);
        $end = $start + $siblings * 2;

        return [1, $start > 3 ? 'ellipsis' : 2, ...range($start, $end), $end < $total - 2 ? 'ellipsis' : $total - 1, $total];
    };

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };

    $total = (int) $total;
    $current = min(max((int) $page, 1), max($total, 1));
    $pages = $pageRange($current, $total, (int) $siblings);
    $hrefFor = fn (int $target): string => $safeHref(str_replace('{page}', (string) $target, (string) $href));
@endphp

<nav {{ $attributes->merge(['aria-label' => 'Navigasi halaman'])->class([$root]) }}>
    <ul class="{{ $list }}">
        <li>
            @if ($current > 1)
                <a href="{{ $hrefFor($current - 1) }}" rel="prev" class="{{ $link }}">
                    <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                    <span class="{{ $label }}">Sebelumnya</span>
                </a>
            @else
                <span aria-disabled="true" class="{{ $link }}">
                    <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                    <span class="{{ $label }}">Sebelumnya</span>
                </span>
            @endif
        </li>
        @foreach ($pages as $index => $item)
            <li>
                @if ($item === 'ellipsis')
                    <span class="{{ $ellipsis }}" aria-hidden="true">…</span>
                @else
                    <a
                        href="{{ $hrefFor($item) }}"
                        @if ($item === $current) aria-current="page" @endif
                        data-state="{{ $item === $current ? 'active' : 'inactive' }}"
                        class="{{ $link }}"
                    >{{ $item }}</a>
                @endif
            </li>
        @endforeach
        <li>
            @if ($current < $total)
                <a href="{{ $hrefFor($current + 1) }}" rel="next" class="{{ $link }}">
                    <span class="{{ $label }}">Berikutnya</span>
                    <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                </a>
            @else
                <span aria-disabled="true" class="{{ $link }}">
                    <span class="{{ $label }}">Berikutnya</span>
                    <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                </span>
            @endif
        </li>
    </ul>
</nav>
