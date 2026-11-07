@props([
    'words' => [],
    'split' => 'chars',
    'from' => 'first',
    'interval' => 2500,
    'stagger' => 25,
    'duration' => 400,
    'pauseOnHover' => true,
])

@php
    $root = 'relative inline-flex overflow-hidden align-bottom';
    $unit = 'inline-block whitespace-pre';

    $words = array_values($words);
    $first = (string) ($words[0] ?? '');
    // Potong frasa menjadi huruf, atau kata beserta spasi sesudahnya.
    $parts = $split === 'chars' ? mb_str_split($first) : preg_split('/(?<= )/u', $first);
@endphp

<span
    x-data="{
        words: @js($words),
        index: 0,
        timer: null,
        observer: null,
        cleanup: () => {},
        units() {
            return [...this.$el.querySelectorAll('[data-unit]')];
        },
        {{-- Jeda stagger tiap bagian sesuai titik awal. Random memakai urutan acak tetap (hash). --}}
        ranks(count) {
            const from = @js($from);
            const order = [...Array(count).keys()];
            const hash = (i) => Math.imul(i + 1, 2654435761) >>> 0;
            if (from === 'random') order.sort((a, b) => hash(a) - hash(b));
            const rank = [];
            order.forEach((index, position) => {
                const middle = Math.abs(index - (count - 1) / 2);
                rank[index] = from === 'last' ? count - 1 - index : from === 'center' ? middle : position;
            });
            return rank;
        },
        {{-- Pasang kata berikutnya, masuk dari bawah per bagian, dan lebar pembungkus ikut berubah halus. --}}
        swap() {
            const width = this.$el.offsetWidth;
            const text = this.words[this.index];
            const parts = @js($split) === 'chars' ? Array.from(text) : text.split(/(?<= )/);
            this.units().forEach((el) => el.remove());
            parts.forEach((part) => {
                const el = document.createElement('span');
                el.setAttribute('aria-hidden', 'true');
                el.dataset.unit = '';
                el.className = @js($unit);
                el.textContent = part;
                this.$el.append(el);
            });
            const list = this.units();
            const rank = this.ranks(list.length);
            list.forEach((el, i) => el.animate?.([{ transform: 'translateY(100%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: @js((int) $duration), delay: rank[i] * @js((int) $stagger), easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }));
            this.$el.animate?.([{ width: `${width}px` }, { width: `${this.$el.offsetWidth}px` }], { duration: @js((int) $duration), easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        },
        {{-- Kata lama keluar ke atas, lalu kata berikutnya dipasang. Berhenti saat di-hover, di luar layar, atau tab tersembunyi. --}}
        init() {
            if (this.words.length < 2 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            let hovered = false;
            let busy = false;
            const tick = () => {
                if (busy || (hovered && @js((bool) $pauseOnHover)) || document.hidden) return;
                busy = true;
                const list = this.units();
                const rank = this.ranks(list.length);
                const exits = list.map((el, i) => el.animate?.([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-100%)', opacity: 0 }], { duration: @js((int) $duration), delay: rank[i] * @js((int) $stagger), easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'forwards' }));
                Promise.all(exits.map((animation) => animation?.finished))
                    .then(() => {
                        this.index = (this.index + 1) % this.words.length;
                        this.swap();
                    })
                    .catch(() => {})
                    .finally(() => (busy = false));
            };
            const enter = () => (hovered = true);
            const leave = () => (hovered = false);
            this.$el.addEventListener('pointerenter', enter);
            this.$el.addEventListener('pointerleave', leave);
            this.cleanup = () => {
                this.$el.removeEventListener('pointerenter', enter);
                this.$el.removeEventListener('pointerleave', leave);
            };
            if (typeof IntersectionObserver === 'undefined') return (this.timer = setInterval(tick, @js((int) $interval)));
            this.observer = new IntersectionObserver((entries) => {
                clearInterval(this.timer);
                if (entries.some((entry) => entry.isIntersecting)) this.timer = setInterval(tick, @js((int) $interval));
            });
            this.observer.observe(this.$el);
        },
        destroy() {
            this.observer?.disconnect();
            clearInterval(this.timer);
            this.cleanup();
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only">{{ implode(', ', $words) }}</span>@foreach ($parts as $part)<span aria-hidden="true" data-unit class="{{ $unit }}">{{ $part }}</span>@endforeach</span>
