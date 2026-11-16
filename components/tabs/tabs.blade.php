@props([
    'items' => [],
    'defaultValue' => null,
])

@php
    $root = 'w-full';
    $list = 'inline-flex items-center gap-1 rounded-lg bg-subtle p-1';
    $tab = 'inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none';
    $panel = 'mt-4 rounded-md text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

    $keys = array_map('strval', array_keys($items));
    $active = $defaultValue ?? ($keys[0] ?? null);
    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-tabs|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-tabs-'.hash('xxh32', $idKey.$idIndex);
@endphp

<div
    x-data="{
        active: @js($active),
        keys: @js($keys),
        focusTab(key) {
            this.active = key;
            this.$nextTick(() => document.getElementById(@js($id) + '-tab-' + key).focus());
        },
        move(step) {
            const index = this.keys.indexOf(this.active);
            this.focusTab(this.keys[(index + step + this.keys.length) % this.keys.length]);
        },
    }"
    {{ $attributes->merge(['id' => $id])->class([$root]) }}
>
    <div
        role="tablist"
        aria-orientation="horizontal"
        class="{{ $list }}"
        @keydown.right.prevent="move(1)"
        @keydown.left.prevent="move(-1)"
        @keydown.home.prevent="focusTab(keys[0])"
        @keydown.end.prevent="focusTab(keys[keys.length - 1])"
    >
        @foreach ($items as $key => $label)
            @php $selected = (string) $key === $active; @endphp
            <button
                type="button"
                role="tab"
                id="{{ $id }}-tab-{{ $key }}"
                aria-controls="{{ $id }}-panel-{{ $key }}"
                aria-selected="{{ $selected ? 'true' : 'false' }}"
                tabindex="{{ $selected ? '0' : '-1' }}"
                data-state="{{ $selected ? 'active' : 'inactive' }}"
                :aria-selected="active === @js((string) $key) ? 'true' : 'false'"
                :tabindex="active === @js((string) $key) ? 0 : -1"
                :data-state="active === @js((string) $key) ? 'active' : 'inactive'"
                @click="active = @js((string) $key)"
                class="{{ $tab }}"
            >{{ $label }}</button>
        @endforeach
    </div>
    @foreach ($items as $key => $label)
        @php $selected = (string) $key === $active; @endphp
        <div
            role="tabpanel"
            id="{{ $id }}-panel-{{ $key }}"
            aria-labelledby="{{ $id }}-tab-{{ $key }}"
            tabindex="0"
            data-state="{{ $selected ? 'active' : 'inactive' }}"
            @unless ($selected) hidden @endunless
            :hidden="active !== @js((string) $key)"
            :data-state="active === @js((string) $key) ? 'active' : 'inactive'"
            class="{{ $panel }}"
        >{{ $__laravel_slots[(string) $key] ?? '' }}</div>
    @endforeach
</div>
