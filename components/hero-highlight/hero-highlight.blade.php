@props([
    'variant' => 'dots',
    'color' => 'primary',
    'spacing' => 16,
    'radius' => 160,
    'speed' => 'normal',
])

@php
    $base = 'group/highlight relative isolate overflow-hidden [--markas-hh-x:50%] [--markas-hh-y:50%] [--markas-hh-play:paused] data-[visible]:[--markas-hh-play:running] [&_mark]:rounded-md [&_mark]:bg-transparent [&_mark]:bg-[linear-gradient(to_right,color-mix(in_oklab,var(--markas-hh-color)_18%,transparent),color-mix(in_oklab,var(--markas-hh-color)_34%,transparent))] [&_mark]:[background-size:100%_100%] [&_mark]:bg-left [&_mark]:bg-no-repeat [&_mark]:box-decoration-clone [&_mark]:px-1 [&_mark]:text-ink [&_mark]:animate-[markas-highlight_var(--markas-hh-speed)_cubic-bezier(0.22,1,0.36,1)_0.3s_both_var(--markas-hh-play)] motion-reduce:[&_mark]:animate-none';
    $layer = 'pointer-events-none absolute inset-0';
    $dim = 'absolute inset-0 text-muted/20';
    $glow = 'absolute inset-0 text-[var(--markas-hh-color)] opacity-0 transition-opacity duration-300 ease-out [mask-image:radial-gradient(var(--markas-hh-radius)_circle_at_var(--markas-hh-x)_var(--markas-hh-y),black,transparent)] group-hover/highlight:opacity-100 motion-reduce:transition-none';
    $content = 'relative';
    $variants = [
        'dots' => 'bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:var(--markas-hh-spacing)_var(--markas-hh-spacing)]',
        'grid' => 'bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-hh-spacing)_var(--markas-hh-spacing)]',
    ];
    $colors = [
        'primary' => '[--markas-hh-color:var(--markas-primary)]',
        'success' => '[--markas-hh-color:var(--markas-success)]',
        'warning' => '[--markas-hh-color:var(--markas-warning)]',
        'danger' => '[--markas-hh-color:var(--markas-danger)]',
    ];
    $speeds = [
        'slow' => '[--markas-hh-speed:1.6s]',
        'normal' => '[--markas-hh-speed:1s]',
        'fast' => '[--markas-hh-speed:0.6s]',
    ];
    $keyframes = '@keyframes markas-highlight{from{background-size:0% 100%}}';
    $pattern = $variants[$variant] ?? $variants['dots'];
    $vars = '--markas-hh-spacing: '.(float) $spacing.'px; --markas-hh-radius: '.(float) $radius.'px';
@endphp

{{-- Mark the root visible the first time it scrolls into view, which starts drawing the marks. The pointer position is stored so the bright dots gather around it. --}}
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
        track(event) {
            const rect = this.$el.getBoundingClientRect();
            this.$el.style.setProperty('--markas-hh-x', (event.clientX - rect.left) + 'px');
            this.$el.style.setProperty('--markas-hh-y', (event.clientY - rect.top) + 'px');
        },
        destroy() {
            this.observer?.disconnect();
        },
    }"
    @pointermove="track($event)"
    {{ $attributes->class([$base, $colors[$color] ?? $colors['primary'], $speeds[$speed] ?? $speeds['normal']])->merge(['style' => $vars]) }}
>
    <style>{!! $keyframes !!}</style>
    <div aria-hidden="true" class="{{ $layer }}">
        <div class="{{ $dim }} {{ $pattern }}"></div>
        <div class="{{ $glow }} {{ $pattern }}"></div>
    </div>
    <div class="{{ $content }}">{{ $slot }}</div>
</div>
