@props([
    'orientation' => 'horizontal',
    'position' => 50,
    'step' => 5,
    'beforeLabel' => 'Before',
    'afterLabel' => 'After',
    'sliderLabel' => 'Comparison position',
])

@php
    $root = 'group/compare relative isolate grid overflow-hidden rounded-xl select-none [&_img]:pointer-events-none';
    $layer = 'relative col-start-1 row-start-1 min-w-0 bg-surface';
    $motion = 'duration-200 ease-out group-data-dragging/compare:transition-none motion-reduce:transition-none';
    $label = 'pointer-events-none absolute rounded-full border border-line bg-surface/85 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-sm';
    $divider = 'pointer-events-none absolute z-10 bg-surface';
    $handle = 'pointer-events-auto absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full border border-line bg-surface text-ink shadow-overlay transition-[scale] duration-150 ease-out group-data-dragging/compare:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $iconClass = 'size-5';
    $orientations = [
        'horizontal' => [
            'root' => 'cursor-ew-resize touch-pan-y',
            'clip' => '[clip-path:inset(0_calc(100%_-_var(--position))_0_0)] transition-[clip-path]',
            'divider' => 'inset-y-0 left-(--position) w-0.5 -translate-x-1/2 transition-[left]',
            'before' => 'top-3 left-3',
            'after' => 'top-3 right-3',
            'icon' => '',
        ],
        'vertical' => [
            'root' => 'cursor-ns-resize touch-pan-x',
            'clip' => '[clip-path:inset(0_0_calc(100%_-_var(--position))_0)] transition-[clip-path]',
            'divider' => 'inset-x-0 top-(--position) h-0.5 -translate-y-1/2 transition-[top]',
            'before' => 'top-3 left-3',
            'after' => 'bottom-3 left-3',
            'icon' => 'rotate-90',
        ],
    ];
    $o = $orientations[$orientation] ?? $orientations['horizontal'];
    $orientation = isset($orientations[$orientation]) ? $orientation : 'horizontal';
    $position = min(100, max(0, (float) $position));
    $cx = fn (string ...$classes) => implode(' ', array_filter($classes));
@endphp

{{-- Drag anywhere, click a spot, or use the arrow keys, Page Up/Down, Home, and End on the handle. --}}
<div
    x-data="{
        position: {{ $position }},
        step: {{ (float) $step }},
        vertical: {{ $orientation === 'vertical' ? 'true' : 'false' }},
        pressed: false,
        dragging: false,
        move(next) {
            this.position = Math.min(100, Math.max(0, next));
            this.$dispatch('position-change', this.position);
        },
        fromPointer(event) {
            const rect = this.$root.getBoundingClientRect();
            this.move(this.vertical ? ((event.clientY - rect.top) / rect.height) * 100 : ((event.clientX - rect.left) / rect.width) * 100);
        },
        down(event) {
            if (event.button !== 0) return;
            event.preventDefault();
            this.pressed = true;
            this.$refs.handle.focus({ preventScroll: true });
            this.$root.setPointerCapture?.(event.pointerId);
            this.fromPointer(event);
        },
        drag(event) {
            if (! this.pressed) return;
            this.dragging = true;
            this.fromPointer(event);
        },
        release() {
            this.pressed = false;
            this.dragging = false;
        },
        key(event) {
            const flip = this.vertical ? -1 : 1;
            const at = this.position;
            const moves = { ArrowRight: at + this.step, ArrowLeft: at - this.step, ArrowUp: at + this.step * flip, ArrowDown: at - this.step * flip, PageUp: at + 10, PageDown: at - 10, Home: 0, End: 100 };
            const next = moves[event.key];
            if (next === undefined) return;
            event.preventDefault();
            this.move(next);
        },
    }"
    data-orientation="{{ $orientation }}"
    x-bind:data-dragging="dragging ? '' : null"
    x-bind:style="{ '--position': position + '%' }"
    x-on:pointerdown="down($event)"
    x-on:pointermove="drag($event)"
    x-on:pointerup="release()"
    x-on:pointercancel="release()"
    {{ $attributes->merge(['role' => 'group', 'style' => '--position: '.$position.'%'])->class([$root, $o['root']]) }}
>
    <div class="{{ $layer }}">
        {{ $__laravel_slots['after'] ?? '' }}
        <span class="{{ $cx($label, $o['after']) }}">{{ $afterLabel }}</span>
    </div>
    <div class="{{ $cx($layer, $o['clip'], $motion) }}">
        {{ $__laravel_slots['before'] ?? '' }}
        <span class="{{ $cx($label, $o['before']) }}">{{ $beforeLabel }}</span>
    </div>
    <div class="{{ $cx($divider, $o['divider'], $motion) }}">
        <div
            x-ref="handle"
            role="slider"
            tabindex="0"
            aria-label="{{ $sliderLabel }}"
            aria-orientation="{{ $orientation }}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="{{ round($position) }}"
            aria-valuetext="{{ round($position) }}%"
            x-bind:aria-valuenow="Math.round(position)"
            x-bind:aria-valuetext="Math.round(position) + '%'"
            x-on:keydown="key($event)"
            class="{{ $handle }}"
        >
            <svg class="{{ $cx($iconClass, $o['icon']) }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 7-5 5 5 5M15 7l5 5-5 5" /></svg>
        </div>
    </div>
</div>
