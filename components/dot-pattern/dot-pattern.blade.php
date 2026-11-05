@props([
    'spacing' => 16,
    'dotSize' => 1,
    'color' => 'muted',
    'mask' => 'none',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_var(--markas-dot-size),transparent_calc(var(--markas-dot-size)_+_0.5px))] [background-size:var(--markas-dot-spacing)_var(--markas-dot-spacing)]';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted/50',
        'primary' => 'text-primary/40',
        'success' => 'text-success/50',
        'warning' => 'text-warning/50',
        'danger' => 'text-danger/50',
    ];
    $masks = [
        'none' => '',
        'radial' => '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]',
        'linear' => '[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]',
    ];

    $vars = '--markas-dot-spacing: '.(float) $spacing.'px; --markas-dot-size: '.(float) $dotSize.'px';
@endphp

<div {{ $attributes->merge(['style' => $vars])->class([$base]) }}>
    <div aria-hidden="true" @class([$layer, $colors[$color] ?? $colors['muted'], $masks[$mask] ?? ''])></div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
