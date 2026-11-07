@props([
    'text' => '',
    'trigger' => 'hover',
    'charset' => 'letters',
    'duration' => 800,
    'delay' => 0,
])

@php
    $root = 'inline-grid tabular-nums';
    $layer = 'col-start-1 row-start-1';
    $holder = 'invisible col-start-1 row-start-1';

    $charsets = [
        'letters' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        'digits' => '0123456789',
        'symbols' => '!@$%&*+=<>/?{}[]',
        'binary' => '01',
    ];
@endphp

<span
    x-data="{
        text: @js((string) $text),
        display: @js((string) $text),
        frame: 0,
        observer: null,
        cleanup: () => {},
        {{-- Acak deterministik (Park-Miller): urutan huruf acak sama di setiap putaran dan framework. --}}
        scrambler() {
            const chars = Array.from(this.text);
            const set = @js($charsets[$charset] ?? $charsets['letters']);
            let seed = 1;
            const pick = () => {
                seed = (seed * 48271) % 2147483647;
                return set[seed % set.length];
            };
            return (revealed) => chars.map((char, i) => (i < revealed || char.trim() === '' ? char : pick())).join('');
        },
        {{-- Acak semua huruf, lalu buka dari kiri ke kanan sampai teks asli kembali utuh. Huruf berganti paling cepat setiap 50 ms. --}}
        run(wait) {
            if (this.frame) return;
            const scramble = this.scrambler();
            const total = Array.from(this.text).length;
            const duration = @js((int) $duration);
            let began;
            let last = -50;
            const tick = (now) => {
                began ??= now;
                const progress = Math.min((now - began - wait) / duration, 1);
                if (now - last >= 50 || progress >= 1) {
                    last = now;
                    this.display = scramble(Math.max(Math.floor(progress * total), 0));
                }
                this.frame = progress < 1 ? requestAnimationFrame(tick) : 0;
            };
            this.frame = requestAnimationFrame(tick);
        },
        init() {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const trigger = @js($trigger);
            const delay = @js((int) $delay);
            {{-- Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. --}}
            if (trigger === 'hover') {
                const target = this.$el.closest('a, button, label, [tabindex]') ?? this.$el;
                const hover = () => this.run(0);
                target.addEventListener('pointerenter', hover);
                target.addEventListener('focusin', hover);
                this.cleanup = () => {
                    target.removeEventListener('pointerenter', hover);
                    target.removeEventListener('focusin', hover);
                };
                return;
            }
            this.display = this.scrambler()(0);
            if (trigger === 'mount' || typeof IntersectionObserver === 'undefined') return this.run(delay);
            this.observer = new IntersectionObserver((entries) => {
                if (! entries.some((entry) => entry.isIntersecting)) return;
                this.observer.disconnect();
                this.run(delay);
            });
            this.observer.observe(this.$el);
        },
        destroy() {
            this.observer?.disconnect();
            cancelAnimationFrame(this.frame);
            this.cleanup();
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only">{{ $text }}</span><span aria-hidden="true" class="{{ $holder }}">{{ $text }}</span><span aria-hidden="true" class="{{ $layer }}" x-text="display">{{ $text }}</span></span>
