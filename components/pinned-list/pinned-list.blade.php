@props([
    'items' => [],
    'defaultPinned' => [],
    'pinLabel' => 'Pin {label}',
    'unpinLabel' => 'Unpin {label}',
    'pinnedLabel' => 'Pinned',
    'allLabel' => 'All',
    'pinnedMessage' => '{label} pinned',
    'unpinnedMessage' => '{label} unpinned',
])

@php
    $root = 'grid gap-5';
    $group = 'grid gap-2';
    $heading = 'flex items-center gap-2 px-1 text-xs font-medium text-muted transition-opacity duration-300 ease-out starting:opacity-0 motion-reduce:transition-none';
    $count = 'rounded-full bg-subtle px-1.5 text-[11px] leading-4 text-muted tabular-nums';
    $list = 'grid gap-1.5';
    $itemClass = 'relative flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 transition-colors duration-300 ease-out data-[pinned=true]:border-primary-line data-[pinned=true]:bg-primary-soft motion-reduce:transition-none';
    $iconTile = 'grid size-9 shrink-0 place-items-center rounded-lg bg-subtle text-ink transition-colors duration-300 ease-out in-data-[pinned=true]:bg-surface motion-reduce:transition-none';
    $iconClass = 'size-5';
    $body = 'grid min-w-0 flex-1';
    $labelClass = 'truncate text-sm font-medium text-ink';
    $descriptionClass = 'truncate text-xs text-muted';
    $metaClass = 'shrink-0 text-xs text-muted tabular-nums';
    $pinButton = 'group/pin grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:text-ink motion-reduce:transition-none';
    $pinIcon = 'size-4 rotate-45 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-aria-pressed/pin:rotate-0 group-aria-pressed/pin:fill-current motion-reduce:transition-none';
    $srOnly = 'sr-only';

    $pinPath = 'M12 17v5M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2v.8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9a2 2 0 0 1-1.1-1.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z';
    $items = array_map(fn ($item) => [
        'value' => (string) $item['value'],
        'label' => $item['label'],
        'description' => $item['description'] ?? null,
        'meta' => $item['meta'] ?? null,
        'icon' => $item['icon'] ?? null,
    ], array_values($items));
    $defaultPinned = array_map('strval', array_values($defaultPinned));
    $svg = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
@endphp

{{-- Pinning moves a row into the Pinned group with a FLIP animation and dispatches a change event with the pinned values. --}}
<div
    x-data="{
        items: @js($items),
        pinned: @js($defaultPinned),
        message: '',
        labels: @js(['pin' => $pinLabel, 'unpin' => $unpinLabel, 'pinned' => $pinnedMessage, 'unpinned' => $unpinnedMessage]),
        {{-- Length and curve of the move between groups. --}}
        duration: 350,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        get groups() {
            return [
                { label: @js($pinnedLabel), items: this.items.filter((item) => this.pinned.includes(item.value)) },
                { label: @js($allLabel), items: this.items.filter((item) => !this.pinned.includes(item.value)) },
            ];
        },
        label(key, item) {
            return this.labels[key].replace('{label}', item.label);
        },
        rows(host) {
            return Array.from(host.querySelectorAll('[data-value]'));
        },
        toggle(item) {
            const host = this.$el.closest('[data-pinned-list]');
            const on = !this.pinned.includes(item.value);
            const before = new Map(this.rows(host).map((row) => [row.dataset.value, row.getBoundingClientRect()]));
            this.pinned = on ? [...this.pinned, item.value] : this.pinned.filter((value) => value !== item.value);
            this.message = this.label(on ? 'pinned' : 'unpinned', item);
            this.$dispatch('change', this.pinned);
            this.$nextTick(() => this.flip(host, before, item.value));
        },
        {{-- FLIP: start each row where it was and let it glide to its new place, then refocus the moved pin button. --}}
        flip(host, before, moved) {
            const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
            for (const row of this.rows(host)) {
                if (row.dataset.value === moved) row.querySelector('button')?.focus();
                const old = before.get(row.dataset.value);
                const now = row.getBoundingClientRect();
                if (still || !old) continue;
                const [x, y] = [old.left - now.left, old.top - now.top];
                if (!x && !y) continue;
                const zIndex = row.dataset.value === moved ? 1 : 0;
                row.animate([{ transform: `translate(${x}px, ${y}px)`, zIndex }, { transform: 'none', zIndex }], { duration: this.duration, easing: this.easing });
            }
        },
    }"
    data-pinned-list
    {{ $attributes->class([$root]) }}
>
    <template x-for="(part, index) in groups" :key="index">
        <div x-bind:hidden="!part.items.length" class="{{ $group }}">
            <p class="{{ $heading }}"><span x-text="part.label"></span><span class="{{ $count }}" x-text="part.items.length"></span></p>
            <ul x-bind:aria-label="part.label" class="{{ $list }}">
                <template x-for="item in part.items" :key="item.value">
                    <li x-bind:data-value="item.value" x-bind:data-pinned="pinned.includes(item.value)" class="{{ $itemClass }}">
                        <template x-if="item.icon">
                            <span aria-hidden="true" class="{{ $iconTile }}"><svg class="{{ $iconClass }}" {!! $svg !!}><path x-bind:d="item.icon" /></svg></span>
                        </template>
                        <span class="{{ $body }}">
                            <span class="{{ $labelClass }}" x-text="item.label"></span>
                            <template x-if="item.description">
                                <span class="{{ $descriptionClass }}" x-text="item.description"></span>
                            </template>
                        </span>
                        <template x-if="item.meta">
                            <span class="{{ $metaClass }}" x-text="item.meta"></span>
                        </template>
                        <button
                            type="button"
                            x-bind:aria-pressed="pinned.includes(item.value) ? 'true' : 'false'"
                            x-bind:aria-label="label('pin', item)"
                            x-bind:title="label(pinned.includes(item.value) ? 'unpin' : 'pin', item)"
                            x-on:click="toggle(item)"
                            class="{{ $pinButton }}"
                        >
                            <svg class="{{ $pinIcon }}" {!! $svg !!} aria-hidden="true"><path d="{{ $pinPath }}" /></svg>
                        </button>
                    </li>
                </template>
            </ul>
        </div>
    </template>
    <p role="status" class="{{ $srOnly }}" x-text="message"></p>
</div>
