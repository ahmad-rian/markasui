@props([
    'variant' => 'primary',
    'size' => 'md',
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
    $layer = 'pointer-events-none absolute inset-0 -z-10';
    $wave = 'absolute rounded-full bg-current opacity-0';
@endphp

{{-- Each click adds one wave, from the pointer or from the center for keyboard clicks. --}}
<button
    x-data="{
        ripple(event) {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const rect = this.$el.getBoundingClientRect();
            const fromPointer = event.detail > 0;
            const x = fromPointer ? event.clientX - rect.left : rect.width / 2;
            const y = fromPointer ? event.clientY - rect.top : rect.height / 2;
            const diameter = Math.hypot(rect.width, rect.height) * 2;
            const element = document.createElement('span');
            element.className = @js($wave);
            element.style.cssText = `left:${x - diameter / 2}px;top:${y - diameter / 2}px;width:${diameter}px;height:${diameter}px`;
            this.$refs.layer.append(element);
            if (typeof element.animate !== 'function') return element.remove();
            element.animate(
                [{ scale: '0', opacity: 0.25 }, { scale: '1', opacity: 0 }],
                { duration: 600, easing: 'ease-out' },
            ).onfinish = () => element.remove();
        },
    }"
    x-on:click="ripple($event)"
    {{ $attributes->merge(['type' => 'button'])->class([$base, $variants[$variant], $sizes[$size]]) }}
>
    <span x-ref="layer" class="{{ $layer }}" aria-hidden="true"></span>
    {{ $slot }}
</button>
