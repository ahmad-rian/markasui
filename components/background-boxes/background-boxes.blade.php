@props([
    'variant' => 'skewed',
    'rows' => 12,
    'cols' => 18,
    'size' => 40,
    'speed' => 'normal',
    'color' => 'primary',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'absolute inset-0 overflow-hidden';
    $grid = 'absolute top-1/2 left-1/2 grid grid-cols-[repeat(var(--markas-boxes-cols),var(--markas-boxes-size))] auto-rows-[var(--markas-boxes-size)] border-t border-l border-line';
    $cell = 'border-r border-b border-line transition-colors duration-1000 ease-out hover:bg-current/40 hover:duration-0 motion-reduce:transition-none';
    $ember = 'animate-[markas-boxes-glow_var(--markas-boxes-duration)_ease-in-out_infinite] motion-reduce:animate-none';
    $content = 'pointer-events-none relative [&_:is(a,button,input,select,textarea,label,summary)]:pointer-events-auto';
    $variants = [
        'skewed' => ['layer' => '[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]', 'grid' => '[transform:translate(-50%,-50%)_skewX(-48deg)_skewY(14deg)]'],
        'flat' => ['layer' => '[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]', 'grid' => '-translate-x-1/2 -translate-y-1/2'],
        'perspective' => ['layer' => '[perspective:520px] [mask-image:linear-gradient(to_bottom,transparent_25%,black_60%)]', 'grid' => '[transform:translate(-50%,-38%)_rotateX(58deg)]'],
    ];
    $colors = [
        'muted' => 'text-muted',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $speeds = ['slow' => '9s', 'normal' => '6s', 'fast' => '3.5s'];
    $keyframes = '@keyframes markas-boxes-glow{0%,100%{box-shadow:none}50%{box-shadow:inset 0 0 0 999px color-mix(in oklab,currentColor 30%,transparent)}}';
    $maxCells = 600;
    $maxSide = 40;
    $emberTarget = 6;
    $emberDelayMs = 700;

    $shape = $variants[$variant] ?? $variants['skewed'];
    $columns = max(1, min((int) $cols, $maxSide));
    $total = min(max(1, min((int) $rows, $maxSide)) * $columns, $maxCells);

    // Sel ke-i. Sekitar 6% sel (dua modulus berbeda supaya tidak membentuk garis) menyala pelan supaya latar terasa hidup tanpa hover.
    $cells = [];
    for ($i = 0; $i < $total; $i++) {
        $lit = ($i * 7) % 13 + ($i * $i) % 11 === $emberTarget;
        $cells[] = $lit ? ['class' => $cell.' '.$ember, 'style' => 'animation-delay: '.(($i % 9) * -$emberDelayMs).'ms'] : ['class' => $cell, 'style' => null];
    }
    $vars = '--markas-boxes-cols: '.$columns.'; --markas-boxes-size: '.(float) $size.'px; --markas-boxes-duration: '.($speeds[$speed] ?? $speeds['normal']);
@endphp

<div {{ $attributes->merge(['style' => $vars])->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" @class([$layer, $shape['layer'], $colors[$color] ?? $colors['primary']])>
        <div @class([$grid, $shape['grid']])>
            @foreach ($cells as $item)
                <span class="{{ $item['class'] }}" @if ($item['style']) style="{{ $item['style'] }}" @endif></span>
            @endforeach
        </div>
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
