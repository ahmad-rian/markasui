@props([
    'text' => '',
    'radius' => 120,
    'min' => 300,
    'max' => 800,
    'wave' => false,
])

@php
    $root = 'inline';
    $letter = 'transition-[font-variation-settings,font-weight] duration-200 ease-out motion-reduce:transition-none';

    $chars = mb_str_split((string) $text);
    // Berat awal lewat sumbu wght font variabel, dengan font-weight sebagai cadangan.
    $rest = "font-variation-settings: 'wght' ".(int) $min.'; font-weight: '.(int) $min;
@endphp

<span
    x-data="{
        cleanup: () => {},
        init() {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const radius = @js((float) $radius);
            const min = @js((int) $min);
            const span = @js((int) $max) - min;
            const wave = @js((bool) $wave);
            const letters = [...this.$el.querySelectorAll('[data-letter]')];
            const set = (values) => letters.forEach((el, i) => {
                el.style.fontVariationSettings = `'wght' ${values[i]}`;
                el.style.fontWeight = String(values[i]);
            });
            let pointer;
            let visible = false;
            let frame = 0;
            {{-- Huruf terdekat dari kursor paling tebal; di luar radius kembali ke min. Tanpa kursor, wave bernapas (2400 ms per napas, fase 0.45 rad antarhuruf). --}}
            const draw = (now) => {
                frame = 0;
                const near = pointer ? letters.map((el) => {
                    const rect = el.getBoundingClientRect();
                    const distance = Math.hypot(pointer.x - (rect.left + rect.width / 2), pointer.y - (rect.top + rect.height / 2));
                    return Math.min(distance / radius, 1);
                }) : [];
                if (near.some((t) => t < 1)) return set(near.map((t) => Math.round(min + span * (0.5 + 0.5 * Math.cos(Math.PI * t)))));
                if (! wave) return set(letters.map(() => min));
                set(letters.map((_, i) => Math.round(min + span * (0.5 - 0.5 * Math.cos((now / 2400) * 2 * Math.PI - i * 0.45)))));
                if (visible) frame = requestAnimationFrame(draw);
            };
            const schedule = () => {
                if (! frame && visible) frame = requestAnimationFrame(draw);
            };
            const move = (event) => {
                pointer = { x: event.clientX, y: event.clientY };
                schedule();
            };
            const out = () => {
                pointer = undefined;
                schedule();
            };
            const observer = typeof IntersectionObserver === 'undefined' ? undefined : new IntersectionObserver((entries) => {
                visible = entries.some((entry) => entry.isIntersecting);
                cancelAnimationFrame(frame);
                frame = 0;
                schedule();
            });
            visible = ! observer;
            observer?.observe(this.$el);
            schedule();
            addEventListener('pointermove', move);
            document.documentElement.addEventListener('pointerleave', out);
            this.cleanup = () => {
                observer?.disconnect();
                cancelAnimationFrame(frame);
                removeEventListener('pointermove', move);
                document.documentElement.removeEventListener('pointerleave', out);
            };
        },
        destroy() {
            this.cleanup();
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only">{{ $text }}</span>@foreach ($chars as $char)<span aria-hidden="true" data-letter class="{{ $letter }}" style="{{ $rest }}">{{ $char }}</span>@endforeach</span>
