@props([
    'variant' => 'field',
    'density' => 24,
    'size' => 'md',
    'color' => 'warning',
    'seed' => 5,
])

@php
    $base = 'group/sparkles relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0';
    $sparkle = 'absolute -translate-1/2 fill-current';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted',
        'ink' => 'text-ink',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $twinkle = 'animate-[markas-sparkle_3s_ease-in-out_infinite] motion-reduce:animate-none';
    $variants = [
        'field' => $twinkle,
        'text' => $twinkle,
        'burst' => 'top-1/2 left-1/2 opacity-0 motion-safe:group-focus-within/sparkles:animate-[markas-sparkle-burst_1.2s_ease-out_infinite] motion-safe:group-hover/sparkles:animate-[markas-sparkle-burst_1.2s_ease-out_infinite]',
    ];
    // Ukuran terkecil dan rentang tambahan dalam piksel.
    $sizes = ['sm' => [4, 4], 'md' => [6, 6], 'lg' => [10, 8]];
    $star = 'M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z';
    $keyframes = '@keyframes markas-sparkle{0%,to{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes markas-sparkle-burst{0%{opacity:0;transform:translate(0,0) scale(.3)}30%{opacity:1}to{opacity:0;transform:translate(var(--markas-sparkle-x),var(--markas-sparkle-y)) scale(1) rotate(90deg)}}';

    // Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan kilau yang sama.
    $modulus = 2147483647;
    $multiplier = 48271;
    $maxSparkles = 120;
    $burstX = 240;
    $burstY = 140;
    $burstDelayMs = 600;
    $edge = 1500;

    $key = array_key_exists($variant, $variants) ? $variant : 'field';
    [$minSize, $sizeRange] = $sizes[$size] ?? $sizes['md'];

    $state = abs((int) $seed) % ($modulus - 1) + 1;
    $next = function () use (&$state, $modulus, $multiplier) {
        return $state = ($state * $multiplier) % $modulus;
    };
    // Posisi dalam persen: acak di seluruh area (field), atau di pita tepi atas, bawah, kiri, kanan (text).
    $place = function () use ($key, $next, $edge) {
        if ($key === 'field') {
            $left = ($next() % 10000) / 100;

            return [$left, ($next() % 10000) / 100];
        }
        $side = $next() % 4;
        $along = ($next() % 10000) / 100;
        $near = ($next() % $edge) / 100;
        $far = (10000 - $next() % $edge) / 100;

        return [[$along, $along, $near, $far][$side], [$near, $far, $along, $along][$side]];
    };

    $items = [];
    $total = max(0, min((int) $density, $maxSparkles));
    for ($i = 0; $i < $total; $i++) {
        $px = ($minSize + $next() % $sizeRange).'px';
        $dot = $key === 'field' && $next() % 3 === 0;
        if ($key === 'burst') {
            $style = 'width: '.$px.'; height: '.$px.'; animation-delay: '.($next() % $burstDelayMs).'ms; --markas-sparkle-x: '.($next() % $burstX - $burstX / 2).'px; --markas-sparkle-y: '.($next() % $burstY - $burstY / 2).'px';
        } else {
            [$left, $top] = $place();
            $style = 'left: '.$left.'%; top: '.$top.'%; width: '.$px.'; height: '.$px.'; opacity: '.((($next() % 5) + 5) / 10).'; animation-delay: '.(($next() % 30) * 100).'ms; animation-duration: '.(($next() % 3) + 2).'s';
        }
        $items[] = ['dot' => $dot, 'style' => $style];
    }
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" wire:ignore @class([$layer, $colors[$color] ?? $colors['warning']])>
        @foreach ($items as $item)
            <svg class="{{ $sparkle }} {{ $variants[$key] }}" style="{{ $item['style'] }}" viewBox="0 0 24 24">
                @if ($item['dot'])
                    <circle cx="12" cy="12" r="5" />
                @else
                    <path d="{{ $star }}" />
                @endif
            </svg>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
