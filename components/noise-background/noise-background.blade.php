@props([
    'variant' => 'grain',
    'color' => 'primary',
    'intensity' => 'medium',
    'size' => 'medium',
    'speed' => 'normal',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0 overflow-hidden';
    $wash = 'absolute -inset-1/4 animate-[markas-noise-drift_var(--markas-noise-speed)_ease-in-out_infinite_alternate] bg-[radial-gradient(36%_42%_at_30%_35%,color-mix(in_oklab,currentColor_26%,transparent),transparent),radial-gradient(40%_40%_at_70%_65%,color-mix(in_oklab,currentColor_16%,transparent),transparent)] motion-reduce:animate-none';
    $grain = 'absolute inset-0 bg-ink opacity-[var(--markas-noise-alpha)] [mask-size:var(--markas-noise-size)]';
    $vignette = 'absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,currentColor)] text-ink/20 dark:text-canvas/85';
    $content = 'relative';
    $textures = [
        'grain' => 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 -4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        'paper' => 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.5 .12\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -1.7\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
    ];
    $variants = [
        'grain' => $textures['grain'],
        'film' => $textures['grain'],
        'paper' => $textures['paper'],
    ];
    $colors = [
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
        'muted' => 'text-muted',
    ];
    $intensities = [
        'low' => '[--markas-noise-alpha:0.05]',
        'medium' => '[--markas-noise-alpha:0.09]',
        'high' => '[--markas-noise-alpha:0.15]',
    ];
    $sizes = [
        'fine' => '[--markas-noise-size:120px]',
        'medium' => '[--markas-noise-size:200px]',
        'coarse' => '[--markas-noise-size:320px]',
    ];
    $speeds = [
        'slow' => '[--markas-noise-speed:30s]',
        'normal' => '[--markas-noise-speed:18s]',
        'fast' => '[--markas-noise-speed:10s]',
    ];
    $keyframes = '@keyframes markas-noise-drift{to{transform:translate(-6%,4%) rotate(4deg) scale(1.08)}}';
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" @class([$layer, $colors[$color] ?? $colors['primary'], $intensities[$intensity] ?? $intensities['medium'], $sizes[$size] ?? $sizes['medium'], $speeds[$speed] ?? $speeds['normal']])>
        <div class="{{ $wash }}"></div>
        <div class="{{ $grain }}" style="mask-image: {{ $variants[$variant] ?? $variants['grain'] }}"></div>
        @if ($variant === 'film')
            <div class="{{ $vignette }}"></div>
        @endif
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
