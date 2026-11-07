@props([
    'text' => '',
    'split' => 'words',
    'direction' => 'up',
    'from' => 'first',
    'stagger' => 60,
    'duration' => 700,
    'delay' => 0,
])

@php
    $root = 'block';
    $line = 'block';
    $lineCut = 'block overflow-hidden pb-[0.12em] -mb-[0.12em]';
    $cut = 'inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]';
    $unit = 'inline-block whitespace-pre';
    $lineUnit = 'block';

    $offsets = ['up' => 'translateY(120%)', 'down' => 'translateY(-120%)'];

    // Baris baru (\n) memecah teks menjadi beberapa baris.
    $lines = explode("\n", (string) $text);
@endphp

<span
    x-data="{
        observer: null,
        units: [],
        {{-- Sembunyikan setiap bagian di balik garis potong, lalu munculkan bergiliran saat teks masuk layar. --}}
        init() {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const from = @js($from);
            const offset = @js($offsets[$direction]);
            this.units = [...this.$el.querySelectorAll('[data-unit]')];
            const count = this.units.length;
            {{-- Jeda stagger tiap bagian sesuai titik awal. Random memakai urutan acak tetap (hash). --}}
            const order = [...Array(count).keys()];
            const hash = (i) => Math.imul(i + 1, 2654435761) >>> 0;
            if (from === 'random') order.sort((a, b) => hash(a) - hash(b));
            const rank = [];
            order.forEach((index, position) => {
                const middle = Math.abs(index - (count - 1) / 2);
                rank[index] = from === 'last' ? count - 1 - index : from === 'center' ? middle : position;
            });
            this.units.forEach((el) => (el.style.transform = offset));
            const reveal = () => this.units.forEach((el, i) => {
                el.animate?.([{ transform: offset }, { transform: 'none' }], { duration: @js((int) $duration), delay: @js((int) $delay) + rank[i] * @js((int) $stagger), easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
                el.style.transform = '';
            });
            if (typeof IntersectionObserver === 'undefined') return reveal();
            this.observer = new IntersectionObserver((entries) => {
                if (! entries.some((entry) => entry.isIntersecting)) return;
                this.observer.disconnect();
                reveal();
            });
            this.observer.observe(this.$el);
        },
        destroy() {
            this.observer?.disconnect();
            this.units.forEach((el) => (el.style.transform = ''));
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only">{{ implode(' ', $lines) }}</span><span aria-hidden="true">@foreach ($lines as $lineText)@if ($split === 'lines')<span class="{{ $lineCut }}"><span data-unit class="{{ $lineUnit }}">{{ $lineText }}</span></span>@else<span class="{{ $line }}">@foreach (explode(' ', $lineText) as $w => $word){{ $w > 0 ? ' ' : '' }}<span class="{{ $cut }}">@if ($split === 'words')<span data-unit class="{{ $unit }}">{{ $word }}</span>@else @foreach (mb_str_split($word) as $char)<span data-unit class="{{ $unit }}">{{ $char }}</span>@endforeach @endif</span>@endforeach</span>@endif @endforeach</span></span>
