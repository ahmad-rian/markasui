@props([
    'words' => [],
    'typeSpeed' => 70,
    'deleteSpeed' => 40,
    'pause' => 1800,
    'loop' => true,
    'cursor' => true,
])

@php
    $root = 'inline';
    $caret = 'ml-0.5 inline-block h-[1.1em] w-0.5 bg-current align-[-0.2em]';

    $words = array_values($words);
@endphp

<span
    x-data="{
        words: @js($words),
        text: @js($words[0] ?? ''),
        timer: null,
        observer: null,
        animation: null,
        init() {
            if (this.words.length === 0 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const list = this.words.map((word) => Array.from(word));
            let index = 0;
            let count = list[0].length;
            let deleting = false;
            {{-- Kursor berkedip setiap 500 ms memakai Web Animations API. --}}
            this.animation = this.$refs.caret?.animate?.([{ opacity: 1 }, { opacity: 0 }], { duration: 1000, iterations: Infinity, easing: 'steps(2, jump-none)' });
            {{-- Ketik satu huruf, jeda di kata penuh, hapus, lalu pindah ke kata berikutnya. --}}
            const step = () => {
                const chars = list[index];
                let delay = deleting ? @js((int) $deleteSpeed) : @js((int) $typeSpeed);
                if (! deleting && count >= chars.length) {
                    if (! @js((bool) $loop) && index === list.length - 1) return;
                    deleting = true;
                    delay = @js((int) $pause);
                } else if (deleting && count === 0) {
                    deleting = false;
                    index = (index + 1) % list.length;
                } else {
                    count += deleting ? -1 : 1;
                    this.text = chars.slice(0, count).join('');
                }
                this.timer = setTimeout(step, delay);
            };
            const toggle = (visible) => {
                clearTimeout(this.timer);
                if (visible) step();
            };
            if (typeof IntersectionObserver === 'undefined') return toggle(true);
            this.observer = new IntersectionObserver((entries) => toggle(entries.some((entry) => entry.isIntersecting)));
            this.observer.observe(this.$el);
        },
        destroy() {
            this.observer?.disconnect();
            clearTimeout(this.timer);
            this.animation?.cancel();
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only">{{ implode(', ', $words) }}</span><span aria-hidden="true" x-text="text">{{ $words[0] ?? '' }}</span>@if ($cursor)<span x-ref="caret" aria-hidden="true" class="{{ $caret }}"></span>@endif</span>
