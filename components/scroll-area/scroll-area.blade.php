@props([
    'orientation' => 'vertical',
    'label' => 'Scrollable content',
])

@php
    $base = 'rounded-lg [scrollbar-color:var(--markas-line)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-track]:bg-transparent';
    $orientations = [
        'vertical' => 'overflow-x-hidden overflow-y-auto',
        'horizontal' => 'overflow-x-auto overflow-y-hidden',
        'both' => 'overflow-auto',
    ];
@endphp

<div {{ $attributes->merge(['role' => 'region', 'aria-label' => $label, 'tabindex' => '0', 'data-orientation' => $orientation])->class([$base, $orientations[$orientation] ?? $orientations['vertical']]) }}>{{ $slot }}</div>
