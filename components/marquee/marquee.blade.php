@props([
    'vertical' => false,
    'reverse' => false,
    'duration' => 20,
    'pauseOnHover' => true,
    'fade' => true,
])

@php
    $root = 'flex overflow-hidden';
    $copy = 'flex shrink-0 justify-around gap-4';
    $orientations = [
        'horizontal' => ['root' => 'flex-row', 'copy' => 'min-w-full flex-row pr-4'],
        'vertical' => ['root' => 'flex-col', 'copy' => 'min-h-full flex-col pb-4'],
    ];
    $fades = [
        'horizontal' => 'mask-x-from-85%',
        'vertical' => 'mask-y-from-85%',
    ];

    $orientation = $vertical ? 'vertical' : 'horizontal';
@endphp

<div
    x-data="{
        animations: [],
        observer: null,
        hover: false,
        focus: false,
        hidden: false,
        {{-- Geser setiap salinan sejauh lebarnya sendiri tanpa henti. --}}
        init() {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const axis = @js($vertical ? 'Y' : 'X');
            this.animations = Array.from(this.$el.children).flatMap((child) => child.animate?.(
                [{ transform: `translate${axis}(0)` }, { transform: `translate${axis}(-100%)` }],
                { duration: @js((float) $duration) * 1000, iterations: Infinity, direction: @js($reverse ? 'reverse' : 'normal') },
            ) ?? []);
            if (typeof IntersectionObserver === 'undefined') return;
            this.observer = new IntersectionObserver((entries) => {
                this.hidden = ! entries.some((entry) => entry.isIntersecting);
                this.sync();
            });
            this.observer.observe(this.$el);
        },
        {{-- Berhenti saat kursor di atas, fokus di dalam, atau marquee di luar layar. --}}
        sync() {
            const paused = (@js((bool) $pauseOnHover) && this.hover) || this.focus || this.hidden;
            this.animations.forEach((animation) => (paused ? animation.pause() : animation.play()));
        },
        destroy() {
            this.observer?.disconnect();
            this.animations.forEach((animation) => animation.cancel());
        },
    }"
    @mouseenter="hover = true; sync()"
    @mouseleave="hover = false; sync()"
    @focusin="focus = true; sync()"
    @focusout="focus = false; sync()"
    {{ $attributes->class([$root, $orientations[$orientation]['root'], $fades[$orientation] => $fade]) }}
>
    <div class="{{ $copy }} {{ $orientations[$orientation]['copy'] }}">{{ $slot }}</div>
    <div aria-hidden="true" inert class="{{ $copy }} {{ $orientations[$orientation]['copy'] }}">{{ $slot }}</div>
</div>
