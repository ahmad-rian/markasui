@props([
    'variant' => 'flow',
    'count' => 8,
    'speed' => 'normal',
    'color' => 'primary',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]';
    $track = 'opacity-15';
    $beams = [
        'flow' => 'animate-[markas-beams-flow_var(--markas-beams-duration)_linear_infinite] motion-reduce:animate-none',
        'pulse' => 'animate-[markas-beams-pulse_var(--markas-beams-duration)_ease-in-out_infinite] motion-reduce:animate-none',
    ];
    $rainLayer = 'pointer-events-none absolute inset-0';
    $floor = 'absolute inset-x-0 bottom-0 h-px bg-current opacity-30';
    $drop = 'absolute top-0 h-full w-px animate-[markas-beams-fall_var(--markas-beams-duration)_linear_infinite] bg-[linear-gradient(to_bottom,transparent_75%,currentColor)] motion-reduce:animate-none';
    $splash = 'absolute bottom-0 size-10 -translate-x-1/2 translate-y-1/2 animate-[markas-beams-splash_var(--markas-beams-duration)_linear_infinite] rounded-full bg-[radial-gradient(circle,currentColor,transparent_65%)] opacity-0 motion-reduce:animate-none';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $speeds = ['slow' => '12s', 'normal' => '7s', 'fast' => '4s'];
    $keyframes = '@keyframes markas-beams-flow{from{stroke-dashoffset:14}to{stroke-dashoffset:-100}}@keyframes markas-beams-pulse{0%,100%{opacity:.1}50%{opacity:.9}}@keyframes markas-beams-fall{0%{translate:0 -100%;opacity:1}70%{translate:0 0;opacity:1}71%,100%{translate:0 0;opacity:0}}@keyframes markas-beams-splash{0%,69%{opacity:0;scale:.3}72%{opacity:1}100%{opacity:0;scale:1.6}}';
    $maxBeams = 16;
    $beamDelayMs = 900;
    $rates = ['1', '1.3', '0.8', '1.15', '0.9'];

    $total = max(0, min((int) $count, $maxBeams));
    $tone = $colors[$color] ?? $colors['primary'];
    $isCollide = $variant === 'collide';
    $isPulse = $variant === 'pulse';

    // Berkas vertikal ke-i: posisi, tinggi awal, laju, dan jeda dari rumus supaya tiga framework sama.
    $drops = [];
    // Kurva ke-i di kanvas 800x400, menyapu dari kiri atas ke kanan bawah. Bilangan bulat saja.
    $curves = [];
    for ($i = 0; $i < $total; $i++) {
        $delay = 'animation-delay: '.($i * -$beamDelayMs).'ms';
        if ($isCollide) {
            $left = 'left: '.((intdiv((2 * $i + 1) * 500, max(1, $total)) + (($i * 37) % 11) - 5) / 10).'%';
            $timing = 'animation-duration: calc(var(--markas-beams-duration) * '.$rates[$i % count($rates)].'); '.$delay;
            $drops[] = [
                'drop' => $timing.'; '.$left.'; translate: 0 -'.(($i * 23) % 80).'%',
                'splash' => $timing.'; '.$left,
            ];
        } else {
            $shift = intdiv($i * 640, max(1, $total));
            $bend = ($i % 3) * 30;
            $curves[] = [
                'd' => 'M '.($shift - 200).' -20 C '.$shift.' '.(120 + $bend).', '.($shift + 160).' '.(260 - $bend).', '.($shift + 620).' 420',
                'style' => $isPulse ? 'opacity: '.((($i % 4) + 3) / 10).'; '.$delay : 'stroke-dashoffset: '.(-(($i * 37) % 90)).'; '.$delay,
            ];
        }
    }
@endphp

<div {{ $attributes->merge(['style' => '--markas-beams-duration: '.($speeds[$speed] ?? $speeds['normal'])])->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    @if ($isCollide)
        <div aria-hidden="true" wire:ignore @class([$rainLayer, $tone])>
            <span class="{{ $floor }}"></span>
            @foreach ($drops as $item)
                <span><span class="{{ $drop }}" style="{{ $item['drop'] }}"></span><span class="{{ $splash }}" style="{{ $item['splash'] }}"></span></span>
            @endforeach
        </div>
    @else
        <svg aria-hidden="true" wire:ignore @class([$layer, $tone]) viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-linecap="round">
            @foreach ($curves as $item)
                <g>
                    <path class="{{ $track }}" d="{{ $item['d'] }}" stroke-width="1"></path>
                    <path class="{{ $isPulse ? $beams['pulse'] : $beams['flow'] }}" d="{{ $item['d'] }}" stroke-width="2" pathLength="100" @if (! $isPulse) stroke-dasharray="14 186" @endif style="{{ $item['style'] }}"></path>
                </g>
            @endforeach
        </svg>
    @endif
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
