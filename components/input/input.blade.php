@props([
    'label' => null,
    'hint' => null,
    'error' => null,
])

@php
    $wrapper = 'grid gap-1.5';
    $labelClass = 'text-sm font-medium text-ink';
    $field = 'h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none';
    $hintClass = 'text-sm text-muted';
    $errorClass = 'text-sm text-danger';

    $id = $attributes->get('id') ?? 'markas-input-'.\Illuminate\Support\Str::random(8);
    $describedBy = $error ? $id.'-error' : ($hint ? $id.'-hint' : null);
@endphp

<div class="{{ $wrapper }}">
    @if ($label)
        <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
    @endif
    <input {{ $attributes->merge(['id' => $id, 'type' => 'text', 'aria-invalid' => $error ? 'true' : null, 'aria-describedby' => $describedBy])->class([$field]) }} />
    @if ($error)
        <p id="{{ $id }}-error" class="{{ $errorClass }}">{{ $error }}</p>
    @elseif ($hint)
        <p id="{{ $id }}-hint" class="{{ $hintClass }}">{{ $hint }}</p>
    @endif
</div>
