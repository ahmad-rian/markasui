@props([
    'label' => 'Card stack',
    'prevLabel' => 'Previous card',
    'nextLabel' => 'Next card',
    'cardLabel' => '{index} of {total}',
])

@php
    $root = 'w-full';
    $stack = 'relative grid touch-pan-y rounded-xl pb-4 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $card = 'group col-start-1 row-start-1 origin-bottom overflow-hidden rounded-xl border border-line bg-surface transition-[translate,scale,opacity,background-color] duration-300 ease-out data-[depth=0]:z-30 data-[depth=0]:cursor-grab data-[depth=1]:z-20 data-[depth=1]:translate-y-2 data-[depth=1]:scale-[0.95] data-[depth=1]:bg-subtle data-[depth=2]:z-10 data-[depth=2]:translate-y-4 data-[depth=2]:scale-[0.9] data-[depth=2]:bg-subtle data-[depth=3]:translate-y-4 data-[depth=3]:scale-[0.9] data-[depth=3]:opacity-0 data-dragging:cursor-grabbing data-dragging:transition-none data-leaving:z-40 motion-reduce:transition-none';
    $content = 'h-full opacity-0 transition-opacity duration-300 ease-out group-data-leaving:opacity-100 group-data-[depth=0]:opacity-100 motion-reduce:transition-none';
    $controls = 'mt-3 flex items-center justify-between gap-3';
    $navButton = 'inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[background-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';
    $dots = 'flex items-center gap-1.5';
    $dot = 'h-1.5 w-1.5 rounded-full bg-primary-line transition-all duration-300 ease-out data-[state=active]:w-5 data-[state=active]:bg-primary motion-reduce:transition-none';
    $icon = 'size-4';
    $srOnly = 'sr-only';

    // Every named slot becomes one card, in the order they are written.
    $cards = array_values(array_filter(
        $__laravel_slots ?? [],
        fn ($value, $key) => $key !== '__default',
        ARRAY_FILTER_USE_BOTH,
    ));
    $total = count($cards);
    $format = fn (string $template, int $index) => str_replace(['{index}', '{total}'], [$index, $total], $template);
    $stackId = ($attributes->get('id') ?? 'markas-card-stack-'.\Illuminate\Support\Str::random(8)).'-cards';
@endphp

{{-- Arrow keys, the buttons, or a horizontal drag throw the top card; the next one rises. The stack loops. --}}
<div
    x-data="{
        index: 0,
        total: {{ $total }},
        drag: null,
        depth(i) {
            return Math.min((i - this.index + this.total) % this.total, 3);
        },
        card(i) {
            return this.$refs.stack.children[i];
        },
        away(direction) {
            return `translateX(${direction * 120}%) rotate(${direction * 14}deg)`;
        },
        play(el, keyframes, duration) {
            if (matchMedia('(prefers-reduced-motion: reduce)').matches || ! el.animate) return null;
            el.getAnimations().forEach((animation) => animation.finish());
            return el.animate(keyframes, { duration, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
        },
        fling(el, direction) {
            const from = el.style.transform || 'none';
            el.style.transform = '';
            delete el.dataset.dragging;
            el.dataset.leaving = '';
            const animation = this.play(el, [{ transform: from, opacity: 1 }, { opacity: 1, offset: 0.5 }, { transform: this.away(direction), opacity: 0 }], 450);
            if (! animation) return delete el.dataset.leaving;
            animation.onfinish = () => {
                delete el.dataset.leaving;
                this.play(el, [{ opacity: 0, offset: 0 }], 250);
            };
        },
        settle(el) {
            const from = el.style.transform;
            el.style.transform = '';
            delete el.dataset.dragging;
            if (from) this.play(el, [{ transform: from }, { transform: 'none' }], 250);
        },
        go(step, direction = -1) {
            if (this.total < 2) return;
            const target = (this.index + step + this.total) % this.total;
            if (step === 1) this.fling(this.card(this.index), direction);
            if (step === -1) this.play(this.card(target), [{ transform: this.away(direction), opacity: 0 }, { transform: 'none', opacity: 1 }], 450);
            this.index = target;
        },
        down(event) {
            if (event.button !== 0 || this.total < 2) return;
            this.drag = { x: event.clientX, moved: false };
        },
        move(event) {
            if (! this.drag) return;
            const top = this.card(this.index);
            const dx = event.clientX - this.drag.x;
            if (! this.drag.moved) {
                if (Math.abs(dx) < 4) return;
                this.drag.moved = true;
                event.currentTarget.setPointerCapture(event.pointerId);
                top.dataset.dragging = '';
            }
            top.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`;
        },
        up(event) {
            const state = this.drag;
            this.drag = null;
            if (! state?.moved) return;
            const dx = event.clientX - state.x;
            if (Math.abs(dx) > event.currentTarget.offsetWidth * 0.25) this.go(1, Math.sign(dx));
            else this.settle(this.card(this.index));
        },
        cancel() {
            if (this.drag?.moved) this.settle(this.card(this.index));
            this.drag = null;
        },
    }"
    x-on:keydown.right="if (! $event.defaultPrevented) { $event.preventDefault(); go(1); }"
    x-on:keydown.left="if (! $event.defaultPrevented) { $event.preventDefault(); go(-1); }"
    {{ $attributes->merge(['role' => 'region', 'aria-roledescription' => 'carousel', 'aria-label' => $label])->class([$root]) }}
>
    <div
        x-ref="stack"
        id="{{ $stackId }}"
        tabindex="0"
        x-on:pointerdown="down($event)"
        x-on:pointermove="move($event)"
        x-on:pointerup="up($event)"
        x-on:pointercancel="cancel()"
        class="{{ $stack }}"
    >
        @foreach ($cards as $index => $cardSlot)
            <div
                role="group"
                aria-roledescription="slide"
                aria-label="{{ $format($cardLabel, $index + 1) }}"
                data-depth="{{ min($index, 3) }}"
                @if ($index !== 0) inert @endif
                x-bind:data-depth="depth({{ $index }})"
                x-bind:inert="depth({{ $index }}) !== 0"
                class="{{ $card }}"
            ><div class="{{ $content }}">{{ $cardSlot }}</div></div>
        @endforeach
    </div>
    <div class="{{ $controls }}">
        <button
            type="button"
            aria-label="{{ $prevLabel }}"
            aria-controls="{{ $stackId }}"
            @if ($total < 2) disabled @endif
            x-on:click="go(-1)"
            class="{{ $navButton }}"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div aria-hidden="true" class="{{ $dots }}">
            @foreach ($cards as $index => $cardSlot)
                <span
                    data-state="{{ $index === 0 ? 'active' : 'inactive' }}"
                    x-bind:data-state="index === {{ $index }} ? 'active' : 'inactive'"
                    class="{{ $dot }}"
                ></span>
            @endforeach
        </div>
        <button
            type="button"
            aria-label="{{ $nextLabel }}"
            aria-controls="{{ $stackId }}"
            @if ($total < 2) disabled @endif
            x-on:click="go(1)"
            class="{{ $navButton }}"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="m9 18 6-6-6-6" /></svg>
        </button>
    </div>
    <p aria-live="polite" class="{{ $srOnly }}" x-text="@js($cardLabel).replaceAll('{index}', index + 1).replaceAll('{total}', total)">{{ $format($cardLabel, 1) }}</p>
</div>
