@props([
    'variant' => 'top-left',
    'color' => 'primary',
    'intensity' => 'medium',
    'speed' => 'normal',
    'follow' => false,
])

@php
    $base = 'relative isolate overflow-hidden [--markas-beam-play:paused] data-[visible]:[--markas-beam-play:running]';
    $layer = 'pointer-events-none absolute inset-0 overflow-hidden';
    $source = 'absolute inset-0 [translate:calc(var(--markas-beam-x,0)*4%)_calc(var(--markas-beam-y,0)*4%)] animate-[markas-beam_var(--markas-beam-speed)_cubic-bezier(0.22,1,0.36,1)_both_var(--markas-beam-play)] transition-[translate] duration-700 ease-out motion-reduce:animate-none motion-reduce:transition-none';
    $beams = [
        'absolute top-0 left-[var(--markas-beam-left)] h-[90%] w-[140%] origin-left -translate-y-1/2 rotate-[calc(var(--markas-beam-angle)+6deg)] bg-[radial-gradient(ellipse_100%_50%_at_0%_50%,color-mix(in_oklab,currentColor_calc(var(--markas-beam-strength)*0.35),transparent),transparent)]',
        'absolute top-0 left-[var(--markas-beam-left)] h-[50%] w-[170%] origin-left -translate-y-1/2 rotate-[var(--markas-beam-angle)] bg-[radial-gradient(ellipse_100%_50%_at_0%_50%,color-mix(in_oklab,currentColor_var(--markas-beam-strength),transparent),transparent)]',
        'absolute top-0 left-[var(--markas-beam-left)] h-[22%] w-[140%] origin-left -translate-y-1/2 rotate-[calc(var(--markas-beam-angle)-2deg)] bg-[radial-gradient(ellipse_100%_50%_at_0%_50%,color-mix(in_oklab,currentColor_calc(var(--markas-beam-strength)*1.1),transparent),transparent)]',
    ];
    $content = 'relative';
    $variants = [
        'top-left' => '[--markas-beam-angle:32deg] [--markas-beam-left:0%] [--markas-beam-dx:-8%]',
        'top-right' => '-scale-x-100 [--markas-beam-angle:32deg] [--markas-beam-left:0%] [--markas-beam-dx:-8%]',
        'center' => '[--markas-beam-angle:90deg] [--markas-beam-left:50%] [--markas-beam-dx:0%]',
    ];
    $colors = [
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
        'muted' => 'text-muted',
    ];
    $intensities = [
        'soft' => '[--markas-beam-strength:22%]',
        'medium' => '[--markas-beam-strength:34%]',
        'strong' => '[--markas-beam-strength:50%]',
    ];
    $speeds = [
        'slow' => '[--markas-beam-speed:2.4s]',
        'normal' => '[--markas-beam-speed:1.6s]',
        'fast' => '[--markas-beam-speed:0.9s]',
    ];
    $keyframes = '@keyframes markas-beam{from{opacity:0;transform:translate(var(--markas-beam-dx),-10%) scale(.9)}}';
@endphp

{{-- Mark the root visible the first time it scrolls into view, which starts the entrance. With follow, the light source leans a little toward the pointer. --}}
<div
    x-data="{
        observer: null,
        init() {
            const show = () => this.$el.setAttribute('data-visible', '');
            if (typeof IntersectionObserver === 'undefined') return show();
            this.observer = new IntersectionObserver((entries) => {
                if (! entries.some((entry) => entry.isIntersecting)) return;
                this.observer.disconnect();
                show();
            });
            this.observer.observe(this.$el);
        },
        lean(event) {
            if (! @js((bool) $follow) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const rect = this.$el.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
            this.$el.style.setProperty('--markas-beam-x', x.toFixed(3));
            this.$el.style.setProperty('--markas-beam-y', y.toFixed(3));
        },
        destroy() {
            this.observer?.disconnect();
        },
    }"
    @pointermove="lean($event)"
    {{ $attributes->class([$base]) }}
>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" @class([$layer, $colors[$color] ?? $colors['primary'], $intensities[$intensity] ?? $intensities['medium'], $speeds[$speed] ?? $speeds['normal']])>
        <div @class([$source, $variants[$variant] ?? $variants['top-left']])>
            @foreach ($beams as $beam)
                <div class="{{ $beam }}"></div>
            @endforeach
        </div>
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
