@props([
    'size' => 'md',
    'keys' => [],
    'separator' => '+',
])

@php
    $keycap = 'inline-flex items-center justify-center rounded-md bg-surface font-sans font-medium text-muted ring-1 ring-line';
    $sizes = [
        'sm' => 'h-5 min-w-5 px-1 text-[11px]',
        'md' => 'h-6 min-w-6 px-1.5 text-xs',
    ];
    $group = 'inline-flex items-center gap-1 font-sans';
    $joiner = 'text-xs text-muted';
@endphp

@if (count($keys) > 0)
    <kbd {{ $attributes->class([$group]) }}>@foreach ($keys as $key)@if (! $loop->first)<span class="{{ $joiner }}">{{ $separator }}</span>@endif<kbd class="{{ $keycap }} {{ $sizes[$size] }}">{{ $key }}</kbd>@endforeach</kbd>
@else
    <kbd {{ $attributes->class([$keycap, $sizes[$size]]) }}>{{ $slot }}</kbd>
@endif
