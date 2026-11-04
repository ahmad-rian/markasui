@props([
    'items' => [],
    'type' => 'single',
    'defaultValue' => null,
])

@php
    $root = 'w-full divide-y divide-line border-y border-line';
    $item = 'group';
    $summary = 'flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden';
    $icon = 'size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none';
    $content = 'pb-4 text-sm text-muted';

    $defaults = array_map('strval', (array) ($defaultValue ?? []));
    $openValues = $type === 'single' ? array_slice($defaults, 0, 1) : $defaults;
    $name = $type === 'single' ? 'markas-accordion-'.\Illuminate\Support\Str::random(8) : null;
@endphp

<div {{ $attributes->class([$root]) }}>
    @foreach ($items as $key => $title)
        <details
            class="{{ $item }}"
            @if ($name) name="{{ $name }}" @endif
            @if (in_array((string) $key, $openValues, true)) open @endif
        >
            <summary class="{{ $summary }}">
                <span>{{ $title }}</span>
                <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </summary>
            <div class="{{ $content }}">{{ $__laravel_slots[(string) $key] ?? '' }}</div>
        </details>
    @endforeach
</div>
