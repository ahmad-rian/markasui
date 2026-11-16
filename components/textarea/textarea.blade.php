@props([
    'label' => null,
    'hint' => null,
    'error' => null,
    'value' => null,
    'rows' => 4,
])

@php
    $wrapper = 'grid gap-1.5';
    $labelClass = 'text-sm font-medium text-ink';
    $field = 'block w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none';
    $hintClass = 'text-sm text-muted';
    $errorClass = 'text-sm text-danger';

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-textarea|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-textarea-'.hash('xxh32', $idKey.$idIndex);
    $describedBy = $error ? $id.'-error' : ($hint ? $id.'-hint' : null);
@endphp

<div class="{{ $wrapper }}">
    @if ($label)
        <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
    @endif
    <textarea {{ $attributes->merge(['id' => $id, 'rows' => $rows, 'aria-invalid' => $error ? 'true' : null, 'aria-describedby' => $describedBy])->class([$field]) }}>{{ $value }}</textarea>
    @if ($error)
        <p id="{{ $id }}-error" class="{{ $errorClass }}">{{ $error }}</p>
    @elseif ($hint)
        <p id="{{ $id }}-hint" class="{{ $hintClass }}">{{ $hint }}</p>
    @endif
</div>
