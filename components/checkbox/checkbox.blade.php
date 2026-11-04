@props([
    'label' => null,
    'description' => null,
])

@php
    $root = 'flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50';
    $control = 'relative mt-0.5 flex size-4 shrink-0';
    $box = 'peer size-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed aria-invalid:border-danger motion-reduce:transition-none';
    $icon = 'pointer-events-none absolute inset-0 size-4 text-on-primary opacity-0 peer-checked:opacity-100';
    $text = 'grid gap-0.5';
    $labelClass = 'text-sm font-medium text-ink';
    $descriptionClass = 'text-sm text-muted';

    $id = $attributes->get('id') ?? 'markas-checkbox-'.\Illuminate\Support\Str::random(8);
    $describedBy = $description ? $id.'-description' : null;
@endphp

<div class="{{ $root }}">
    <span class="{{ $control }}">
        <input type="checkbox" {{ $attributes->merge(['id' => $id, 'aria-describedby' => $describedBy])->class([$box]) }} />
        <svg class="{{ $icon }}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 8.5 2.5 2.5L12 5.5" /></svg>
    </span>
    @if ($label || $description)
        <div class="{{ $text }}">
            @if ($label)
                <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
            @endif
            @if ($description)
                <p id="{{ $id }}-description" class="{{ $descriptionClass }}">{{ $description }}</p>
            @endif
        </div>
    @endif
</div>
