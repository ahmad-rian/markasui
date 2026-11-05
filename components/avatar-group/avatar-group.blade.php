@props([
    'items' => [],
    'max' => 4,
    'size' => 'md',
    'groupLabel' => 'Members',
    'moreLabel' => '{count} more',
])

@php
    $root = 'group/avatars isolate flex items-center';
    $item = 'group/avatar relative shrink-0 transition-[margin] duration-200 ease-out hover:z-10 motion-reduce:transition-none';
    $face = 'flex items-center justify-center overflow-hidden rounded-full font-medium ring-2 ring-[var(--avatar-ring,var(--color-canvas))] transition-[translate,scale] duration-200 ease-out select-none group-hover/avatar:-translate-y-1 group-hover/avatar:scale-110 motion-reduce:transition-none';
    $image = 'object-cover';
    $fallback = 'bg-primary-soft text-primary';
    $more = 'bg-subtle text-ink';
    $tooltip = 'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition duration-150 ease-out group-hover/avatar:translate-y-0 group-hover/avatar:opacity-100 motion-reduce:transition-none';
    $sizes = [
        'sm' => 'size-8 text-xs',
        'md' => 'size-10 text-sm',
        'lg' => 'size-12 text-base',
    ];
    $overlaps = [
        'sm' => 'not-first:-ml-1.5 group-hover/avatars:not-first:ml-0.5',
        'md' => 'not-first:-ml-2 group-hover/avatars:not-first:ml-1',
        'lg' => 'not-first:-ml-2.5 group-hover/avatars:not-first:ml-1.5',
    ];

    // Huruf pertama kata pertama dan terakhir, sama dengan getInitials() di versi React dan Vue.
    $initials = function (string $name): string {
        $words = preg_split('/\s+/u', trim($name), -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $pick = count($words) > 1 ? [$words[0], end($words)] : $words;

        return mb_strtoupper(implode('', array_map(fn ($word) => mb_substr($word, 0, 1), $pick)));
    };

    $shown = array_slice($items, 0, $max);
    $hidden = array_slice($items, $max);
    $hiddenNames = implode(', ', array_map(fn ($person) => $person['name'], $hidden));
@endphp

<div role="group" aria-label="{{ $groupLabel }}" {{ $attributes->class([$root]) }}>
    @foreach ($shown as $person)
        <span class="{{ $item }} {{ $overlaps[$size] }}">@if (! empty($person['src']))<img src="{{ $person['src'] }}" alt="{{ $person['name'] }}" class="{{ $face }} {{ $image }} {{ $sizes[$size] }}" />@else<span role="img" aria-label="{{ $person['name'] }}" class="{{ $face }} {{ $fallback }} {{ $sizes[$size] }}">{{ $initials($person['name']) }}</span>@endif<span aria-hidden="true" class="{{ $tooltip }}">{{ $person['name'] }}</span></span>
    @endforeach
    @if (count($hidden) > 0)
        <span class="{{ $item }} {{ $overlaps[$size] }}"><span class="{{ $face }} {{ $more }} {{ $sizes[$size] }}"><span aria-hidden="true">+{{ count($hidden) }}</span><span class="sr-only">{{ str_replace('{count}', (string) count($hidden), $moreLabel) }}</span></span><span aria-hidden="true" class="{{ $tooltip }}">{{ $hiddenNames }}</span></span>
    @endif
</div>
