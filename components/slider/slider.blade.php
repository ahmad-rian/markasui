@props([
    'label' => null,
    'min' => 0,
    'max' => 100,
    'step' => 1,
    'value' => null,
    'showValue' => true,
])

@php
    $root = 'group grid gap-3 has-disabled:cursor-not-allowed';
    $header = 'flex items-center justify-between gap-4 text-sm';
    $labelClass = 'font-medium text-ink group-has-disabled:opacity-50';
    $valueClass = 'ml-auto text-muted tabular-nums group-has-disabled:text-faint';
    $range = 'h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface';

    $current = $value ?? $min;
    $percent = $max > $min ? (($current - $min) / ($max - $min)) * 100 : 0;
    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-slider|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-slider-'.hash('xxh32', $idKey.$idIndex);
@endphp

{{-- wire:model and x-model bind to `value` on the root (x-modelable); other attributes land on the range input. --}}
<div
    x-data="{
        value: @js($current),
        min: @js($min),
        max: @js($max),
        get percent() {
            return this.max > this.min ? ((this.value - this.min) / (this.max - this.min)) * 100 : 0;
        },
    }"
    x-modelable="value"
    {{ $attributes->whereStartsWith(['wire:model', 'x-model']) }}
    class="{{ $root }}"
>
    @if ($label || $showValue)
        <div class="{{ $header }}">
            @if ($label)
                <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
            @endif
            @if ($showValue)
                <span class="{{ $valueClass }}" aria-hidden="true" x-text="value">{{ $current }}</span>
            @endif
        </div>
    @endif
    <input
        type="range"
        min="{{ $min }}"
        max="{{ $max }}"
        step="{{ $step }}"
        value="{{ $current }}"
        style="--value: {{ $percent }}%"
        x-bind:value="value"
        x-bind:style="'--value: ' + percent + '%'"
        x-on:input="value = $event.target.valueAsNumber"
        {{ $attributes->whereDoesntStartWith(['wire:model', 'x-model'])->merge(['id' => $id])->class([$range]) }}
    />
</div>
