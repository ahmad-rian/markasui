@props([
    'target' => 'page',
    'color' => 'primary',
    'size' => 'sm',
])

@php
    $root = 'pointer-events-none z-50 w-full';
    $bar = 'h-full w-full origin-left';
    $targets = [
        'page' => 'fixed inset-x-0 top-0',
        'parent' => 'sticky top-0 left-0',
    ];
    $sizes = [
        'sm' => 'h-0.5',
        'md' => 'h-1',
        'lg' => 'h-1.5',
    ];
    $colors = [
        'primary' => 'bg-primary',
        'success' => 'bg-success',
        'warning' => 'bg-warning',
        'danger' => 'bg-danger',
    ];
@endphp

<div
    x-data="{
        frame: 0,
        source: null,
        events: null,
        {{-- Isi bar sesuai posisi gulir halaman atau elemen induk. Pembaruan digabung per frame. --}}
        update() {
            this.frame = 0;
            const max = this.source.scrollHeight - this.source.clientHeight;
            const progress = max > 0 ? Math.min(Math.max(this.source.scrollTop / max, 0), 1) : 0;
            this.$refs.fill.style.transform = `scaleX(${progress})`;
        },
        schedule() {
            if (! this.frame) this.frame = requestAnimationFrame(() => this.update());
        },
        init() {
            const scroller = @js($target) === 'parent' ? this.$el.parentElement : null;
            this.source = scroller ?? document.documentElement;
            this.events = scroller ?? window;
            this.schedule = this.schedule.bind(this);
            this.update();
            this.events.addEventListener('scroll', this.schedule, { passive: true });
            window.addEventListener('resize', this.schedule, { passive: true });
        },
        destroy() {
            cancelAnimationFrame(this.frame);
            this.events?.removeEventListener('scroll', this.schedule);
            window.removeEventListener('resize', this.schedule);
        },
    }"
    aria-hidden="true"
    {{ $attributes->class([$root, $targets[$target], $sizes[$size]]) }}
><div x-ref="fill" class="{{ $bar }} {{ $colors[$color] }}" style="transform: scaleX(0)"></div></div>
