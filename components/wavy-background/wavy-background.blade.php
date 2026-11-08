@props([
    'variant' => 'ocean',
    'color' => 'primary',
    'speed' => 'normal',
    'waves' => 4,
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0';
    $wave = 'absolute left-0 w-[200%] animate-[markas-wave_20s_linear_infinite] motion-reduce:animate-none';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted',
        'ink' => 'text-ink',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $variants = [
        'ocean' => ['layer' => 'blur-[2px]', 'wave' => '-bottom-1 h-1/2'],
        'silk' => ['layer' => 'blur-[0.5px]', 'wave' => 'top-1/4 h-1/2'],
        'layered' => ['layer' => 'blur-[1px]', 'wave' => '-bottom-1 h-3/4'],
    ];
    $speeds = ['slow' => 30, 'normal' => 18, 'fast' => 10];
    $keyframes = '@keyframes markas-wave{to{transform:translateX(-50%)}}';

    // Gelombang dari kurva kuadrat berulang: satu periode 600 unit, jadi geser -50% (1200 unit) menyambung mulus.
    $period = 600;
    $viewHeight = 120;
    $phaseStep = 110;
    $minWaves = 3;
    $maxWaves = 5;

    $key = array_key_exists($variant, $variants) ? $variant : 'ocean';
    $config = $variants[$key];
    $speedBase = $speeds[$speed] ?? $speeds['normal'];

    // Garis dasar, tinggi puncak, dan opasitas (persen) gelombang ke-i untuk tiap varian.
    $shapes = [
        'ocean' => fn ($i) => ['baseline' => 40 + $i * 12, 'amplitude' => 16 - $i * 2, 'opacity' => 6 + $i * 4],
        'silk' => fn ($i) => ['baseline' => 30 + $i * 15, 'amplitude' => 10 + $i * 3, 'opacity' => 30 + $i * 8],
        'layered' => fn ($i) => ['baseline' => 20 + $i * 20, 'amplitude' => 8 + ($i % 2) * 4, 'opacity' => 5 + $i * 3],
    ];
    $wavePath = function ($baseline, $amplitude, $phase, $filled) use ($period, $viewHeight) {
        $start = -$phase;
        $quarter = $period / 4;
        $d = 'M'.$start.' '.$baseline.' Q'.($start + $quarter).' '.($baseline - 2 * $amplitude).' '.($start + 2 * $quarter).' '.$baseline;
        for ($x = $start + 4 * $quarter; $x <= 2 * $period + 2 * $quarter; $x += 2 * $quarter) {
            $d .= ' T'.$x.' '.$baseline;
        }

        return $filled ? $d.' V'.$viewHeight.' H'.$start.' Z' : $d;
    };

    $total = max($minWaves, min((int) $waves, $maxWaves));
    $items = [];
    for ($i = 0; $i < $total; $i++) {
        $shape = $shapes[$key]($i);
        $filled = $key !== 'silk';
        $items[] = [
            'd' => $wavePath($shape['baseline'], $shape['amplitude'], ($i * $phaseStep) % $period, $filled),
            'filled' => $filled,
            'style' => 'opacity: '.($shape['opacity'] / 100).'; animation-duration: '.($speedBase + ($total - 1 - $i) * 4).'s; animation-direction: '.($i % 2 === 1 ? 'reverse' : 'normal'),
        ];
    }
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" @class([$layer, $config['layer'], $colors[$color] ?? $colors['primary']])>
        @foreach ($items as $item)
            <svg class="{{ $wave }} {{ $config['wave'] }}" style="{{ $item['style'] }}" viewBox="0 0 1200 {{ $viewHeight }}" preserveAspectRatio="none">
                @if ($item['filled'])
                    <path d="{{ $item['d'] }}" fill="currentColor" />
                @else
                    <path d="{{ $item['d'] }}" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                @endif
            </svg>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
