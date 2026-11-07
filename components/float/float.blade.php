@props([
    'motion' => 'drift',
    'amplitude' => 10,
    'duration' => 6,
    'seed' => 1,
    'parallax' => 0,
    'entrance' => false,
])

@php
    $base = '[&>*]:transition-[translate] [&>*]:duration-700 [&>*]:ease-out motion-reduce:[&>*]:transition-none';
@endphp

{{-- Floats each child on its own loop, pauses one while it is hovered or focused, and pauses all when off screen. With parallax, children shift toward the pointer by their depth. --}}
<div
    x-data="{
        stop: null,
        init() {
            if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const o = { motion: @js($motion), amplitude: @js((float) $amplitude), duration: @js((float) $duration), seed: @js((float) $seed), parallax: @js((float) $parallax), entrance: @js((bool) $entrance) };
            const root = this.$el;
            const turn = Math.PI * 2;
            const rand = (seed, n) => {
                const x = Math.sin(seed * 78.233 + n * 12.9898) * 43758.5453;
                return x - Math.floor(x);
            };
            const paths = {
                drift: (t, a) => [a * 0.6 * Math.sin(turn * t), a * 0.5 * Math.sin(turn * 2 * t), a * 0.3 * Math.sin(turn * t), 1],
                bob: (t, a) => [0, (-a * (1 - Math.cos(turn * t))) / 2, 0, 1],
                orbit: (t, a) => [a * Math.cos(turn * t), a * Math.sin(turn * t), 0, 1],
                breathe: (t, a) => {
                    const k = (1 - Math.cos(turn * t)) / 2;
                    return [0, -a * 0.3 * k, 0, 1 + (a / 100) * k];
                },
            };
            const items = [...root.children];
            const path = paths[o.motion] ?? paths.drift;
            const loops = items.map((el, i) => {
                const amp = o.amplitude * (0.7 + 0.6 * rand(o.seed, i * 4));
                const sign = rand(o.seed, i * 4 + 1) < 0.5 ? -1 : 1;
                const ms = o.duration * 1000 * (0.8 + 0.4 * rand(o.seed, i * 4 + 2));
                const frames = Array.from({ length: 13 }, (_, s) => {
                    const [x, y, r, k] = path(s / 12, amp);
                    return { transform: `translate(${x * sign}px, ${y}px) rotate(${r * sign}deg) scale(${k})` };
                });
                return el.animate?.(frames, { duration: ms, delay: -rand(o.seed, i * 4 + 3) * ms, iterations: Infinity });
            });
            const held = new Set();
            let hidden = false;
            let entered = ! o.entrance;
            {{-- Rise in one after another the first time the group scrolls into view. --}}
            const enter = () => {
                entered = true;
                items.forEach((el, i) => el.animate?.(
                    [{ opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 }],
                    { duration: 600, delay: i * 90, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'backwards' },
                ));
            };
            const sync = () => loops.forEach((loop, i) => (hidden || held.has(i) ? loop?.pause() : loop?.play()));
            const hold = (on) => (e) => {
                const i = items.findIndex((el) => el.contains(e.target));
                if (i < 0 || (! on && items[i].contains(e.relatedTarget))) return;
                if (on) held.add(i);
                else held.delete(i);
                sync();
            };
            const pointer = (e) => {
                const r = root.getBoundingClientRect();
                const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
                const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
                items.forEach((el, i) => {
                    const depth = Number(el.dataset.depth ?? 0.3 + 0.7 * rand(o.seed, i * 4 + 1));
                    el.style.translate = `${nx * depth * o.parallax}px ${ny * depth * o.parallax}px`;
                });
            };
            const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
                hidden = ! entry?.isIntersecting;
                if (! hidden && ! entered) enter();
                sync();
                if (! o.parallax) return;
                if (hidden) removeEventListener('pointermove', pointer);
                else addEventListener('pointermove', pointer);
            });
            if (observer) observer.observe(root);
            else {
                if (! entered) enter();
                if (o.parallax) addEventListener('pointermove', pointer);
            }
            const listeners = [['pointerover', hold(true)], ['pointerout', hold(false)], ['focusin', hold(true)], ['focusout', hold(false)]];
            for (const [type, fn] of listeners) root.addEventListener(type, fn);
            this.stop = () => {
                observer?.disconnect();
                removeEventListener('pointermove', pointer);
                for (const [type, fn] of listeners) root.removeEventListener(type, fn);
                for (const loop of loops) loop?.cancel();
                for (const el of items) el.style.translate = '';
            };
        },
        destroy() {
            this.stop?.();
        },
    }"
    {{ $attributes->class([$base]) }}
>
    {{ $slot }}
</div>
