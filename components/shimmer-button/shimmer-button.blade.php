@props([
    'variant' => 'primary',
    'size' => 'md',
    'duration' => 2400,
])

@php
    $base = 'relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';
    $variants = [
        'primary' => 'bg-primary text-on-primary hover:bg-primary-strong',
        'secondary' => 'border border-line bg-surface text-ink hover:bg-subtle',
        'ghost' => 'text-ink hover:bg-subtle',
        'danger' => 'bg-danger text-on-primary hover:bg-danger/90',
    ];
    $sizes = [
        'sm' => 'h-8 rounded-md px-3 text-sm',
        'md' => 'h-10 rounded-lg px-4 text-sm',
        'lg' => 'h-12 rounded-lg px-6 text-base',
    ];
    $sheen = 'pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-transparent';
    $sheenVariants = [
        'primary' => 'via-on-primary/30',
        'secondary' => 'via-primary/10',
        'ghost' => 'via-primary/10',
        'danger' => 'via-on-primary/30',
    ];
@endphp

{{-- The sheen sweeps across in the first 60% of each cycle, then rests off the button. It pauses off screen. --}}
<button
    x-data="{
        stop() {},
        init() {
            const sheen = this.$refs.sheen;
            if (typeof sheen.animate !== 'function') return;
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const animation = sheen.animate(
                [{ translate: '0 0' }, { translate: '300% 0', offset: 0.6 }, { translate: '300% 0' }],
                { duration: {{ (int) $duration }}, iterations: Infinity, easing: 'ease-in-out' },
            );
            if (typeof IntersectionObserver === 'undefined') {
                this.stop = () => animation.cancel();
                return;
            }
            const observer = new IntersectionObserver(([entry]) =>
                entry?.isIntersecting ? animation.play() : animation.pause(),
            );
            observer.observe(this.$el);
            this.stop = () => {
                observer.disconnect();
                animation.cancel();
            };
        },
        destroy() {
            this.stop();
        },
    }"
    {{ $attributes->merge(['type' => 'button'])->class([$base, $variants[$variant], $sizes[$size]]) }}
>
    {{ $slot }}
    <span x-ref="sheen" class="{{ $sheen }} {{ $sheenVariants[$variant] }}" aria-hidden="true"></span>
</button>
