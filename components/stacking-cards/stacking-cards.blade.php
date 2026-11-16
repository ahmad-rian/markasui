@props([
    'variant' => 'scale',
    'top' => 16,
    'offset' => 16,
])

@php
    $base = 'relative grid [&>*]:sticky [&>*]:top-[calc(var(--stack-top)+var(--stack-i,0)*var(--stack-step))] [&>*]:origin-top [&>*]:transition-[scale,rotate,filter] [&>*]:duration-150 [&>*]:ease-out motion-reduce:[&>*]:transition-none [&>*:has(:focus-visible)]:z-10 [&>*:has(:focus-visible)]:[scale:1] [&>*:has(:focus-visible)]:[rotate:0deg] [&>*:has(:focus-visible)]:[filter:none]';
    $variants = [
        'scale' => '[&>*]:[scale:calc(1-var(--stack-depth,0)*0.05)] [&>*]:[filter:brightness(calc(1-var(--stack-depth,0)*0.12))]',
        'fan' => '[&>*]:[rotate:calc(var(--stack-depth,0)*var(--stack-turn,1)*2.5deg)] [&>*]:[scale:calc(1-var(--stack-depth,0)*0.02)]',
        'blur' => '[&>*]:[filter:blur(calc(var(--stack-depth,0)*1.5px))_brightness(calc(1-var(--stack-depth,0)*0.08))]',
    ];
    $style = '--stack-top: '.(float) $top.'px; --stack-step: '.(float) $offset.'px';
@endphp

{{-- Every card gets its index; while on screen, --stack-depth says how much the later cards already cover it. --}}
<div
    wire:ignore
    x-data="{
        frame: 0,
        observer: null,
        stop: null,
        init() {
            const root = this.$root;
            const step = {{ (float) $offset }};
            const cards = () => [...root.children];
            cards().forEach((card, i) => {
                card.style.setProperty('--stack-i', String(i));
                card.style.setProperty('--stack-turn', i % 2 ? '1' : '-1');
            });
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver !== 'function') return;
            const clamp = (n) => Math.min(Math.max(n, 0), 1);
            const update = () => {
                this.frame = 0;
                const list = cards();
                let depth = 0;
                for (let i = list.length - 1; i >= 0; i--) {
                    const card = list[i];
                    card.style.setProperty('--stack-depth', String(Math.round(Math.min(depth, 6) * 1000) / 1000));
                    const prev = list[i - 1];
                    if (! prev) continue;
                    const gap = card.offsetTop - prev.offsetTop;
                    depth += clamp((prev.offsetHeight - gap) / Math.max(prev.offsetHeight - step, 1));
                }
            };
            const schedule = () => {
                this.frame ||= requestAnimationFrame(update);
            };
            const listen = (on) => {
                const method = on ? 'addEventListener' : 'removeEventListener';
                document[method]('scroll', schedule, { capture: true, passive: true });
                window[method]('resize', schedule);
            };
            this.observer = new IntersectionObserver(([entry]) => {
                listen(Boolean(entry?.isIntersecting));
                schedule();
            });
            this.observer.observe(root);
            this.stop = () => listen(false);
        },
        destroy() {
            this.observer?.disconnect();
            this.stop?.();
            cancelAnimationFrame(this.frame);
        },
    }"
    {{ $attributes->merge(['style' => $style])->class([$base, $variants[$variant] ?? $variants['scale']]) }}
>
    {{ $slot }}
</div>
