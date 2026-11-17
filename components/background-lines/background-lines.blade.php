@props([
    'variant' => 'waves',
    'count' => 12,
    'speed' => 'normal',
    'color' => 'primary',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]';
    $line = 'animate-[markas-lines-draw_var(--markas-lines-duration)_ease-in-out_infinite] motion-reduce:animate-none';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $speeds = ['slow' => '12s', 'normal' => '8s', 'fast' => '5s'];
    $keyframes = '@keyframes markas-lines-draw{0%{stroke-dashoffset:100}35%,65%{stroke-dashoffset:0}100%{stroke-dashoffset:-100}}';
    $maxLines = 24;
    $lineDelayMs = 650;
    $rayLength = 900;

    // Garis ke-i di kanvas 800x400. Hanya bilangan bulat (floor) supaya Blade, React, dan Vue sama persis.
    $total = max(0, min((int) $count, $maxLines));
    $lines = [];
    for ($i = 0; $i < $total; $i++) {
        if ($variant === 'rays') {
            $angle = (20 + ($i * 140) / max(1, $total - 1)) * M_PI / 180;
            $x = 400 + (int) floor(cos($angle) * $rayLength);
            $y = -40 + (int) floor(sin($angle) * $rayLength);
            $d = "M 400 -40 L {$x} {$y}";
        } elseif ($variant === 'lattice') {
            $pairs = (int) ceil($total / 2);
            $x = -400 + (int) floor(((2 * intdiv($i, 2) + 1) * 800) / $pairs);
            $d = $i % 2 === 0 ? 'M '.$x.' 0 L '.($x + 400).' 400' : 'M '.$x.' 400 L '.($x + 400).' 0';
        } else {
            $y = (int) floor(((2 * $i + 1) * 200) / $total);
            $amp = (24 + ($i % 4) * 10) * ($i % 2 === 0 ? 1 : -1);
            $d = 'M -40 '.$y.' C 160 '.($y - $amp).', 240 '.($y + $amp).', 400 '.$y.' S 640 '.($y - $amp).', 840 '.$y;
        }
        $lines[] = ['d' => $d, 'style' => 'opacity: '.((($i % 3) + 3) / 10).'; animation-delay: '.($i * -$lineDelayMs).'ms'];
    }
@endphp

<div {{ $attributes->merge(['style' => '--markas-lines-duration: '.($speeds[$speed] ?? $speeds['normal'])])->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <svg aria-hidden="true" wire:ignore @class([$layer, $colors[$color] ?? $colors['primary']]) viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width="1.5">
        @foreach ($lines as $item)
            <path class="{{ $line }}" d="{{ $item['d'] }}" pathLength="100" stroke-dasharray="100" style="{{ $item['style'] }}"></path>
        @endforeach
    </svg>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
