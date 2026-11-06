@props([
    'maxAngle' => 10,
    'glare' => true,
])

@php
    $base = 'group/tilt relative isolate rounded-xl transition-[transform,translate,scale,box-shadow] duration-500 ease-out [transform:perspective(800px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] has-[:focus-visible]:-translate-y-1 has-[:focus-visible]:shadow-overlay data-[state=active]:scale-[1.02] data-[state=active]:duration-150 motion-reduce:transition-none motion-reduce:[transform:none] [&_[data-depth]]:transition-[translate] [&_[data-depth]]:duration-500 [&_[data-depth]]:ease-out data-[state=active]:[&_[data-depth]]:duration-150 motion-reduce:[&_[data-depth]]:transition-none';
    $glareClass = 'pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[radial-gradient(circle_at_var(--glare-x,50%)_var(--glare-y,50%),color-mix(in_oklab,var(--glare)_45%,transparent),transparent_65%)] opacity-0 transition-opacity duration-300 ease-out [--glare:var(--color-surface)] group-data-[state=active]/tilt:opacity-100 motion-reduce:hidden dark:[--glare:var(--color-ink)]';
@endphp

{{-- Rotates toward the pointer, moves the glare, and shifts [data-depth] layers by their value in px. --}}
<div
    x-data="{
        max: {{ (float) $maxAngle }},
        stop: null,
        layers() {
            return this.$root.querySelectorAll('[data-depth]');
        },
        tilt(card, rect, x, y) {
            const px = (x - rect.left) / rect.width - 0.5;
            const py = (y - rect.top) / rect.height - 0.5;
            card.dataset.state = 'active';
            card.style.setProperty('--tilt-x', `${-py * 2 * this.max}deg`);
            card.style.setProperty('--tilt-y', `${px * 2 * this.max}deg`);
            card.style.setProperty('--glare-x', `${(px + 0.5) * 100}%`);
            card.style.setProperty('--glare-y', `${(py + 0.5) * 100}%`);
            for (const layer of this.layers()) {
                const depth = Number(layer.dataset.depth) || 0;
                layer.style.translate = `${px * 2 * depth}px ${py * 2 * depth}px`;
            }
        },
        {{-- Follow the pointer against the flat box measured on enter; the tilted card's own edges move away and would flicker. --}}
        enter(event) {
            if (this.stop || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const card = this.$root;
            const rect = card.getBoundingClientRect();
            const move = ({ clientX: x, clientY: y }) => {
                if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return this.stop?.();
                this.tilt(card, rect, x, y);
            };
            this.stop = () => {
                this.stop = null;
                document.removeEventListener('pointermove', move);
                delete card.dataset.state;
                for (const prop of ['--tilt-x', '--tilt-y', '--glare-x', '--glare-y']) card.style.removeProperty(prop);
                for (const layer of this.layers()) layer.style.translate = '';
            };
            document.addEventListener('pointermove', move);
            move(event);
        },
        destroy() {
            this.stop?.();
        },
    }"
    x-on:pointerenter="enter($event)"
    {{ $attributes->class([$base]) }}
>
    {{ $slot }}
    @if ($glare)
        <span aria-hidden="true" class="{{ $glareClass }}"></span>
    @endif
</div>
