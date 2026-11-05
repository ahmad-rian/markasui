@props([
    'items' => [],
    'magnification' => 1.6,
    'dockLabel' => 'Dock',
])

@php
    $root = 'relative inline-flex h-[60px] items-end gap-2 rounded-2xl border border-line bg-surface/80 px-2.5 pb-2.5 shadow-overlay backdrop-blur-md';
    $itemWrap = 'relative h-10 w-[calc(2.5rem*var(--dock-scale,1))] shrink-0 transition-[width] duration-150 ease-out motion-reduce:transition-none';
    $itemClass = 'group/dock absolute bottom-0 left-0 grid aspect-square w-full place-items-center rounded-xl border border-line bg-linear-to-b from-surface to-subtle text-ink transition-colors duration-150 ease-out hover:to-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $iconClass = 'size-[55%]';
    $tooltip = 'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-primary px-2 py-1 text-xs font-medium whitespace-nowrap text-on-primary opacity-0 shadow-overlay transition-[opacity,translate] duration-150 ease-out group-hover/dock:translate-y-0 group-hover/dock:opacity-100 group-focus-visible/dock:translate-y-0 group-focus-visible/dock:opacity-100 motion-reduce:transition-none';
    $dot = 'absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink';
    $separator = 'mx-0.5 mb-1 h-8 w-px shrink-0 bg-line';

    // Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#".
    $safeHref = fn (string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', $href)) === 1 ? '#' : $href;
    $position = -1;
@endphp

{{-- Items grow with their distance to the pointer or the focused item. Pressing one dispatches a select event with its value. --}}
<div
    x-data="{
        focusIndex: 0,
        magnification: {{ (float) $magnification }},
        {{-- Pointer distance in px over which neighbours still grow, and the launch bounce. --}}
        range: 140,
        still() {
            return matchMedia('(prefers-reduced-motion: reduce)').matches;
        },
        controls() {
            return Array.from(this.$root.querySelectorAll('[data-dock-item] > :first-child'));
        },
        center(element) {
            const rect = element.getBoundingClientRect();
            return rect.left + rect.width / 2;
        },
        {{-- Grow every item by its distance to x with a cosine falloff. x null resets the dock. --}}
        magnify(x) {
            const off = x === null || this.still();
            for (const item of this.$root.querySelectorAll('[data-dock-item]')) {
                const rect = item.getBoundingClientRect();
                const distance = off ? this.range : Math.abs(x - rect.left - rect.width / 2);
                const scale = distance >= this.range ? 1 : 1 + ((this.magnification - 1) * (1 + Math.cos((Math.PI * distance) / this.range))) / 2;
                item.style.setProperty('--dock-scale', String(scale));
            }
        },
        move(event) {
            const all = this.controls();
            const index = all.indexOf(event.target);
            const targets = { ArrowRight: (index + 1) % all.length, ArrowLeft: (index - 1 + all.length) % all.length, Home: 0, End: all.length - 1 };
            const target = targets[event.key];
            if (index < 0 || target === undefined) return;
            event.preventDefault();
            all[target].focus();
        },
        focused(event) {
            const index = this.controls().indexOf(event.target);
            if (index < 0) return;
            this.focusIndex = index;
            this.magnify(this.center(event.target));
        },
        blurred(event) {
            if (!this.$root.contains(event.relatedTarget)) this.magnify(null);
        },
        left() {
            const focused = this.$root.contains(document.activeElement);
            this.magnify(focused ? this.center(document.activeElement) : null);
        },
        launch(event, value) {
            if (!this.still()) event.currentTarget.animate([{ transform: 'none' }, { transform: 'translateY(-12px)' }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(0.3, 0, 0.3, 1)' });
            this.$dispatch('select', value);
        },
    }"
    role="toolbar"
    aria-label="{{ $dockLabel }}"
    aria-orientation="horizontal"
    x-on:keydown="move($event)"
    x-on:focusin="focused($event)"
    x-on:focusout="blurred($event)"
    x-on:pointermove="magnify($event.clientX)"
    x-on:pointerleave="left()"
    {{ $attributes->class([$root]) }}
>
    @foreach ($items as $item)
        @if ($item['separator'] ?? false)
            <div role="separator" aria-orientation="vertical" class="{{ $separator }}"></div>
        @else
            @php
                $position++;
                $tag = isset($item['href']) ? 'a' : 'button';
                $value = (string) ($item['value'] ?? $item['label']);
            @endphp
            <div data-dock-item class="{{ $itemWrap }}">
                <{{ $tag }}
                    @if ($tag === 'a') href="{{ $safeHref($item['href']) }}" @else type="button" @endif
                    tabindex="{{ $position === 0 ? '0' : '-1' }}"
                    x-bind:tabindex="focusIndex === {{ $position }} ? 0 : -1"
                    @if ($item['active'] ?? false) aria-current="true" @endif
                    x-on:click="launch($event, @js($value))"
                    class="{{ $itemClass }}"
                >
                    <svg class="{{ $iconClass }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $item['icon'] }}" /></svg>
                    <span class="{{ $tooltip }}">{{ $item['label'] }}</span>
                </{{ $tag }}>
                @if ($item['active'] ?? false)
                    <span aria-hidden="true" class="{{ $dot }}"></span>
                @endif
            </div>
        @endif
    @endforeach
</div>
