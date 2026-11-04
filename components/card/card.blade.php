@props([
    'title' => null,
    'description' => null,
])

@php
    $base = 'grid gap-4 rounded-xl border border-line bg-surface p-6 text-ink';
    $header = 'grid gap-1.5';
    $titleClass = 'text-base font-semibold text-ink';
    $descriptionClass = 'text-sm text-muted';
    $body = 'text-sm text-ink';
    $footerClass = 'flex flex-wrap items-center gap-2';
@endphp

<article {{ $attributes->class([$base]) }}>
    @if ($title || $description)
        <header class="{{ $header }}">
            @if ($title)
                <h3 class="{{ $titleClass }}">{{ $title }}</h3>
            @endif
            @if ($description)
                <p class="{{ $descriptionClass }}">{{ $description }}</p>
            @endif
        </header>
    @endif
    @if ($slot->isNotEmpty())
        <div class="{{ $body }}">{{ $slot }}</div>
    @endif
    @isset($footer)
        <div class="{{ $footerClass }}">{{ $footer }}</div>
    @endisset
</article>
