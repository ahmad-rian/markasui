@props([
    'rings' => 6,
    'size' => 120,
    'gap' => 64,
    'color' => 'muted',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]';
    $ring = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[markas-ripple_3.4s_ease-in-out_infinite] rounded-full border border-current bg-current/5 motion-reduce:animate-none';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $keyframes = '@keyframes markas-ripple{0%,100%{transform:scale(1)}50%{transform:scale(.92)}}';
    $ringDelayMs = 120;
    $maxRings = 12;

    // Lingkaran ke-i: makin luar makin besar dan makin pudar, dengan jeda supaya denyut merambat dari tengah.
    $ringStyles = [];
    $total = max(0, min((int) $rings, $maxRings));
    for ($i = 0; $i < $total; $i++) {
        $diameter = (float) $size + $i * (float) $gap;
        $ringStyles[] = 'width: '.$diameter.'px; height: '.$diameter.'px; opacity: '.(max(1, 6 - $i) / 10).'; animation-delay: '.($i * $ringDelayMs).'ms';
    }
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" @class([$layer, $colors[$color] ?? $colors['muted']])>
        @foreach ($ringStyles as $style)
            <span class="{{ $ring }}" style="{{ $style }}"></span>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
