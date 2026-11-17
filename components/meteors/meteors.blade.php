@props([
    'variant' => 'rain',
    'count' => null,
    'angle' => 35,
    'speed' => 'normal',
    'color' => 'primary',
    'seed' => 3,
])

@php
    $base = 'relative isolate overflow-hidden';
    $layer = 'pointer-events-none absolute inset-0';
    $meteor = 'absolute rounded-full bg-current [transform:rotate(var(--markas-meteor-angle))] animate-[markas-meteor_6s_linear_infinite] motion-reduce:animate-none before:absolute before:top-1/2 before:left-1/2 before:w-(--markas-meteor-tail) before:-translate-y-1/2 before:rounded-full before:bg-linear-to-r before:from-current before:to-transparent';
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
        'rain' => ['meteor' => 'size-px before:h-px', 'count' => 20, 'tail' => [40, 60]],
        'comet' => ['meteor' => 'size-1 shadow-[0_0_8px_2px_currentColor] before:h-0.5', 'count' => 6, 'tail' => [100, 80]],
    ];
    // Durasi minimum dan rentang tambahan dalam detik.
    $speeds = ['slow' => [9, 6], 'normal' => [5, 4], 'fast' => [2, 3]];
    $keyframes = '@keyframes markas-meteor{0%{transform:rotate(var(--markas-meteor-angle)) translateX(0);opacity:1}70%{opacity:1}to{transform:rotate(var(--markas-meteor-angle)) translateX(-640px);opacity:0}}';

    // Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan meteor yang sama.
    $modulus = 2147483647;
    $multiplier = 48271;
    $maxMeteors = 60;
    $maxAngle = 180;

    $key = array_key_exists($variant, $variants) ? $variant : 'rain';
    $turn = 180 + max(0, min((int) $angle, $maxAngle));
    [$minTail, $tailRange] = $variants[$key]['tail'];
    [$minSeconds, $secondsRange] = $speeds[$speed] ?? $speeds['normal'];

    $state = abs((int) $seed) % ($modulus - 1) + 1;
    $next = function () use (&$state, $modulus, $multiplier) {
        return $state = ($state * $multiplier) % $modulus;
    };
    $meteors = [];
    $total = max(0, min((int) ($count ?? $variants[$key]['count']), $maxMeteors));
    for ($i = 0; $i < $total; $i++) {
        $seconds = $minSeconds + $next() % $secondsRange;
        $meteors[] = 'left: '.($next() % 100).'%; top: '.($next() % 70 - 10).'%; opacity: '.((($next() % 5) + 5) / 10).'; animation-duration: '.$seconds.'s; animation-delay: '.(-($next() % ($seconds * 10)) * 100).'ms; --markas-meteor-tail: '.($minTail + $next() % $tailRange).'px';
    }
@endphp

<div {{ $attributes->class([$base]) }}>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" wire:ignore @class([$layer, $colors[$color] ?? $colors['primary']]) style="--markas-meteor-angle: {{ $turn }}deg">
        @foreach ($meteors as $style)
            <span class="{{ $meteor }} {{ $variants[$key]['meteor'] }}" style="{{ $style }}"></span>
        @endforeach
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
