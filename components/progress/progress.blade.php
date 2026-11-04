@props([
    'value' => null,
    'max' => 100,
    'label' => null,
])

@php
    $wrapper = 'grid gap-1.5';
    $header = 'flex items-center justify-between gap-4 text-sm';
    $labelClass = 'font-medium text-ink';
    $valueClass = 'text-muted tabular-nums';
    $bar = 'block h-2 w-full appearance-none overflow-hidden rounded-full border-0 bg-subtle [&::-webkit-progress-bar]:bg-subtle [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-200 [&::-webkit-progress-value]:ease-out [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-primary indeterminate:animate-pulse indeterminate:bg-primary/30 indeterminate:[&::-webkit-progress-bar]:bg-primary/30 motion-reduce:animate-none motion-reduce:[&::-webkit-progress-value]:transition-none';

    $id = $attributes->get('id') ?? 'markas-progress-'.\Illuminate\Support\Str::random(8);
    $percent = $value === null ? null : (int) min(100, max(0, round($value / $max * 100)));
@endphp

<div class="{{ $wrapper }}">
    @if ($label)
        <div class="{{ $header }}">
            <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
            @if ($percent !== null)
                <span class="{{ $valueClass }}">{{ $percent }}%</span>
            @endif
        </div>
    @endif
    <progress {{ $attributes->merge(['id' => $id, 'value' => $value, 'max' => $max])->class([$bar]) }}></progress>
</div>
