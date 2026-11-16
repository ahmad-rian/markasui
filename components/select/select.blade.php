@props([
    'label' => null,
    'hint' => null,
    'error' => null,
])

@php
    $wrapper = 'grid gap-1.5';
    $labelClass = 'text-sm font-medium text-ink';
    $control = 'relative';
    $field = 'h-10 w-full cursor-pointer appearance-none rounded-md border border-line bg-surface pr-9 pl-3 text-sm text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none';
    $icon = 'pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted';
    $hintClass = 'text-sm text-muted';
    $errorClass = 'text-sm text-danger';

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-select|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-select-'.hash('xxh32', $idKey.$idIndex);
    $describedBy = $error ? $id.'-error' : ($hint ? $id.'-hint' : null);
@endphp

<div class="{{ $wrapper }}">
    @if ($label)
        <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
    @endif
    <div class="{{ $control }}">
        <select {{ $attributes->merge(['id' => $id, 'aria-invalid' => $error ? 'true' : null, 'aria-describedby' => $describedBy])->class([$field]) }}>
            {{ $slot }}
        </select>
        <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </div>
    @if ($error)
        <p id="{{ $id }}-error" class="{{ $errorClass }}">{{ $error }}</p>
    @elseif ($hint)
        <p id="{{ $id }}-hint" class="{{ $hintClass }}">{{ $hint }}</p>
    @endif
</div>
