@props([
    'cellSize' => 32,
    'cells' => [],
    'color' => 'muted',
    'mask' => 'none',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-grid-size)_var(--markas-grid-size)]';
    $cell = 'absolute bg-current animate-[markas-grid-cell_4s_ease-in-out_infinite] motion-reduce:animate-none';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted/20',
        'primary' => 'text-primary/15',
        'success' => 'text-success/30',
        'warning' => 'text-warning/30',
        'danger' => 'text-danger/30',
    ];
    $masks = [
        'none' => '',
        'radial' => '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]',
        'linear' => '[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]',
    ];
    $keyframes = '@keyframes markas-grid-cell{50%{opacity:.4}}';
    $cellDelayMs = 800;

    $size = (float) $cellSize;
    $vars = '--markas-grid-size: '.$size.'px';
@endphp

<div {{ $attributes->merge(['style' => $vars])->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" @class([$layer, $colors[$color] ?? $colors['muted'], $masks[$mask] ?? ''])>
        @foreach (array_values($cells) as $index => [$col, $row])
            {{-- Posisi satu sel sorotan di dalam garis grid (kolom, baris mulai dari 0). --}}
            <span class="{{ $cell }}" style="left: {{ $col * $size + 1 }}px; top: {{ $row * $size + 1 }}px; width: {{ $size - 1 }}px; height: {{ $size - 1 }}px; animation-delay: {{ $index * $cellDelayMs }}ms"></span>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
