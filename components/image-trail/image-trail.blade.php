@props([
    'threshold' => 40,
    'variant' => 'fade',
    'max' => 12,
    'duration' => 800,
    'autoplay' => false,
])

@php
    $base = 'relative isolate overflow-hidden';
    $layerClass = 'pointer-events-none absolute inset-0 -z-10 [&>*]:absolute [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2 [&>*]:opacity-0 motion-reduce:hidden';
    $dotClass = 'block size-4 rounded-full bg-primary';
    $items = $__laravel_slots['items'] ?? null;
    $options = [
        'threshold' => (float) $threshold,
        'variant' => in_array($variant, ['fade', 'scale', 'rotate', 'stack'], true) ? $variant : 'fade',
        'max' => (int) $max,
        'duration' => (float) $duration,
        'autoplay' => (bool) $autoplay,
    ];
@endphp

{{-- Clones the next item to the pointer once it has travelled `threshold` px. At most `max` clones live at once. --}}
<div
    x-data="{
        stop: null,
        frames(variant, n) {
            const turn = ((n * 47) % 70) - 35;
            if (variant === 'scale') return [{ opacity: 1, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)', offset: 0.25 }, { opacity: 0, transform: 'scale(0.2)' }];
            if (variant === 'rotate') return [{ opacity: 0, transform: `rotate(${turn}deg) scale(.6)` }, { opacity: 1, transform: `rotate(${turn / 2}deg) scale(1)`, offset: 0.2 }, { opacity: 0, transform: 'rotate(0deg) translateY(32px) scale(.9)' }];
            if (variant === 'stack') return [{ opacity: 0, transform: `rotate(${turn / 3}deg) scale(1.4)` }, { opacity: 1, transform: `rotate(${turn / 3}deg) scale(1)` }];
            return [{ opacity: 1 }, { opacity: 0 }];
        },
        init() {
            const { threshold, variant, max, duration, autoplay } = @js($options);
            const root = this.$root;
            const source = this.$refs.source;
            const layer = this.$refs.layer;
            const still = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            let last = null;
            let count = 0;
            let inside = false;
            const spawn = (x, y) => {
                const items = source.children;
                if (! items.length) return;
                if (last && Math.hypot(x - last.x, y - last.y) < threshold) return;
                last = { x, y };
                if (layer.children.length >= max) layer.firstElementChild?.remove();
                const item = items[count % items.length].cloneNode(true);
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
                layer.append(item);
                const stack = variant === 'stack';
                const animation = item.animate?.(this.frames(variant, count), { duration: stack ? duration * 0.4 : duration, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
                if (animation && ! stack) animation.onfinish = () => item.remove();
                count++;
            };
            const move = (event) => {
                if (still()) return;
                inside = true;
                const rect = root.getBoundingClientRect();
                spawn(event.clientX - rect.left, event.clientY - rect.top);
            };
            const leave = () => {
                inside = false;
                last = null;
                if (variant !== 'stack') return;
                for (const item of [...layer.children]) {
                    const out = item.animate?.([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
                    if (out) out.onfinish = () => item.remove();
                    else item.remove();
                }
            };
            root.addEventListener('pointermove', move);
            root.addEventListener('pointerleave', leave);
            {{-- Autoplay: a figure-eight trail while visible, the tab is shown, and the pointer is elsewhere. --}}
            let frame = 0;
            let observer = null;
            let sync = null;
            if (autoplay && ! still() && typeof IntersectionObserver === 'function') {
                let seen = false;
                const run = (now) => {
                    if (! inside) {
                        const t = now / 1100;
                        const { width, height } = root.getBoundingClientRect();
                        spawn(width * (0.5 + 0.36 * Math.sin(t)), height * (0.5 + 0.3 * Math.sin(2 * t)));
                    }
                    frame = requestAnimationFrame(run);
                };
                sync = () => {
                    cancelAnimationFrame(frame);
                    if (seen && ! document.hidden) frame = requestAnimationFrame(run);
                };
                observer = new IntersectionObserver(([entry]) => {
                    seen = Boolean(entry?.isIntersecting);
                    sync();
                });
                observer.observe(root);
                document.addEventListener('visibilitychange', sync);
            }
            this.stop = () => {
                root.removeEventListener('pointermove', move);
                root.removeEventListener('pointerleave', leave);
                observer?.disconnect();
                if (sync) document.removeEventListener('visibilitychange', sync);
                cancelAnimationFrame(frame);
                layer.replaceChildren();
            };
        },
        destroy() {
            this.stop?.();
        },
    }"
    {{ $attributes->class([$base]) }}
>
    <div x-ref="source" hidden>
        @if ($items)
            {{ $items }}
        @else
            <span class="{{ $dotClass }}"></span>
        @endif
    </div>
    <div x-ref="layer" aria-hidden="true" class="{{ $layerClass }}"></div>
    {{ $slot }}
</div>
