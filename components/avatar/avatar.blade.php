@props([
    'name' => '',
    'src' => null,
    'alt' => null,
    'size' => 'md',
])

@php
    $base = 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle';
    $image = 'object-cover';
    $fallback = 'bg-primary-soft font-medium text-primary select-none';
    $sizes = [
        'sm' => 'size-8 text-xs',
        'md' => 'size-10 text-sm',
        'lg' => 'size-12 text-base',
    ];

    // Huruf pertama kata pertama dan terakhir, sama dengan getInitials() di versi React dan Vue.
    $words = preg_split('/\s+/u', trim((string) $name), -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $pick = count($words) > 1 ? [$words[0], end($words)] : $words;
    $initials = mb_strtoupper(implode('', array_map(fn ($word) => mb_substr($word, 0, 1), $pick)));

    $label = $alt ?? $name;
    // Fallback hanya menerima class user. Atribut lain milik elemen img.
    $fallbackAttributes = new \Illuminate\View\ComponentAttributeBag(array_filter([
        'class' => $attributes->get('class'),
        'role' => $label === '' ? null : 'img',
        'aria-label' => $label === '' ? null : $label,
        'aria-hidden' => $label === '' ? 'true' : null,
    ]));
@endphp

@if ($src)
    <span class="contents" x-data="{ failed: false }"><img
            src="{{ $src }}"
            alt="{{ $label }}"
            x-show="!failed"
            x-init="failed = $el.complete && $el.naturalWidth === 0"
            x-on:error="failed = true"
            {{ $attributes->class([$base, $image, $sizes[$size]]) }}
        /><span
            style="display: none"
            x-show="failed"
            {{ $fallbackAttributes->class([$base, $fallback, $sizes[$size]]) }}
        >{{ $initials }}</span></span>
@else
    <span {{ $fallbackAttributes->class([$base, $fallback, $sizes[$size]]) }}>{{ $initials }}</span>
@endif
