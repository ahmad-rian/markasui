@props([
    'href' => '#',
    'stars' => 0,
    'variant' => 'secondary',
    'size' => 'md',
    'starsLabel' => '{count} stars',
])

@php
    $base = 'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $variants = [
        'primary' => 'bg-primary text-on-primary hover:bg-primary-strong',
        'secondary' => 'border border-line bg-surface text-ink hover:bg-subtle',
        'ghost' => 'text-ink hover:bg-subtle',
        'danger' => 'bg-danger text-on-primary hover:bg-danger/90',
    ];
    $sizes = [
        'sm' => 'h-8 rounded-md px-3 text-sm',
        'md' => 'h-10 rounded-lg px-4 text-sm',
        'lg' => 'h-12 rounded-lg px-6 text-base',
    ];
    $icon = 'size-4 shrink-0';
    $divider = 'h-4 w-px bg-current opacity-25';
    $count = 'inline-flex items-center gap-1 tabular-nums';
    $star = 'size-3.5 shrink-0';
    $srOnly = 'sr-only';

    // Href with a scheme other than http, https, mailto, or tel (javascript:, for example) becomes "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };
    // 980, 12.4k, 1.2M. Same rule as the React and Vue versions.
    $compact = fn (int|float $n): string => $n >= 1e6
        ? (round($n / 1e5) / 10).'M'
        : ($n >= 1e3 ? (round($n / 100) / 10).'k' : (string) round($n));

    $stars = (int) $stars;
@endphp

{{-- Counts up from zero the first time the button scrolls into view. Never fetches. --}}
<a
    x-data="{
        stop() {},
        init() {
            const number = this.$refs.number;
            if (typeof IntersectionObserver === 'undefined') return;
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            const stars = {{ $stars }};
            const compact = (n) =>
                n >= 1e6 ? `${Math.round(n / 1e5) / 10}M` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : String(Math.round(n));
            let frame = 0;
            number.textContent = '0';
            const observer = new IntersectionObserver(([entry]) => {
                if (!entry?.isIntersecting) return;
                observer.disconnect();
                const begin = performance.now();
                const step = (now) => {
                    const t = Math.min((now - begin) / 1200, 1);
                    number.textContent = compact(stars * (1 - (1 - t) ** 3));
                    if (t < 1) frame = requestAnimationFrame(step);
                };
                frame = requestAnimationFrame(step);
            });
            observer.observe(number);
            this.stop = () => {
                observer.disconnect();
                cancelAnimationFrame(frame);
            };
        },
        destroy() {
            this.stop();
        },
    }"
    {{ $attributes->merge(['href' => $safeHref((string) $href)])->class([$base, $variants[$variant], $sizes[$size]]) }}
>
    <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.94c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>
    {{ $slot }}
    <span class="{{ $divider }}" aria-hidden="true"></span>
    <span class="{{ $count }}">
        <svg class="{{ $star }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.19L12 17.2l-5.56 2.91 1.06-6.19L3 9.53l6.22-.9L12 3Z" /></svg>
        <span x-ref="number" aria-hidden="true">{{ $compact($stars) }}</span>
        <span class="{{ $srOnly }}">{{ str_replace('{count}', number_format($stars), $starsLabel) }}</span>
    </span>
</a>
