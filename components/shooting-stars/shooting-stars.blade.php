@props([
    'variant' => 'night',
    'frequency' => 'normal',
    'trailColor' => null,
    'stars' => 70,
    'seed' => 11,
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0';
    $star = 'absolute rounded-full bg-ink animate-[markas-star-blink_3s_ease-in-out_infinite] motion-reduce:animate-none';
    $streak = 'absolute h-px rounded-full bg-linear-to-r from-ink via-current to-transparent [transform:rotate(215deg)] animate-[markas-shooting-star_9s_ease-out_infinite] motion-reduce:animate-none';
    $content = 'relative';
    $trailColors = [
        'muted' => 'text-muted',
        'ink' => 'text-ink',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $variants = [
        'night' => ['glow' => '', 'trail' => 'primary', 'sky' => 100],
        'dawn' => ['glow' => 'absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-warning/25 via-danger/5 to-transparent', 'trail' => 'warning', 'sky' => 60],
    ];
    // Satu putaran animasi dalam milidetik; tiga bintang jatuh berbagi putaran, jadi satu muncul tiap sepertiganya.
    $frequencies = ['low' => 15000, 'normal' => 9000, 'high' => 4500];
    $keyframes = '@keyframes markas-star-blink{50%{opacity:.2}}@keyframes markas-shooting-star{0%{transform:rotate(215deg) translateX(0);opacity:0}2%{opacity:1}14%,to{transform:rotate(215deg) translateX(-360px);opacity:0}}';

    // Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan langit yang sama.
    $modulus = 2147483647;
    $multiplier = 48271;
    $maxStars = 300;
    $streakCount = 3;
    $jitterMs = 1000;

    $key = array_key_exists($variant, $variants) ? $variant : 'night';
    $config = $variants[$key];
    $trail = $trailColors[$trailColor ?? $config['trail']] ?? $trailColors['primary'];

    $state = abs((int) $seed) % ($modulus - 1) + 1;
    $next = function () use (&$state, $modulus, $multiplier) {
        return $state = ($state * $multiplier) % $modulus;
    };
    $starStyles = [];
    $total = max(0, min((int) $stars, $maxStars));
    for ($i = 0; $i < $total; $i++) {
        $size = $next() % 6 === 0 ? 2 : 1;
        $starStyles[] = 'left: '.(($next() % 10000) / 100).'%; top: '.(($next() % ($config['sky'] * 100)) / 100).'%; width: '.$size.'px; height: '.$size.'px; opacity: '.((($next() % 6) + 3) / 10).'; animation-delay: '.(($next() % 30) * 100).'ms; animation-duration: '.(($next() % 3) + 2).'s';
    }
    $cycle = $frequencies[$frequency] ?? $frequencies['normal'];
    $streakStyles = [];
    for ($i = 0; $i < $streakCount; $i++) {
        $streakStyles[] = 'left: '.(20 + $next() % 60).'%; top: '.($next() % 45).'%; width: '.(80 + $next() % 60).'px; animation-duration: '.$cycle.'ms; animation-delay: '.(-((($streakCount - $i) % $streakCount) * intdiv($cycle, $streakCount) + $next() % $jitterMs)).'ms';
    }
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" wire:ignore @class([$layer, $trail])>
        @if ($config['glow'])
            <div class="{{ $config['glow'] }}"></div>
        @endif
        @foreach ($starStyles as $style)
            <span class="{{ $star }}" style="{{ $style }}"></span>
        @endforeach
        @foreach ($streakStyles as $style)
            <span class="{{ $streak }}" style="{{ $style }}"></span>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
