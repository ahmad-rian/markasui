@props([
    'text' => '',
    'mode' => 'forward',
    'direction' => 'up',
    'stagger' => 30,
    'duration' => 400,
])

@php
    $root = 'relative inline-flex overflow-hidden';
    $letter = 'relative inline-block whitespace-pre';
    $copies = [
        'up' => 'absolute inset-x-0 top-full',
        'down' => 'absolute inset-x-0 bottom-full',
    ];

    $chars = mb_str_split((string) $text);
@endphp

<span
    x-data="{
        cleanup: () => {},
        init() {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const mode = @js($mode);
            const stagger = @js((int) $stagger);
            const duration = @js((int) $duration);
            const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
            {{-- Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. --}}
            const target = this.$el.closest('a, button, label, [tabindex]') ?? this.$el;
            const letters = [...this.$el.querySelectorAll('[data-letter]')];
            {{-- Peringkat stagger tiap huruf. Mode random memakai urutan acak tetap (hash). --}}
            const order = [...Array(letters.length).keys()];
            const hash = (i) => Math.imul(i + 1, 2654435761) >>> 0;
            if (mode === 'random') order.sort((a, b) => hash(a) - hash(b));
            const rank = [];
            order.forEach((index, position) => (rank[index] = position));
            const shift = @js($direction === 'up' ? 'translateY(-100%)' : 'translateY(100%)');
            let busyUntil = 0;
            {{-- Pingpong: transisi CSS bolak-balik. Forward/random: sekali jalan lalu kembali tanpa terlihat. --}}
            const move = (enter) => {
                const now = performance.now();
                if (mode !== 'pingpong') {
                    if (! enter || now < busyUntil) return;
                    busyUntil = now + duration + stagger * letters.length;
                }
                letters.forEach((el, i) => {
                    const delay = rank[i] * stagger;
                    if (mode !== 'pingpong') {
                        el.animate?.([{ transform: 'none' }, { transform: shift }], { duration, delay, easing });
                        return;
                    }
                    el.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
                    el.style.transform = enter ? shift : '';
                });
            };
            const enter = () => move(true);
            const leave = () => move(false);
            target.addEventListener('pointerenter', enter);
            target.addEventListener('focusin', enter);
            target.addEventListener('pointerleave', leave);
            target.addEventListener('focusout', leave);
            this.cleanup = () => {
                target.removeEventListener('pointerenter', enter);
                target.removeEventListener('focusin', enter);
                target.removeEventListener('pointerleave', leave);
                target.removeEventListener('focusout', leave);
            };
        },
        destroy() {
            this.cleanup();
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only">{{ $text }}</span>@foreach ($chars as $char)<span aria-hidden="true" data-letter class="{{ $letter }}">{{ $char }}<span class="{{ $copies[$direction] }}">{{ $char }}</span></span>@endforeach</span>
