@props([
    'count' => 80,
    'seed' => 7,
    'color' => 'primary',
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0';
    $star = 'absolute rounded-full bg-current animate-[markas-twinkle_3s_ease-in-out_infinite] motion-reduce:animate-none';
    $content = 'relative';
    $colors = [
        'muted' => 'text-muted',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $keyframes = '@keyframes markas-twinkle{50%{opacity:.15}}';

    // Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan bintang yang sama.
    $modulus = 2147483647;
    $multiplier = 48271;
    $maxStars = 400;

    $state = abs((int) $seed) % ($modulus - 1) + 1;
    $next = function () use (&$state, $modulus, $multiplier) {
        return $state = ($state * $multiplier) % $modulus;
    };
    $stars = [];
    $total = max(0, min((int) $count, $maxStars));
    for ($i = 0; $i < $total; $i++) {
        $size = $next() % 5 === 0 ? 2 : 1;
        $stars[] = 'left: '.(($next() % 10000) / 100).'%; top: '.(($next() % 10000) / 100).'%; width: '.$size.'px; height: '.$size.'px; opacity: '.((($next() % 6) + 4) / 10).'; animation-delay: '.(($next() % 30) * 100).'ms; animation-duration: '.(($next() % 3) + 2).'s';
    }
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" wire:ignore @class([$layer, $colors[$color] ?? $colors['primary']])>
        @foreach ($stars as $style)
            <span class="{{ $star }}" style="{{ $style }}"></span>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
