@props([
    'title' => '',
    'open' => false,
])

@php
    $root = 'group w-full';
    $summary = 'flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-2 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden';
    $icon = 'size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none';
    $content = 'pt-2 pb-2 text-sm text-muted';
@endphp

<details wire:ignore.self {{ $attributes->class([$root]) }} @if ($open) open @endif>
    <summary class="{{ $summary }}">
        <span>{{ $title }}</span>
        <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </summary>
    <div class="{{ $content }}">{{ $slot }}</div>
</details>
