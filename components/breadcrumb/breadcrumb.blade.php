@props([
    'items' => [],
])

@php
    $list = 'flex flex-wrap items-center gap-1.5 text-sm text-muted';
    $item = 'inline-flex items-center gap-1.5';
    $link = 'rounded-md transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $current = 'font-medium text-ink';
    $separator = 'size-3.5 shrink-0 text-faint';

    $lastIndex = count($items) - 1;

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };
@endphp

<nav {{ $attributes->merge(['aria-label' => 'Breadcrumb']) }}>
    <ol class="{{ $list }}">
        @foreach (array_values($items) as $index => $crumb)
            <li class="{{ $item }}">
                @if ($index === $lastIndex)
                    <span aria-current="page" class="{{ $current }}">{{ $crumb['label'] }}</span>
                @elseif (! empty($crumb['href']))
                    <a href="{{ $safeHref((string) $crumb['href']) }}" class="{{ $link }}">{{ $crumb['label'] }}</a>
                @else
                    <span>{{ $crumb['label'] }}</span>
                @endif
                @if ($index !== $lastIndex)
                    <svg class="{{ $separator }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                @endif
            </li>
        @endforeach
    </ol>
</nav>
