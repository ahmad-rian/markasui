@props([
    'as' => 'span',
    'trigger' => 'view',
    'direction' => 'ltr',
    'variant' => 'solid',
    'color' => 'warning',
    'active' => false,
    'once' => true,
    'threshold' => 0.5,
    'duration' => 700,
    'delay' => 0,
])

@php
    $base = 'bg-transparent text-ink bg-no-repeat box-decoration-clone [--markas-th-fill:color-mix(in_oklab,var(--markas-th-c)_var(--markas-th-a,28%),transparent)] -mx-[0.12em] px-[0.12em] bg-left [background-size:var(--markas-th-size,0%_100%)] data-[direction=rtl]:bg-right data-[direction=ttb]:bg-top data-[direction=btt]:bg-bottom data-[direction$=b]:[--markas-th-size:100%_0%] data-[state=active]:[background-size:100%_100%] transition-[background-size] ease-out motion-reduce:transition-none motion-reduce:data-[trigger=view]:[background-size:100%_100%] motion-reduce:data-[trigger=auto]:[background-size:100%_100%]';
    $variants = [
        'solid' => 'rounded-[0.2em] [background-image:linear-gradient(var(--markas-th-fill)_0_0)]',
        'marker' => 'rounded-[0.1em_0.5em_0.2em_0.6em] [background-image:linear-gradient(transparent_40%,var(--markas-th-fill)_40%_94%,transparent_94%)]',
        'underline' => '[background-image:linear-gradient(transparent_84%,var(--markas-th-c)_84%)]',
        'gradient' => 'rounded-[0.2em] [background-image:linear-gradient(100deg,var(--markas-th-fill),color-mix(in_oklab,var(--markas-th-c2,var(--color-warning))_var(--markas-th-a,28%),transparent))]',
    ];
    $colors = [
        'warning' => '[--markas-th-c:var(--color-warning)] [--markas-th-c2:var(--color-danger)]',
        'primary' => '[--markas-th-a:16%] [--markas-th-c:var(--color-primary)]',
        'primary-soft' => '[--markas-th-a:100%] [--markas-th-c:var(--color-primary-soft)]',
        'success' => '[--markas-th-c:var(--color-success)]',
        'danger' => '[--markas-th-c:var(--color-danger)]',
    ];

    // Hanya nama elemen yang valid yang dipakai sebagai tag.
    $tag = preg_match('/^[a-z][a-z0-9]*$/', (string) $as) === 1 ? $as : 'span';
@endphp

<{{ $tag }}
    x-data="{
        active: @js((bool) $active),
        dir: @js($direction),
        trigger: @js($trigger),
        cleanup: () => {},
        {{-- Sorot teks, opsional dengan arah lain. Bisa dipanggil lewat Alpine.$data(el) atau event markas-highlight. --}}
        animate(direction) {
            if (direction) this.dir = direction;
            this.active = true;
        },
        reset() {
            this.active = false;
        },
        init() {
            const trigger = this.trigger;
            const el = this.$el;
            if (trigger === 'manual') return;
            {{-- Hitung gaya awal dulu supaya transisi berjalan dari keadaan kosong. --}}
            if (trigger === 'auto') {
                void el.offsetWidth;
                return (this.active = true);
            }
            if (trigger === 'hover') {
                {{-- Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. --}}
                const target = el.closest('a, button, label, [tabindex]') ?? el;
                const show = () => (this.active = true);
                const hide = () => (this.active = false);
                const events = [['pointerenter', show], ['focusin', show], ['pointerleave', hide], ['focusout', hide]];
                events.forEach(([name, fn]) => target.addEventListener(name, fn));
                this.cleanup = () => events.forEach(([name, fn]) => target.removeEventListener(name, fn));
                return;
            }
            const once = @js((bool) $once);
            const observer = new IntersectionObserver((entries) => {
                const visible = entries.some((entry) => entry.isIntersecting);
                if (visible && once) observer.disconnect();
                if (visible || ! once) this.active = visible;
            }, { threshold: @js((float) $threshold) });
            observer.observe(el);
            this.cleanup = () => observer.disconnect();
        },
        destroy() {
            this.cleanup();
        },
    }"
    x-on:markas-highlight.window="trigger === 'manual' && animate($event.detail?.direction)"
    x-on:markas-highlight-reset.window="trigger === 'manual' && reset()"
    x-bind:data-state="active ? 'active' : 'inactive'"
    x-bind:data-direction="dir"
    {{ $attributes->merge(['data-state' => $active ? 'active' : 'inactive', 'data-direction' => $direction, 'data-trigger' => $trigger, 'style' => 'transition-duration: '.(int) $duration.'ms; transition-delay: '.(int) $delay.'ms'])->class([$base, $variants[$variant] ?? $variants['solid'], $colors[$color] ?? $colors['warning']]) }}
>{{ $slot }}</{{ $tag }}>@php /* Tanpa baris baru setelah tag penutup, supaya tanda baca sesudah komponen tidak terpisah spasi. */ @endphp
