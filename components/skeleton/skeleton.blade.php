@props([
    'shape' => 'rect',
])

@php
    $base = 'animate-pulse bg-subtle motion-reduce:animate-none';
    $shapes = [
        'rect' => 'rounded-md',
        'circle' => 'rounded-full',
    ];
@endphp

<div {{ $attributes->merge(['aria-hidden' => 'true'])->class([$base, $shapes[$shape]]) }}></div>
