@props([
    'variant' => 'pull',
    'orientation' => 'horizontal',
    'reach' => 24,
    'color' => 'line',
    'strokeWidth' => 1.5,
    'playOnView' => false,
    'decorative' => false,
])

@php
    $base = 'relative block';
    $orientations = [
        'horizontal' => 'h-[calc(var(--reach)*2)]',
        'vertical' => 'w-[calc(var(--reach)*2)] self-stretch',
    ];
    $colors = [
        'line' => 'text-line',
        'muted' => 'text-muted',
        'ink' => 'text-ink',
        'primary' => 'text-primary',
        'success' => 'text-success',
        'warning' => 'text-warning',
        'danger' => 'text-danger',
    ];
    $svgClass = 'pointer-events-none absolute inset-0 size-full overflow-visible';
    $pathClass = 'fill-none stroke-current [vector-effect:non-scaling-stroke]';
    $vertical = $orientation === 'vertical';
    $options = [
        'vertical' => $vertical,
        'variant' => in_array($variant, ['pull', 'push', 'pluck'], true) ? $variant : 'pull',
        'playOnView' => (bool) $playOnView,
    ];
    $a11y = $decorative ? ['aria-hidden' => 'true'] : ['role' => 'separator', 'aria-orientation' => $vertical ? 'vertical' : 'horizontal'];
@endphp

{{-- Bends toward (pull), away from (push), or with the pointer until it slips (pluck), then springs back. rAF only runs while active. --}}
<div
    x-data="{
        stop: null,
        curve(vertical, along = 50, bend = 0) {
            return vertical ? `M50 0Q${50 + 2 * bend} ${along} 50 100` : `M0 50Q${along} ${50 + 2 * bend} 100 50`;
        },
        init() {
            const { vertical, variant, playOnView } = @js($options);
            const springs = { pull: { k: 0.12, d: 0.82 }, push: { k: 0.1, d: 0.8 }, pluck: { k: 0.3, d: 0.6 }, release: { k: 0.18, d: 0.93 } };
            const root = this.$root;
            const path = this.$refs.path;
            const still = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            let pointer = null;
            let along = 50;
            let bend = 0;
            let speed = 0;
            let grabbed = false;
            let frame = 0;
            const reach = () => {
                const rect = root.getBoundingClientRect();
                return (vertical ? rect.width : rect.height) / 2 || 1;
            };
            const step = () => {
                const half = reach();
                let target = 0;
                let spring = springs.release;
                if (pointer) {
                    along = Math.min(Math.max(pointer.along, 10), 90);
                    const perp = pointer.perp;
                    if (variant === 'pull') target = perp;
                    if (variant === 'push') target = -Math.sign(perp || 1) * (half - Math.abs(perp)) * 0.6;
                    if (variant === 'pluck') {
                        if (Math.abs(perp) > half * 0.8) grabbed = false;
                        if (grabbed) target = perp;
                    }
                    if (variant !== 'pluck') spring = springs[variant];
                    else if (grabbed) spring = springs.pluck;
                }
                speed = (speed + (target - bend) * spring.k) * spring.d;
                bend += speed;
                const settled = ! pointer && Math.abs(bend) < 0.05 && Math.abs(speed) < 0.05;
                if (settled) bend = speed = 0;
                path.setAttribute('d', this.curve(vertical, along, (bend / half) * 50));
                frame = settled ? 0 : requestAnimationFrame(step);
            };
            const wake = () => {
                frame ||= requestAnimationFrame(step);
            };
            const move = (event) => {
                if (still()) return;
                const rect = root.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const next = vertical ? { along: (y / rect.height) * 100, perp: x - rect.width / 2 } : { along: (x / rect.width) * 100, perp: y - rect.height / 2 };
                {{-- Pluck grabs when the pointer touches or crosses the line, even between two frames. --}}
                const crossed = pointer && Math.sign(pointer.perp) !== Math.sign(next.perp);
                if (Math.abs(next.perp) < 6 || crossed) grabbed = true;
                pointer = next;
                wake();
            };
            const leave = () => {
                pointer = null;
                grabbed = false;
                wake();
            };
            root.addEventListener('pointermove', move);
            root.addEventListener('pointerleave', leave);
            {{-- Twang once when the line first scrolls into view. --}}
            let observer = null;
            if (playOnView && ! still() && typeof IntersectionObserver === 'function') {
                observer = new IntersectionObserver(([entry]) => {
                    if (! entry?.isIntersecting) return;
                    observer.disconnect();
                    speed = reach() * 0.5;
                    wake();
                });
                observer.observe(root);
            }
            this.stop = () => {
                root.removeEventListener('pointermove', move);
                root.removeEventListener('pointerleave', leave);
                observer?.disconnect();
                cancelAnimationFrame(frame);
            };
        },
        destroy() {
            this.stop?.();
        },
    }"
    {{ $attributes->merge([...$a11y, 'style' => '--reach: '.(float) $reach.'px'])->class([$base, $orientations[$orientation] ?? $orientations['horizontal'], $colors[$color] ?? $colors['line']]) }}
>
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" class="{{ $svgClass }}">
        <path
            x-ref="path"
            d="{{ $vertical ? 'M50 0Q50 50 50 100' : 'M0 50Q50 50 100 50' }}"
            stroke-width="{{ (float) $strokeWidth }}"
            stroke-linecap="round"
            class="{{ $pathClass }}"
        />
    </svg>
</div>
