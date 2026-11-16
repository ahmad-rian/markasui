@props([
    'cellSize' => 24,
    'fade' => 600,
    'variant' => 'pixel',
    'color' => 'primary',
    'showGrid' => false,
    'autoplay' => false,
])

@php
    $base = 'relative isolate overflow-hidden';
    $canvasClass = 'pointer-events-none absolute inset-0 -z-10 size-full';
    $gridClass = 'bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[var(--cell)_var(--cell)]';
    $colors = [
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
        'ink' => 'text-ink',
    ];
    $options = [
        'size' => (float) $cellSize,
        'fade' => (float) $fade,
        'variant' => in_array($variant, ['pixel', 'dot', 'brush'], true) ? $variant : 'pixel',
        'autoplay' => (bool) $autoplay,
    ];
@endphp

{{-- Lights the cell under the pointer on a canvas and fades it over `fade` ms. Keyboard focus lights the cells around the focused element. --}}
<div
    x-data="{
        stop: null,
        init() {
            const { size, fade, variant, autoplay } = @js($options);
            const root = this.$root;
            const canvas = this.$refs.canvas;
            const context = canvas.getContext?.('2d');
            if (! context || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const lit = new Map();
            let last = null;
            let frame = 0;
            let color = '';
            let inside = false;
            const resize = () => {
                const ratio = window.devicePixelRatio || 1;
                canvas.width = canvas.clientWidth * ratio;
                canvas.height = canvas.clientHeight * ratio;
                context.setTransform(ratio, 0, 0, ratio, 0, 0);
            };
            const draw = (now) => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = color;
                for (const [key, cell] of lit) {
                    const alpha = cell.strength * (1 - (now - cell.time) / fade);
                    if (alpha <= 0) {
                        lit.delete(key);
                        continue;
                    }
                    const [col, row] = key.split(',').map(Number);
                    context.globalAlpha = Math.min(alpha, 1);
                    context.beginPath();
                    if (variant === 'dot') context.arc((col + 0.5) * size, (row + 0.5) * size, size * 0.32, 0, 7);
                    else context.rect(col * size + 0.5, row * size + 0.5, size - 1, size - 1);
                    context.fill();
                }
                frame = lit.size ? requestAnimationFrame(draw) : 0;
            };
            const light = (col, row, strength = 1) => {
                const key = `${col},${row}`;
                const current = lit.get(key);
                if (! current || current.strength * 0.8 <= strength) lit.set(key, { time: performance.now(), strength });
                if (frame) return;
                color = getComputedStyle(canvas).color;
                frame = requestAnimationFrame(draw);
            };
            const paint = (x, y) => {
                const col = Math.floor(x / size);
                const row = Math.floor(y / size);
                light(col, row);
                if (variant !== 'brush') return;
                for (let dx = -2; dx <= 2; dx++)
                    for (let dy = -2; dy <= 2; dy++) {
                        const far = Math.max(Math.abs(dx), Math.abs(dy));
                        if (far) light(col + dx, row + dy, far === 1 ? 0.5 : 0.2);
                    }
            };
            {{-- Paint every half cell between the last point and this one, so fast moves leave no gaps. --}}
            const trail = (x, y) => {
                const from = last ?? { x, y };
                const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y) / (size / 2)));
                for (let i = 1; i <= steps; i++) paint(from.x + ((x - from.x) * i) / steps, from.y + ((y - from.y) * i) / steps);
                last = { x, y };
            };
            const move = (event) => {
                inside = true;
                const rect = root.getBoundingClientRect();
                trail(event.clientX - rect.left, event.clientY - rect.top);
            };
            const leave = () => {
                inside = false;
                last = null;
            };
            const focus = (event) => {
                const target = event.target;
                if (target === root || ! target.matches?.(':focus-visible')) return;
                const box = root.getBoundingClientRect();
                const rect = target.getBoundingClientRect();
                const left = Math.floor((rect.left - box.left) / size) - 1;
                const top = Math.floor((rect.top - box.top) / size) - 1;
                const right = Math.floor((rect.right - box.left) / size) + 1;
                const bottom = Math.floor((rect.bottom - box.top) / size) + 1;
                for (let col = left; col <= right; col++)
                    for (let row = top; row <= bottom; row++)
                        if (col === left || col === right || row === top || row === bottom) light(col, row, 0.8);
            };
            resize();
            const resizer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
            resizer?.observe(canvas);
            root.addEventListener('pointermove', move);
            root.addEventListener('pointerleave', leave);
            root.addEventListener('focusin', focus);
            {{-- Autoplay: a trail of its own while visible, the tab is shown, and the pointer is elsewhere. --}}
            let auto = 0;
            let observer = null;
            let sync = null;
            if (autoplay && typeof IntersectionObserver === 'function') {
                let seen = false;
                const run = (now) => {
                    if (! inside) {
                        const t = now / 1000;
                        trail(canvas.clientWidth * (0.5 + 0.42 * Math.sin(t * 1.3)), canvas.clientHeight * (0.5 + 0.36 * Math.sin(t * 0.9 + 1)));
                    }
                    auto = requestAnimationFrame(run);
                };
                sync = () => {
                    cancelAnimationFrame(auto);
                    if (seen && ! document.hidden) auto = requestAnimationFrame(run);
                };
                observer = new IntersectionObserver(([entry]) => {
                    seen = Boolean(entry?.isIntersecting);
                    sync();
                });
                observer.observe(root);
                document.addEventListener('visibilitychange', sync);
            }
            this.stop = () => {
                resizer?.disconnect();
                observer?.disconnect();
                if (sync) document.removeEventListener('visibilitychange', sync);
                root.removeEventListener('pointermove', move);
                root.removeEventListener('pointerleave', leave);
                root.removeEventListener('focusin', focus);
                cancelAnimationFrame(auto);
                cancelAnimationFrame(frame);
            };
        },
        destroy() {
            this.stop?.();
        },
    }"
    {{ $attributes->merge(['style' => '--cell: '.(float) $cellSize.'px'])->class([$base]) }}
>
    <canvas x-ref="canvas" wire:ignore aria-hidden="true" @class([$canvasClass, $colors[$color] ?? $colors['primary'], $gridClass => $showGrid])></canvas>
    {{ $slot }}
</div>
