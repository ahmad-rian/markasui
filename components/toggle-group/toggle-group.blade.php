@props([
    'items' => [],
    'type' => 'single',
    'value' => null,
    'label' => null,
])

@php
    $root = 'inline-flex items-center gap-1 rounded-lg bg-subtle p-1';
    $item = 'inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=on]:bg-surface data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0';

    $values = array_map(fn ($entry) => (string) $entry['value'], $items);
    $selected = array_values(array_intersect($values, array_map('strval', (array) ($value ?? []))));
    if ($type !== 'multiple') {
        $selected = array_slice($selected, 0, 1);
    }
    $tabStop = $selected[0] ?? ($values[0] ?? null);
@endphp

<div
    role="group"
    x-data="{
        selected: @js($selected),
        focused: @js($tabStop),
        multiple: @js($type === 'multiple'),
        values: @js($values),
        toggle(key) {
            this.focused = key;
            if (this.selected.includes(key)) {
                this.selected = this.selected.filter((entry) => entry !== key);
            } else {
                const next = this.multiple ? [...this.selected, key] : [key];
                this.selected = this.values.filter((entry) => next.includes(entry));
            }
        },
        move(step) {
            const buttons = Array.from($root.querySelectorAll(':scope > button'));
            const index = buttons.indexOf(document.activeElement);
            const target = buttons[(index + step + buttons.length) % buttons.length];
            if (!target) return;
            this.focused = target.dataset.value;
            target.focus();
        },
    }"
    x-on:keydown.right.prevent="move(1)"
    x-on:keydown.left.prevent="move(-1)"
    @if ($label) aria-label="{{ $label }}" @endif
    {{ $attributes->class([$root]) }}
>
    @foreach ($items as $entry)
        @php
            $key = (string) $entry['value'];
            $on = in_array($key, $selected, true);
        @endphp
        <button
            type="button"
            data-value="{{ $key }}"
            aria-pressed="{{ $on ? 'true' : 'false' }}"
            data-state="{{ $on ? 'on' : 'off' }}"
            tabindex="{{ $key === $tabStop ? '0' : '-1' }}"
            @isset($entry['ariaLabel']) aria-label="{{ $entry['ariaLabel'] }}" @endisset
            x-bind:aria-pressed="selected.includes(@js($key)) ? 'true' : 'false'"
            x-bind:data-state="selected.includes(@js($key)) ? 'on' : 'off'"
            x-bind:tabindex="focused === @js($key) ? 0 : -1"
            x-on:click="toggle(@js($key))"
            class="{{ $item }}"
        >{{ $__laravel_slots[$key] ?? $entry['label'] ?? '' }}</button>
    @endforeach
</div>
