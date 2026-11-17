@props([
    'value' => 0,
    'from' => 0,
    'duration' => 2000,
    'decimals' => 0,
    'locale' => 'en-US',
    'prefix' => '',
    'suffix' => '',
])

@php
    $root = 'inline-grid tabular-nums';
    $layer = 'col-start-1 row-start-1';
    $holder = 'invisible col-start-1 row-start-1';

    // Teks awal sebelum Alpine berjalan. Alpine memformat ulang dengan Intl.NumberFormat sesuai locale.
    $initial = $prefix.number_format((float) $value, (int) $decimals).$suffix;
@endphp

<span
    x-data="{
        value: @js((float) $value),
        display: @js((float) $value),
        current: @js((float) $from),
        frame: 0,
        observer: null,
        {{-- Built once: text() runs on every frame and on every Livewire re-render. --}}
        formatter: new Intl.NumberFormat(@js($locale), { minimumFractionDigits: @js((int) $decimals), maximumFractionDigits: @js((int) $decimals) }),
        text(n) {
            return @js($prefix) + this.formatter.format(n) + @js($suffix);
        },
        {{-- Hitung dari angka awal ke value dengan ease-out eksponensial saat elemen pertama kali terlihat. --}}
        run() {
            const start = this.current;
            let began;
            const tick = (now) => {
                began ??= now;
                const progress = Math.min((now - began) / @js((int) $duration), 1);
                this.current = start + (this.value - start) * (progress >= 1 ? 1 : 1 - 2 ** (-10 * progress));
                this.display = this.current;
                if (progress < 1) this.frame = requestAnimationFrame(tick);
            };
            this.frame = requestAnimationFrame(tick);
        },
        init() {
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            this.display = this.current;
            if (typeof IntersectionObserver === 'undefined') return this.run();
            this.observer = new IntersectionObserver((entries) => {
                if (! entries.some((entry) => entry.isIntersecting)) return;
                this.observer.disconnect();
                this.run();
            });
            this.observer.observe(this.$el);
        },
        destroy() {
            this.observer?.disconnect();
            cancelAnimationFrame(this.frame);
        },
    }"
    {{ $attributes->class([$root]) }}
><span class="sr-only" x-text="text(value)">{{ $initial }}</span><span aria-hidden="true" class="{{ $holder }}" x-text="text(value)">{{ $initial }}</span><span aria-hidden="true" class="{{ $layer }}" x-text="text(display)">{{ $initial }}</span></span>
