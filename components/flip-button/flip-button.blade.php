@props([
    'variant' => 'primary',
    'size' => 'md',
    'backLabel' => '',
])

@php
    $base = 'group inline-grid font-medium whitespace-nowrap perspective-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50';
    $sizes = [
        'sm' => 'h-8 rounded-md text-sm',
        'md' => 'h-10 rounded-lg text-sm',
        'lg' => 'h-12 rounded-lg text-base',
    ];
    $inner = 'grid rounded-[inherit] transition-transform duration-500 ease-out transform-3d group-hover:rotate-x-180 group-focus-visible:rotate-x-180 motion-reduce:transition-none';
    $face = 'col-start-1 row-start-1 inline-flex items-center justify-center gap-2 rounded-[inherit] backface-hidden';
    $facePadding = [
        'sm' => 'px-3',
        'md' => 'px-4',
        'lg' => 'px-6',
    ];
    $variants = [
        'primary' => 'bg-primary text-on-primary',
        'secondary' => 'border border-line bg-surface text-ink',
        'ghost' => 'text-ink',
        'danger' => 'bg-danger text-on-primary',
    ];
    $backVariants = [
        'primary' => 'rotate-x-180 bg-primary-strong text-on-primary',
        'secondary' => 'rotate-x-180 border border-primary-line bg-primary-soft text-ink',
        'ghost' => 'rotate-x-180 bg-subtle text-ink',
        'danger' => 'rotate-x-180 bg-danger text-on-primary',
    ];

    // Back face: the back slot wins, then back-label, then the main label.
    $back = $__laravel_slots['back'] ?? null;
@endphp

<button {{ $attributes->merge(['type' => 'button'])->class([$base, $sizes[$size]]) }}>
    <span class="{{ $inner }}">
        <span class="{{ $face }} {{ $facePadding[$size] }} {{ $variants[$variant] }}">{{ $slot }}</span>
        <span class="{{ $face }} {{ $facePadding[$size] }} {{ $backVariants[$variant] }}" aria-hidden="true">{{ $back ?? ($backLabel !== '' ? $backLabel : $slot) }}</span>
    </span>
</button>
