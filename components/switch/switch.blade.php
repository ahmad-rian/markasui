@props([
    'label' => null,
])

@php
    $root = 'flex items-center gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50';
    $control = 'relative inline-flex shrink-0';
    $track = 'peer h-6 w-10 shrink-0 cursor-pointer appearance-none rounded-full bg-faint transition-colors duration-150 ease-out checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none';
    $thumb = 'pointer-events-none absolute top-0.5 left-0.5 size-5 rounded-full bg-surface transition-transform duration-150 ease-out peer-checked:translate-x-4 motion-reduce:transition-none';
    $labelClass = 'text-sm font-medium text-ink';

    $id = $attributes->get('id') ?? 'markas-switch-'.\Illuminate\Support\Str::random(8);
@endphp

<div class="{{ $root }}">
    <span class="{{ $control }}">
        <input type="checkbox" role="switch" {{ $attributes->merge(['id' => $id])->class([$track]) }} />
        <span class="{{ $thumb }}" aria-hidden="true"></span>
    </span>
    @if ($label)
        <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
    @endif
</div>
